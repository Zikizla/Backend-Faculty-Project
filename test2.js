let chai = require('chai');
let chai_http = require('chai-http');
let fs = require('fs');
let server = require('./server');
let should = chai.should();

chai.use(chai_http);

describe('POST /student', function() {
    beforeEach(function() {
        fs.writeFile('studenti.csv', '', function() { });
    });

    after(function () {
        fs.unlink('studenti.csv',  function() { });
        fs.unlink('predmeti.csv',  function() { });
        fs.unlink('prisustva.csv', function() { });
    });

   it('Index studenta vec postoji u datoteci studenti.csv', function(done) {
       fs.writeFile('studenti.csv', 'Zidan,Maarouf,179-St', function() {
           chai.request(server)
               .post('/student')
               .set('content-type', 'application/json')
               .send({ ime: 'Zidan', prezime: 'Maarouf', index: '179-St' })
               .end(function(error, response) {
                   response.should.have.status(400);
                   response.body.should.deep.equal({status: 'Student sa indexom 179-St vec postoji!'});
                  done();
               });
       });
   });

   it('Student je uspjesno kreiran', function(done) {
       chai.request(server)
           .post('/student')
           .set('content-type', 'application/json')
           .send({ ime: 'Zidan', prezime: 'Maarouf', index: '179-St' })
           .end(function(error, response) {
               response.should.have.status(200);
               response.body.should.deep.equal({status: 'Kreiran student!'});
               done();
           });
   });

   it('DODATNO - Prazno tijelo', function(done) {
       chai.request(server)
           .post('/student')
           .set('content-type', 'application/json')
           .send({})
           .end(function(error, response) {
               response.should.have.status(400);
               response.body.should.deep.equal({status: 'Nisu poslani svi podaci'});
               done();
           });
   });

    it('DODATNO - Nedostaje index u tijelu', function(done) {
        chai.request(server)
            .post('/student')
            .set('content-type', 'application/json')
            .send({ime: 'Zidan', prezime: 'Maarouf'})
            .end(function(error, response) {
                response.should.have.status(400);
                response.body.should.deep.equal({status: 'Nisu poslani svi podaci'});
                done();
            });
    });

    it('DODATNO - Pogresno polje index (idnex)', function(done) {
        chai.request(server)
            .post('/student')
            .set('content-type', 'application/json')
            .send({ime: 'Zidan', prezime: 'Maarouf', idnex: '179-St'})
            .end(function(error, response) {
                response.should.have.status(400);
                response.body.should.deep.equal({status: 'Nisu poslani svi podaci'});
                done();
            });
    });
});

describe('POST /predmet', function() {
    beforeEach(function() {
        fs.writeFile('predmeti.csv', '', function() { });
    });

    after(function() {
        fs.unlink('studenti.csv',  function() { });
        fs.unlink('predmeti.csv',  function() { });
        fs.unlink('prisustva.csv',  function() { });
    });

    it('Predmet sa kodom vec postoji u datoteci predmeti.csv', function (done) {
       fs.writeFile('predmeti.csv', 'BWT,RS-BoE-2-1', function() {
          chai.request(server)
              .post('/predmet')
              .set('content-type', 'application/json')
              .send({ naziv: 'BWT', kod: 'RS-BoE-2-1' })
              .end(function(error,response) {
                 response.should.have.status(400);
                 response.body.should.deep.equal({status: 'Predmet sa kodom RS-BoE-2-1 vec postoji!'});
                 done();
              });
       });
    });

    it('Predmet nema ispravan kod', function (done) {
            chai.request(server)
                .post('/predmet')
                .set('content-type', 'application/json')
                .send({ naziv: 'BWT', kod: 'SR-BoE-2-1' })
                .end(function(error,response) {
                    response.should.have.status(400);
                    response.body.should.deep.equal({status: 'Kod predmeta nije ispravan!'});
                    done();
                });
    });

   it('Predmet je uspjesno kreiran', function(done) {
       chai.request(server)
           .post('/predmet')
           .set('content-type', 'application/json')
           .send({ naziv: 'BWT', kod: 'RS-BoE-2-1' })
           .end(function(error,response) {
               response.should.have.status(200);
               response.body.should.deep.equal({status: 'Kreiran predmet!'});
               done();
           });
   });

    it('DODATNO - Prazno tijelo', function(done) {
        chai.request(server)
            .post('/predmet')
            .set('content-type', 'application/json')
            .send({})
            .end(function(error, response) {
                response.should.have.status(400);
                response.body.should.deep.equal({status: 'Nisu poslani svi podaci'});
                done();
            });
    });

    it('DODATNO - Nedostaje kod u tijelu', function(done) {
        chai.request(server)
            .post('/predmet')
            .set('content-type', 'application/json')
            .send({naziv: 'BWT'})
            .end(function(error, response) {
                response.should.have.status(400);
                response.body.should.deep.equal({status: 'Nisu poslani svi podaci'});
                done();
            });
    });

    it('DODATNO - Nepostojeca putanja na serveru', function(done) {
        chai.request(server)
            .post('/test')
            .set('content-type', 'application/json')
            .send({})
            .end(function(error, response) {
                response.should.have.status(404);
                done();
            });
    });
})