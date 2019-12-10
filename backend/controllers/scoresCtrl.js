/**
 * Le contrôleur de la route "/scores" de notre API
 * Reçoit les requêtes HTTP transmises par le routeur,
 * interroge la BD par l'intermédiare de scoreManager,
 * puis renvoit une réponse HTTP
 */

const scoreManager = require("../models/scoresManager");


module.exports.postScore = (req, res, next) => {
    req.body.score = JSON.parse(req.body.score);
    scoreManager.postScore(req.body.score, (result)=>{
        if(result.error!==null) {
            res.status(400).json({
                error: result.error
            });
        } else {
            res.status(201).json({
                message: 'Score saved successfully '+result.result
            });
        }
    })
};

module.exports.getScores = (req, res, next) => {
    scoreManager.getScores((result)=>{
        if(result.error!==null) {
            res.status(400).json({
                error: result.error
            });
        } else {
            res.status(200).json(result.result);
        }
    });
};