/**
 * Class du module qui va gérer l'affichage des scores récupérés depuis l'API
 */

import {ApiRequest} from "../../services/apiRequest.js";
import {Score} from "../../models/score.js";

export class Scores {

    constructor() {
        ApiRequest.getScores()
            .then((scores)=>this.displayScores(scores));
    }

    displayScores(scores) {
        for (let score of scores) {
            score = new Score(score.idScore, score.score, score.date);
            $("#scores").append("<span>"+score.score+"s - </span>");
        }
    }
}