let AjaxPozivi = (() => {

    function posaljiStudent(studentObjekat, callback) {
       let ajaxPoziv = new XMLHttpRequest();
       ajaxPoziv.onreadystatechange = function () {
           try {
               let stanje = ajaxPoziv.readyState;
               let status = ajaxPoziv.status;

               if(stanje != 4) {
                   callback(null, null);
               }

               let odgovor = ajaxPoziv.response;
               let parsiraniOdgovor = JSON.parse(odgovor);

               let rezultat = { status: 'Nepoznata greska' };
               if(parsiraniOdgovor) {
                   rezultat = parsiraniOdgovor;
               }

               if(status == 200) {
                   callback(null, rezultat);
               } else {
                   callback(rezultat, null);
               }
           } catch(e) {
               console.log(e);
           }
       }

       ajaxPoziv.open('POST', 'student', true);

       ajaxPoziv.setRequestHeader('Content-Type', 'application/json');

       ajaxPoziv.send(JSON.stringify(studentObjekat));
    }

    function posaljiPredmet(predmetObjekat, callback) {
        let ajaxPoziv = new XMLHttpRequest();
        ajaxPoziv.onreadystatechange = function () {
            try {
                let stanje = ajaxPoziv.readyState;
                let status = ajaxPoziv.status;

                if(stanje != 4) {
                    callback(null, null);
                }

                let odgovor = ajaxPoziv.response;
                let parsiraniOdgovor = JSON.parse(odgovor);

                let rezultat = { status: 'Nepoznata greska' };
                if(parsiraniOdgovor) {
                    rezultat = parsiraniOdgovor;
                }

                if(status == 200) {
                    callback(null, rezultat);
                } else {
                    callback(rezultat, null);
                }
            } catch(e) {
                console.log(e);
            }
        }

        ajaxPoziv.open('POST', 'predmet', true);

        ajaxPoziv.setRequestHeader('Content-Type', 'application/json');

        ajaxPoziv.send(JSON.stringify(predmetObjekat));
    }
    
    function posaljiPrisustvo(prisustvoObjekat, callback) {
        let ajaxPoziv = new XMLHttpRequest();
        ajaxPoziv.onreadystatechange = function () {
            try {
                let stanje = ajaxPoziv.readyState;
                let status = ajaxPoziv.status;

                if(stanje != 4) {
                    callback(null, null);
                }

                let odgovor = ajaxPoziv.response;
                let parsiraniOdgovor = JSON.parse(odgovor);

                let rezultat = { status: 'Nepoznata greska' };
                if(parsiraniOdgovor) {
                    rezultat = parsiraniOdgovor;
                }

                if(status == 200) {
                    callback(null, rezultat);
                } else {
                    callback(rezultat, null);
                }
            } catch(e) {
                console.log(e);
            }
        }

        ajaxPoziv.open('POST', 'prisustvo', true);

        ajaxPoziv.setRequestHeader('Content-Type', 'application/json');

        ajaxPoziv.send(JSON.stringify(prisustvoObjekat));
    }

    function dajPrisustvo(kodPredmeta, indexStudenta, sedmica, callback) {
        let parametri = '';

        if(kodPredmeta) {
            parametri = 'kodPredmeta=' + kodPredmeta;
        }

        if(indexStudenta) {
            if(parametri == '') parametri = 'indexStudenta=' + indexStudenta;
            else parametri += '&indexStudenta=' + indexStudenta;
        }

        if(sedmica) {
            if(parametri == '') parametri = 'sedmica=' + sedmica;
            else parametri += '&sedmica=' + sedmica;
        }

        let ajaxPoziv = new XMLHttpRequest();
        ajaxPoziv.onreadystatechange = function () {
            try {
                let stanje = ajaxPoziv.readyState;
                let status = ajaxPoziv.status;

                if(stanje != 4) {
                    callback(null, null);
                }

                let odgovor = ajaxPoziv.response;
                let parsiraniOdgovor = JSON.parse(odgovor);

                let rezultat = { status: 'Nepoznata greska' };
                if(parsiraniOdgovor) {
                    rezultat = parsiraniOdgovor;
                }

                if(status == 200) {
                    callback(null, rezultat);
                } else {
                    callback(rezultat, null);
                }
            } catch(e) {
                console.log(e);
            }
        }

        let ruta = 'prisustvo';
        if(parametri != '') ruta += '?' + parametri;

        ajaxPoziv.open('GET', ruta, true);

        ajaxPoziv.setRequestHeader('Content-Type', 'application/json');

        ajaxPoziv.send();
    }

    return {
        posaljiStudent: posaljiStudent,
        posaljiPredmet: posaljiPredmet,
        posaljiPrisustvo: posaljiPrisustvo,
        dajPrisustvo: dajPrisustvo
    }
})();