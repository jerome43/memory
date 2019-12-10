/**
 * Classe qui va communiquer avec l'API de notre backend
 */

export class ApiRequest {

    static url = "http://localhost:3000"; // l'URL principale de connection à notre API

    /**
     * Pour poster un score sur l'API
     * @param score
     * @returns {Promise<unknown>}
     */
    static postScore(score) {
        return new Promise(function(resolve, reject){
            $.ajax({
                url: ApiRequest.url+"/scores",
                type : "POST",
                contentType: "application/json", // le type de donnée envoyée
                data: JSON.stringify({score: score}), // les données à envoyer converties au format json
                dataType : "json", // le type de donnée attendue en retour
                success: function(data) {
                    resolve(data); // en cas de succès, on indique que notre promesse a été résolue
                },
                error : function (jqXHR, textStatus, errorThrown) {
                    reject(jqXHR.responseText); // en cas d'erreur, on indique que notre promesse a été rejetée et le message d'erreur
                }
            });
        });
    }

    /**
     * Pour récupérer tous les scores depuis notre API
     * @returns {Promise<unknown>}
     */
    static getScores() {
        return new Promise(function(resolve, reject){
            $.get(ApiRequest.url+"/scores", function(data) {
                resolve(data);
            });
        });
    }
}