/**
 * classe utilitaire
 * A utiliser pour y mettre diverses méthodes statiques qui peuvent être appelées par tous les composants
 */

export class Utils {

    /**
     * renvoie un nombre aléatoire entre 0 et la valeur max définie par @param max
     * @param max
     * @returns {number}
     */
    static getRandomInt(max) {
        max = Math.floor(max);
        return Math.floor(Math.random() * max) ;
    }

}