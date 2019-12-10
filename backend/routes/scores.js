/**
 * Le routeur de notre application pour la route '/scores/' de notre API
 * renvoie vers le contrôleur de notre route et ses méthodes adéquates
 * @type {createApplication}
 */

const express = require("express");
const router = express.Router();
const scoresCtrl = require("../controllers/scoresCtrl");

// si c'est une méthode GET
router.get("/", scoresCtrl.getScores);

// si c'est une méthode POST
router.post("/", scoresCtrl.postScore);

module.exports = router;