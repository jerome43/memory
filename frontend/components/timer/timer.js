/**
 * Crée un Timer et le rend dans le DOM
 * Instructions : insérez là où vous souhaitez que le timer apparaisse dans le HTML une balise de type block avec comme id="timer"
 */

export class Timer {

    timerInterval; // variable qui va stocker la référence à la fonction js setInterval() et qui nous permettra de l'arrêter si nécessaire
    initialCountdown; // la durée de vie initiale du timer, exprimée en secondes
    countdown; // la durée de vie restante du timer, exprimée en secondes

    /**
     * Construit l'objet Timer
     */
    constructor(initialCountdown) {
        this.initialCountdown = initialCountdown;
        this.countdown = initialCountdown;
        this.createDomTimer();
    }

    /**
     * Création du rendu du Timer dans le DOM
     */
    createDomTimer() {
        let stylesTimer = {
            marginTop : "2rem",
            marginBottom : "2rem",
            marginLeft : "auto",
            marginRight : "auto",
            width : "80%",
            height: "10px",
            boxShadow : "7px 8px 10px 0px rgb(163,163,163)"
        };
        let stylesTimer_div = {
            width : "100%",
            height: "100%",
            backgroundColor: "red",
        };
        $("#timer").append("<div id='countdown'><div></div></div><p>votre temps:&nbsp;<span>0</span>s</p>");
        $("#countdown").css(stylesTimer);
        $("#countdown>div:first-child").css(stylesTimer_div);
    }

    /**
     * Mise à jour du rendu du Timer dans le DOM
     */
    updateDomTimer() {
        $("#countdown>div").css("width",this.countdown/(this.initialCountdown/100)+"%");
        $("#timer>p>span").text(this.initialCountdown-this.countdown);
    }

    /**
     * Exécute le Timer dans uen promesse qui décrémente le compteur toutes les secondes.
     * Met à jour le DOM.
     * A la fin du décompte, arrête le Timer et renvoie la promesse résolue,
     */
    runTimer() {
        return new Promise(resolve => {
            this.timerInterval = setInterval(async ()=> {
                this.countdown --;
                this.updateDomTimer();
                if (this.countdown<=0) {
                    this.stopTimer();
                    resolve();
                }
            },1000)
        })
    }

    /**
     * Arrêt du Timer
     */
    stopTimer() {
        clearInterval(this.timerInterval);
    }
}