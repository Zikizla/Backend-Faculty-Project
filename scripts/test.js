let assert = chai.assert;
describe('Zadatak2', function() {
 describe('#Testovi', function() {
   it('parametar sedmica nema vrijednost u rasponu od 1 do 15 (uključujući 1 i 15)', function() {
       const p1 = new Prisustvo();
       Prisustvo.trenutnaSedmica = 7;
       const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }];
       assert.deepEqual(p1.izracunajPrisustvo(20,lista1), { greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!" });
   });
   it('parametar sedmica nema vrijednost u rasponu od 1 do 15 (uključujući 1 i 15)', function() {
    const p1 = new Prisustvo();
    Prisustvo.trenutnaSedmica = 7;
    const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }];
    assert.deepEqual(p1.izracunajPrisustvo(-5,lista1), { greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!" });
});
   it('parametar sedmica ima vrijednost koja je veća od vrijednosti atributa trenutnaSedmica', function() {
    let p1 = new Prisustvo();
    Prisustvo.trenutnaSedmica = 7;
    const lista = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }];
    assert.deepEqual(p1.izracunajPrisustvo(10,lista), { greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!" });
   });
   it('parametar sedmica ima vrijednost koja je veća od vrijednosti atributa trenutnaSedmica(kada je jednaka trenutnoj sedmici)', function() {
    let p1 = new Prisustvo();
    Prisustvo.trenutnaSedmica = 7;
    const lista = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }];
    assert.deepEqual(p1.izracunajPrisustvo(7,lista), { greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!" });
   });
   it('zbir properties prisutan, odsutan i nijeUneseno za jednu ili više sedmica je veći od 8', function() {
    let p1 = new Prisustvo();
    Prisustvo.trenutnaSedmica = 7;
    const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 5, nijeUneseno: 5 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }];
    assert.deepEqual(p1.izracunajPrisustvo(2,lista1), { greska: "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!" });
   });
   it('parametar listaPrisustva nema ispravna dva propertiesa(prisutan i odsutan)', function() {
    let p1 = new Prisustvo();
    Prisustvo.trenutnaSedmica = 7;
    const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }];
    assert.deepEqual(p1.izracunajPrisustvo(2,lista1), { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 1 za properties [prisutan, odsutan]!`});
   });
   it('parametar listaPrisustva nema ispravna dva propertiesa(prisutan i nijeUneseno)', function() {
    let p1 = new Prisustvo();
    Prisustvo.trenutnaSedmica = 7;
    const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: -1, odsutan: 1, nijeUneseno: -1 }];
    assert.deepEqual(p1.izracunajPrisustvo(2,lista1), { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 1 za properties [prisutan, nijeUneseno]!`});
   });
   it('parametar listaPrisustva nema ispravna dva propertiesa(odsutan i nijeUneseno)', function() {
    let p1 = new Prisustvo();
    Prisustvo.trenutnaSedmica = 7;
    const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 1, odsutan: -1, nijeUneseno: -1 }];
    assert.deepEqual(p1.izracunajPrisustvo(2,lista1), { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 1 za properties [odsutan, nijeUneseno]!`});
   });
   it('parametar listaPrisustva nema ispravne properties', function() {
    let p1 = new Prisustvo();
    Prisustvo.trenutnaSedmica = 7;
    const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 4, prisutan: -2, odsutan: -2, nijeUneseno: -1 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }];
    assert.deepEqual(p1.izracunajPrisustvo(2,lista1), { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 4 za properties [prSedmica,prisutan,odsutan,nijeUneseno]!`});
   });
   it('parametar listaPrisustva nema ispravan prisutan property', function() {
    let p1 = new Prisustvo();
    Prisustvo.trenutnaSedmica = 7;
    const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: -1, odsutan: 1, nijeUneseno: 1 }];
    assert.deepEqual(p1.izracunajPrisustvo(2,lista1), { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 1 za properties [prisutan]!`});
   });
   it('parametar listaPrisustva nema ispravan nijeUneseno property', function() {
    let p1 = new Prisustvo();
    Prisustvo.trenutnaSedmica = 7;
    const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: -1 }];
    assert.deepEqual(p1.izracunajPrisustvo(2,lista1), { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 1 za properties [nijeUneseno]!`});
   });
   it('parametri su ispravni i metoda vraća objekat sa prisustvom za sedmicu koja je navedena kao parametar sedmica', function() {
    let p1 = new Prisustvo();
    Prisustvo.trenutnaSedmica = 7;
    const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }];
    assert.deepEqual(p1.izracunajPrisustvo(2,lista1), { prisustvoZaSedmicu: ' 2, prisutan: 5, odsutan: 2, nijeUneseno: 0' });
   });
   it('parametri su ispravni, lista je ispravna ali tražena sedmica ne postoji u listi', function() {
    let p1 = new Prisustvo();
    Prisustvo.trenutnaSedmica = 7;
    const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }];
    assert.deepEqual(p1.izracunajPrisustvo(5,lista1), { prisustvoZaSedmicu: 5,prisutan: -1, odsutan: -1, nijeUneseno: -1 });
   });
 });
});
