/**
 * class Objet de type Score
 * @property idScore : l'id de notre Objet enregisté en BD
 * @property score : le score (temps effectué) : number
 * @property date : la date de réalisation du score : Date
 */

export class Score {

      constructor(idScore, score, date) {
          this.idScore = idScore;
          this.score = score;
          this.date = date;
    }

}