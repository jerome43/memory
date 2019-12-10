/**
 * Le modèle de données d'un Objet Score
 */

class Score {
    constructor(idScore, score, date) {
        this.idScore =  idScore;
        this.score = score;
        this.date = date;
    }
}

module.exports = Score;