document.addEventListener('DOMContentLoaded', function () {
    //au cas ou l'utilisateur appuie juste sur entrer au lieu du bouton
    document.getElementById("inputUrl").addEventListener("change", main);

    //au cas ou l'utilisateur appuie sur le bouton
    document.getElementById("boutonInputUrl").addEventListener('click', main);

    function main(){
        let lienNormal = document.getElementById("inputUrl").value;
        let http = "";
        let lienModif = lienNormal;
        let lienConverti = "";

        //test et enleve http ou https
        if (lienNormal.includes("http://")){
            lienModif = lienNormal.substring(7, lienNormal.length);
            http = "http://";
        }else if (lienNormal.includes("https://")){
            lienModif = lienNormal.substring(8, lienNormal.length);
            http = "https://";
        };

        //converti chaque char en sa version hexa et rajoute un % devant SAUF si le char est /
        for (const lettre in lienModif){
            if (lienModif[lettre] !== "/"){
                lienConverti += "%" + lienModif[lettre].charCodeAt(0).toString(16);
            }else if (lienModif[lettre] === "/"){
                lienConverti += "/";
            }
        }

        //check pour problèmes avec %, = et &
        for (let lettre = 0; lettre < lienConverti.length; lettre++){
            console.log(lettre+1);
            //console.log(lienConverti[lettre] + " " + lienConverti[lettre+1] + " " + lienConverti[lettre+2]);
            if (lienConverti[lettre] === "%" && lienConverti[lettre+1] === "3" && lienConverti[lettre+2] === "f"){
                lienConverti = lienConverti.substring(0, lettre) + "?" + lienConverti.substring(lettre+3, lienConverti.length);
            }else if (lienConverti[lettre] === "%" && lienConverti[lettre+1] === "3" && lienConverti[lettre+2] === "d"){
                lienConverti = lienConverti.substring(0, lettre) + "=" + lienConverti.substring(lettre+3, lienConverti.length);
            }else if (lienConverti[lettre] === "%" && lienConverti[lettre+1] === "2" && lienConverti[lettre+2] === "6"){
                lienConverti = lienConverti.substring(0, lettre) + "&" + lienConverti.substring(lettre+3, lienConverti.length);
            }
        }

        let lienFinal = http + lienConverti;

        document.getElementById('result').innerText = lienFinal;
    };
});
