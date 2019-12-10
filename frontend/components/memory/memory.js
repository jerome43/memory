/**
 * classe qui construit et pilote les principales fonctionnalités du memory
 */

import {dataCards} from "../../assets/datasSample/dataCards.js";
import {Card} from "../../models/card.js";
import {Utils} from "../../utils/utils.js";
import {ApiRequest} from "../../services/apiRequest.js";
import {Timer} from "../timer/timer.js";
import {Scores} from "../scores/scores.js";
import {Message} from "../message/message.js";

export class Memory {
    /**
     * Construit notre memory
     * @property activeCards : array qui comprend le nom et l'id des "cartes" dans le DOM en cours de comparaison
     * @property cards : array qui comprend toutes les cartes (Card) en jeu
     * @property timer : le timer
     * @param nbrCards (nombre de paires de carte que l'on veut mettre en jeu)
     * @param time (temps donnée pour le réaliser, en secondes)
     */
    constructor(nbrCards, time) {
        this.activeCards= [];
        this.cards = this.distributeCards(this.getCards(nbrCards)); // création et distribution des cartes
        new Scores(); // récupération et affichage des scores
        this.timer = new Timer(time); // création et affichage du timer
        this.timer.runTimer().then( async (resolve)=>{
            this.runLost();
        })
    }

    /**
     * renvoie un tableau contenant les paires de cartes à distribuer
     * @param nbrCards
     * @returns {[Card]}
     */
    getCards(nbrCards) {
        let cards = [];
        let loop = 2; // on va créer des paires de carte, donc on fait deux boucles
        while (loop>0) {
            for (let i=0; i<nbrCards; i++) {
                if (i<dataCards.length) {
                    let card = new Card(dataCards[i], dataCards[i] + ".png");
                    cards.push(card)
                }
            }
            loop--;
        }
        return cards;
    }

    /**
     * Redistribue aléatoirement les cartes dans le DOM et dans le le jeu de cartes (@property cards)
     * Ajoute les listeners de click sur les cartes
     * @param cards
     * @returns {[Card]}
     */
    distributeCards(cards) {
        let distributedCards=[];
        let id = 0;
        while (cards.length>0) {
            let $div = $("<div>", {class: "card-container"}); // le div qui contient notre image
            if (id%7===0) { // toutes les 7 cartes, on ajoute une classe spécifique pour créer une nouvelle ligne du mémory
                $div.addClass("last-card-container-row");
            }
            let random = Utils.getRandomInt(cards.length); // tirage aléatoire d'une carte parmis les cartes restantes
            let $img = $("<img>", { src : "./assets/img/" + cards[random].src, attr : {"data-name" : cards[random].name}, class : "card", id : id.toString()});
            $img.click((event)=> {
                this.clickCard(event);// ajout du listener de click sur l'image
            });
            $div.append($img);
            $("#memory").append($div);
            distributedCards.push(cards[random]);
            cards.splice(random,1);
            id++;
        }
        return distributedCards;
    }


    /**
     * S'exécute lorsque le joueur clique sur une carte
     * @param event
     */
    clickCard(event) {
        // si c'est la première carte qui est sélectionnée, on l'affiche et la pousse dans le tableau activeCards
        if (this.activeCards.length===0) {
            this.activeCards.push({name : event.target.dataset.name, id : event.target.id});
            $("#"+event.target.id).css("opacity","1");
        }
        // si c'est la deuxième carte qui est sélectionnée, on contrôle en plus que ce n'est pas la même,
        else if (this.activeCards.length===1 && this.activeCards[0].id !== event.target.id) {
            this.activeCards.push({name : event.target.dataset.name, id : event.target.id});
            document.getElementById(event.target.id).style.opacity = "1";

            if (this.controlActiveCards()) { // puis on contrôle si c'est une paire,
                this.even(); // oui c'est une paire !
            } else {
                this.odd(); // non ce n'est pas une paire !
            }
        }
    }

    /**
     * Contrôle si les deux cartes sont identiques
     * @return Boolean
     */
    controlActiveCards() {
        return this.activeCards[0].name === this.activeCards[1].name;
    }

    /**
     * Suite de la partie lorsque le joueur a cliqué sur deux cartes identiques
     * Met à jour l'appairage des cartes dans le jeu de cartes,
     * Contrôle si la partie est terminée, sinon affiche un message
     * @returns {Promise<void>}
     */
    async even() {
        this.pairingCards();
        if (this.testWin()) {
            this.runWin();
        } else {
            await Message.displaymessage("oui !", 1000);
            this.clearActiveCards();
        }
    }

    /**
     * Suite de la partie lorsque le joueur a cliqué sur deux cartes différentes
     * Affiche un message et efface les cartes de la sélection courante
     * @returns {Promise<void>}
     */
    async odd() {
        await Message.displaymessage("non !", 2000);
        this.hideActiveCards();
        this.clearActiveCards();
    }

    /**
     * S'exécute quand les cartes retournées sont bien une paire
     * met à jour l'information d'appareillage dans le tableau des cartes
     * désactive le listener de click sur ces cartes dans le DOM
     */
    pairingCards() {
        this.cards[Number(this.activeCards[0].id)].paired = true;
        this.cards[Number(this.activeCards[1].id)].paired = true;
        $("#"+this.activeCards[0].id).click().off();
        $("#"+this.activeCards[1].id).click().off();
    }

    /**
     * Pour remettre les cartes en jeu qui ont été retournées mais pas appareillées
     * Masque les cartes dans le DOM
     */
    hideActiveCards() {
        document.getElementById(this.activeCards[0].id).style.opacity = "0";
        document.getElementById(this.activeCards[1].id).style.opacity = "0";
    }

    /**
     * Pour remettre les cartes en jeu qui ont été retournées mais pas appareillées
     * Vide le array activeCards
     */
    clearActiveCards() {
        this.activeCards=[];
    }

    /**
     * Permet de tester si toutes les cartes ont été apparaillées et donc que le joueur a gagné
     * @returns {boolean}
     */
    testWin() {
        //variante avec some, on vérifie qu'un élément ne remplit pas une certaine condition
        return !this.cards.some(card=>card.paired===false);
        // variante avec every, on vérifie que tous les éléments remplissent la condition
        //return this.cards.every(card=>card.paired===true);
    }

    /**
     * Script qui s'exécute lorsque le joueur a gagné la partie.
     * Arrête le timer.
     * Poste le score à l'API.
     * Affiche un message pendant x secondes puis relance une nouvelle partie en rechargeant la page.
     */
    async runWin() {
        this.timer.stopTimer();
        ApiRequest.postScore(this.timer.initialCountdown - this.timer.countdown).then(function(resolve) {
            //console.info("postScore resolve : ", resolve);
        }, function(reject) {
            console.error("postScore reject : ", reject); // Si la promesse a retourné une erreur, on l'affiche.
        });
        await Message.displaymessage("GAGNÉÉÉÉÉÉÉÉ !!!!!", 5000);
        location.reload();
    }

    /**
     * Script qui s'exécute lorsque le joueur a perdu la partie
     * désactive les listeners de click
     * affiche le message perdu
     * relance la partie
     * @returns {Promise<void>}
     */
    async runLost() {
        $("img").off("click");
        await Message.displaymessage("PERDUUUUUU !!!!!!!!!!", 5000);
        location.reload();
    }
}