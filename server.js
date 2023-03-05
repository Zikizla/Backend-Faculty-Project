let fs = require('fs');
let body_parser = require('body-parser');
let express = require('express');
let Predmet = require('./scripts/predmet');

let baza = require('./baza');

let StudentTabela = require('./Student');
let PrisustvoTabela = require('./Prisustvo');
let StudentPredmetTabela = require('./StudentPredmet');
let PredmetTabela = require('./Predmet');
let CasTabela = require('./Cas');

baza.Student = StudentTabela;
baza.Prisustvo = PrisustvoTabela;
baza.StudentPredmet = StudentPredmetTabela;
baza.Predmet = PredmetTabela;
baza.Cas = CasTabela;

baza.Student.hasMany(baza.StudentPredmet, {
    foreignKey: 'studentId'
});
baza.Predmet.hasMany(baza.StudentPredmet, {
    foreignKey: 'predmetId'
});
baza.Student.hasMany(baza.Prisustvo, {
    foreignKey: 'studentId'
});
baza.Cas.hasMany(baza.Prisustvo, {
    foreignKey: 'casId'
});
baza.Predmet.hasMany(baza.Cas, {
    foreignKey: 'predmetId'
});


let server = express();

server.use(body_parser.json());

server.use(express.static('public'));

server.post('/student', function (request, response) {
    let body = request.body;

    if(!body) {
        response.send({status: 'Nisu poslani svi podaci'});
        return;
    }

    let ime = body.ime;
    let prezime = body.prezime;
    let index = body.index;

    if(!ime || !prezime || !index) {
        response.status(400).send({status: 'Nisu poslani svi podaci'});
        return;
    }

    baza.Student.create({
        ime: ime,
        prezime: prezime,
        index: index
    }).then(function() {
        response.send({status: 'Kreiran student!'});
    }).catch(function(error) {
        if(error && error.name === 'SequelizeUniqueConstraintError') {
            response.status(400).send({status: 'Student sa indexom ' + index + ' vec postoji!'});
        } else {
            response.status(400).send({status: 'Nesto nije uredu'});
        }
    });
});

server.post('/predmet', function (request, response) {
    let body = request.body;

    if(!body) {
        response.send({status: 'Nisu poslani svi podaci'});
        return;
    }

    let naziv = body.naziv;
    let kod = body.kod;

    if(!naziv || !kod) {
        response.status(400).send({status: 'Nisu poslani svi podaci'});
        return;
    }

    let tester = new Predmet(kod);
    if(!tester.provjeriKodPredmeta(kod)) {
        response.status(400).send({status: 'Kod predmeta nije ispravan!'});
        return;
    }

    baza.Predmet.create({
        naziv: naziv,
        kod: kod,
    }).then(function() {
        response.send({status: 'Kreiran predmet!'});
    }).catch(function(error) {
        if(error && error.name === 'SequelizeUniqueConstraintError') {
            response.status(400).send({status: 'Predmet sa kodom ' + kod + ' vec postoji!'});
        } else {
            response.status(400).send({status: 'Nesto nije uredu'});
        }
    });
});

server.post('/prisustvo', function (request, response) {
    let body = request.body;

    if(!body) {
        response.send({status: 'Nisu poslani svi podaci'});
        return;
    }

    let tipCasa = body.tipCasa;
    let redniBrojCasa = body.redniBrojCasa;
    let sedmica = body.sedmica;
    let kodPredmeta = body.kodPredmeta;
    let indexStudenta = body.indexStudenta;
    let statusPrisustva = body.statusPrisustva;

    if(!tipCasa || !redniBrojCasa || !sedmica || !kodPredmeta || !indexStudenta || !statusPrisustva) {
        response.status(400).send({status: 'Nisu poslani svi podaci'});
        return;
    }

    if(statusPrisustva != 'prisutan' && statusPrisustva != 'odsutan' && statusPrisustva != 'nijeUneseno') {
        response.status(400).send({status: 'Status prisustva nije ispravan'});
        return;
    }

    baza.Predmet.findAll().then(function(dataPredmeti) {

        let predmetIndex = -1;
        for(let i = 0; i < dataPredmeti.length; i++) {
            if(dataPredmeti[i].kod === kodPredmeta) {
                predmetIndex = i;
                break;
            }
        }

        if(predmetIndex == -1) {
            response.status(400).send({status: 'Kod predmeta ne postoji!'});
            return;
        }

        baza.Student.findAll().then(function(dataStudenti) {

            let studentIndex = -1;
            for(let i = 0; i < dataStudenti.length; i++) {
                if(dataStudenti[i].index === indexStudenta) {
                    studentIndex = i;
                    break;
                }
            }

            if(studentIndex == -1) {
                response.status(400).send({status: 'Student ne postoji!'});
                return;
            }

            baza.Cas.findOne({where: { tip: tipCasa, sedmica: sedmica, redniBroj: redniBrojCasa }}).then(function(casData) {
                if(!casData) {
                    baza.Cas.create({tip: tipCasa, sedmica: sedmica, redniBroj: redniBrojCasa, predmetId: dataPredmeti[predmetIndex].id}).then(function(noviCasData) {
                       if(!noviCasData) {
                           response.status(400).send({status: 'Nesto nije uredu'});
                       } else {
                           baza.Prisustvo.create({ status: statusPrisustva, casId: noviCasData.id, studentId: dataStudenti[studentIndex].id }).then(function() {
                               response.send({status: 'Kreirano prisustvo!'});
                           }).catch(function() {
                               response.status(400).send({status: 'Nesto nije uredu'});
                           });
                       }
                    });
                } else {

                    baza.Prisustvo.findOne({where: { casId: casData.id }}).then(function(prisustvoData) {
                        if(!prisustvoData) {
                            // Ovdje bi trebalo da postoji prisustvo sigurno prema logici
                            response.status(400).send({status: 'Nije pronadjeno prisustvo!'});
                        } else {
                            prisustvoData.status = statusPrisustva;
                            prisustvoData.save().then(function() {
                                response.send({status: 'Azurirano prisustvo!'});
                            }).catch(function() {
                                response.status(400).send({status: 'Nesto nije uredu'});
                            });
                        }
                    });

                }
            }).catch(function() {
                response.status(400).send({status: 'Nesto nije uredu'});
            });

        }).catch(function() {
            response.status(400).send({status: 'Nesto nije uredu'});
        });

    }).catch(function() {
        response.status(400).send({status: 'Nesto nije uredu'});
    });
});

server.get('/prisustvo', function(request, response) {
    let kodPredmeta = request.query.kodPredmeta;
    let indexStudenta = request.query.indexStudenta;
    let sedmica = request.query.sedmica;

    if(!kodPredmeta || !indexStudenta || !sedmica) {
        response.status(400).send({status: 'Nisu poslani svi podaci'});
        return;
    }

    baza.Prisustvo.findAll().then(function(prisustvaData) {
        baza.Student.findAll().then(function(studentiData) {
           baza.Cas.findAll().then(function(casoviData) {
               baza.Predmet.findAll().then(function(predmetiData) {
                   let prisustva = {
                       prisustvoZaSedmicu: sedmica,
                       prisutan: 0,
                       odsutan: 0,
                       nijeUneseno: 0
                   };
                   let brojac = 0;

                   for(let i = 0; i < predmetiData.length; i++) {
                       if( predmetiData[i].kod == kodPredmeta ) {
                           for(let j = 0; j < studentiData.length; j++) {
                               if( studentiData[j].index == indexStudenta ) {
                                   for(let k = 0; k < prisustvaData.length; k++) {
                                       if(prisustvaData[k].studentId == studentiData[j].id) {
                                           for(let l = 0; l < casoviData.length; l++ ) {
                                               if(casoviData[l].id == prisustvaData[k].casId && casoviData[l].sedmica == sedmica) {
                                                   if( prisustvaData[k].status == 'prisutan' ) prisustva.prisutan++;
                                                   else if(prisustvaData[k].status == 'odsutan') prisustva.odsutan++;
                                                   else if(prisustvaData[k].status == 'nijeUneseno') prisustva.nijeUneseno++;
                                                   brojac++;
                                               }
                                           }
                                       }
                                   }
                               }
                           }
                       }
                   }
                   if(brojac == 0) {
                       response.send({status: 'Prisustvo ne postoji'});
                   } else {
                       response.send(prisustva);
                   }


               }).catch(function() {
                   response.status(400).send({status: 'Nesto nije uredu'});
               });
           }).catch(function() {
               response.status(400).send({status: 'Nesto nije uredu'});
           });
        }).catch(function() {
            response.status(400).send({status: 'Nesto nije uredu'});
        });
    }).catch(function() {
        response.status(400).send({status: 'Nesto nije uredu'});
    });
});

baza.sync().then(function() {
    server.listen(8080);
});

module.exports = server;