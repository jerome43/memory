/**
 * Classe objet Card
 * @property name (string) : son nom.
 * @property src (string) : le nom du fichier source permettant de l'afficher.
 * @property paired (boolean) indique si elle a été appareillée ou non.
 */

export class Card {

    constructor(name, src) {
        this.name = name;
        this.src = src;
        this.paired = false;
    }
}