/**
 * Classe type CRUD chargée de la lecture ou de la persistence de nos objets Scores dans la BD
 * @type {Score}
 */
const Score = require('../models/score');
const db = require("../models/connectionDb");

/**
 * Sauvegarde d'un score en BD
 * Renvoie un objet Score tel qu'enregistré en BD
 * @param pScore
 * @param result
 */
module.exports.postScore = function(pScore, result) {
        db.query("INSERT INTO `scores` (`score`, `date`) VALUES ('"+pScore+"','"+new Date().toLocaleDateString()+"')", (error, res)=> {
        result({error: error, result:new Score(res)}) ;
    })
};

/**
 * Récupération des 10 plus grands scores en BD
 * Renvoie un tableau de Scores
 * @param result
 */
module.exports.getScores = function(result) {
    let query = "SELECT * FROM `scores` ORDER BY score ASC LIMIT 10";
    db.query(query, (err, res) => {
            result({error : err, result : res});
    });
};