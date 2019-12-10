/**
 * Contrôleur principal de notre application, appelé au chargement de la page index.html
 * Construit un jeu de memory à partir du composant Memory
 */

import {Memory} from "./components/memory/memory.js";

$(function() {
    new Memory(14,200);
});
