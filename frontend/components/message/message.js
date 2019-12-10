/**
 * Class du composant qui permet d'afficher des messages sous forme de modale
 */

export class Message {

    static timeout; // la référence à la méthode js setTimeout

    /**
     * Affiche un message sous forme de modale dans le DOM
     * @param message
     * @param time
     * @returns {Promise<unknown>}
     */
    static displaymessage(message ,time=3000) {

        return new Promise(resolve => {

                const modalStyle = {
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    backgroundColor: "rgba(255,255,255,0.5)",
                    display: "none"
                };

                const modal_messageStyle =  {
                    textAlign: "center",
                    margin: "30vh auto auto",
                    width: "fit-content",
                    minWidth: "300px",
                    height: "150px",
                    lineHeight: "150px",
                    boxShadow: "7px 8px 10px 0 rgb(163,163,163)",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    padding : "1rem",
                    fontSize: "3rem",
                    color: "dodgerblue",
                    fontWeight: "bold",
                    textTransform: "uppercase"
                };

                if(!$("#modal").length) { // si la modale n'existe pas, on la crée
                    $("body").prepend("<div id='modal'><p id='modal_message'></p></div>");
                    $("#modal").css(modalStyle);
                    $("#modal_message").css(modal_messageStyle);
                }

                $("#modal_message").text(message); // on met à jour le texte à afficher

                $("#modal").show();// on affiche la modale

                clearTimeout(Message.timeout);

                Message.timeout = setTimeout(function () {
                    $("#modal").hide(); // à la fin du temps imparti, on cache la modale
                    resolve(); // on indique que la promesse a été résolue
                },time)
            }
        )
    }
}