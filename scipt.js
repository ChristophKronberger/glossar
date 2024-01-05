function start() {
    includeHTML().then(() => {
        window.addEventListener("popstate", clearSearchBar()); //Leeren der Suchleiste
        lastChange(); //Einfügen des Änderungsdatums.
        time(); //Starten der Uhr
        window.setInterval("time()", 1000);
    }
    );
    
}
function includeHTML() {
    return new Promise((resolve, reject) => {
        var allElements = document.getElementsByTagName("*");
        var promises = [];

        for (let elmnt of allElements) {
            var file = elmnt.getAttribute("load-children");
            if (file) {
                // Neues Promise für jeden Request
                var promise = new Promise((resolve, reject) => {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4) {
                            if (this.status == 200) {
                                elmnt.innerHTML = this.responseText;
                            } else if (this.status == 404) {
                                elmnt.innerHTML = "Page not found.";
                            }
                            elmnt.removeAttribute("load-children");
                            resolve();
                        }
                    };
                    xhttp.open("GET", file, true);
                    xhttp.send();
                });

                promises.push(promise);
            }
        }

        // Auf alle Requests warten
        Promise.all(promises).then(() => {
            resolve();
        }).catch(error => {
            reject(error);
        });
    });
}



function time() {

    var now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();

    thetime = (hours < 10) ? "0" + hours + ":" : hours + ":";
    thetime += (minutes < 10) ? "0" + minutes + ":" : minutes + ":";
    thetime += (seconds < 10) ? "0" + seconds : seconds;

    element = document.getElementById("clock");
    element.innerHTML = thetime;
}
function clearSearchBar() {
    let bar = document.getElementById("suchbegriff");
    bar.value = "";
}
function lastChange() {
    let lastChange = document.lastModified;
    let changefield = document.getElementById("lastChange").innerHTML = lastChange;
    console.log(lastChange);
}


