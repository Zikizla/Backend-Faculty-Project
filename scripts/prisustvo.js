class Prisustvo {
    /* 
    static trenutnaSedmica;   u zavisnosti od vrste kompajlera ovaj dio koda radi
    static prisustvo;         u zavisnosti od vrste kompajlera ovaj dio koda radi
    static finalnoStanje;     u zavisnosti od vrste kompajlera ovaj dio koda radi
    */
    constructor() {
        this.trenutnaSedmica = 1;
        this.prisustvo = 1;
        this.finalnoStanje = false;
    }
    izracunajPrisustvo(sedmica, listaPrisustva) {
        if (sedmica < 1 || sedmica > 15) {
            return { greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!" };
        }
        if (sedmica >= Prisustvo.trenutnaSedmica) {
            return { greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!" }
        }
        for (let i = 0; i < listaPrisustva.length; i++) {
            let greska_prSedmica = 0;
            let greska_prisutan = 0;
            let greska_odsutan = 0;
            let greska_nijeUneseno = 0;
            for (let j = i + 1; j < listaPrisustva.length; j++) {
                if (listaPrisustva[i].prSedmica == listaPrisustva[j].prSedmica) {

                    if (listaPrisustva[j].prSedmica < 1 || listaPrisustva[j].prSedmica > 15) {
                        greska_prSedmica = 1;
                    }
                    if (listaPrisustva[j].prisutan < 0 || listaPrisustva[j].prisutan > 8) {
                        greska_prisutan = 1;
                    }
                    if (listaPrisustva[j].odsutan < 0 || listaPrisustva[j].odsutan > 8) {
                        greska_odsutan = 1;
                    }
                    if (listaPrisustva[j].nijeUneseno < 0 || listaPrisustva[j].nijeUneseno > 8) {
                        greska_nijeUneseno = 1;
                    }
                    if (listaPrisustva[j].prisutan + listaPrisustva[j].odsutan + listaPrisustva[j].nijeUneseno > 8) {
                        return { greska: "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!" };
                    }
                    else if (greska_prSedmica && greska_prisutan == 0 && greska_odsutan == 0 && greska_nijeUneseno == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[j].prSedmica} za properties [prSedmica]!` };
                    }
                    else if (greska_prisutan && greska_odsutan == 0 && greska_prSedmica == 0 && greska_nijeUneseno == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[j].prSedmica} za properties [prisutan]!` };
                    }
                    else if (greska_odsutan && greska_prisutan == 0 && greska_prSedmica == 0 && greska_nijeUneseno == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[j].prSedmica} za properties [odustan]!` };
                    }
                    else if (greska_nijeUneseno && greska_prisutan == 0 && greska_odsutan == 0 && greska_prSedmica == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[j].prSedmica} za properties [nijeUneseno]!` };
                    }
                    else if (greska_prSedmica && greska_prisutan && greska_nijeUneseno == 0 && greska_odsutan == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[j].prSedmica} za properties [prSedmica, prisutan]!` };
                    }
                    else if (greska_prSedmica && greska_odsutan && greska_prisutan == 0 && greska_nijeUneseno == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[j].prSedmica} za properties [prSedmica, odsutan]!` };
                    }
                    else if (greska_prSedmica && greska_nijeUneseno && greska_odsutan == 0 && greska_prisutan == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[j].prSedmica} za properties [prSedmica, nijeUneseno]!` };
                    }
                    else if (greska_prisutan && greska_odsutan && greska_prSedmica == 0 && greska_nijeUneseno == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[j].prSedmica} za properties [prisutan, odsutan]!` };
                    }
                    else if (greska_prisutan && greska_nijeUneseno && greska_prSedmica == 0 && greska_odsutan == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[j].prSedmica} za properties [prisutan, nijeUneseno]!` };
                    }
                    else if (greska_odsutan && greska_nijeUneseno && greska_prSedmica == 0 && greska_prisutan == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[j].prSedmica} za properties [odsutan, nijeUneseno]!` };
                    }
                    else if (greska_prisutan && greska_odsutan && greska_nijeUneseno && greska_prSedmica == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[j].prSedmica} za properties [${Object.keys(listaPrisustva[i])}]!` };
                    }

                } else {
                    if (listaPrisustva[i].prSedmica < 1 || listaPrisustva[i].prSedmica > 15) {
                        greska_prSedmica = 1;
                    }
                    if (listaPrisustva[i].prisutan < 0 || listaPrisustva[i].prisutan > 8) {
                        greska_prisutan = 1;
                    }
                    if (listaPrisustva[i].odsutan < 0 || listaPrisustva[i].odsutan > 8) {
                        greska_odsutan = 1;
                    }
                    if (listaPrisustva[i].nijeUneseno < 0 || listaPrisustva[i].nijeUneseno > 8) {
                        greska_nijeUneseno = 1;
                    }
                    if (listaPrisustva[i].prisutan + listaPrisustva[i].odsutan + listaPrisustva[i].nijeUneseno > 8) {
                        return { greska: "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!" };
                    }
                    else if (greska_prSedmica && greska_prisutan == 0 && greska_odsutan == 0 && greska_nijeUneseno == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[j].prSedmica} za properties [${Object.keys(listaPrisustva[i].prSedmica)}]!` };
                    }
                    else if (greska_prisutan && greska_odsutan == 0 && greska_prSedmica == 0 && greska_nijeUneseno == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[i].prSedmica} za properties [prisutan]!` };
                    }
                    else if (greska_odsutan && greska_prisutan == 0 && greska_prSedmica == 0 && greska_nijeUneseno == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[i].prSedmica} za properties [odustan]!` };
                    }
                    else if (greska_nijeUneseno && greska_prisutan == 0 && greska_odsutan == 0 && greska_prSedmica == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[i].prSedmica} za properties [nijeUneseno]!` };
                    }
                    else if (greska_prSedmica && greska_prisutan && greska_nijeUneseno == 0 && greska_odsutan == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[i].prSedmica} za properties [prSedmica, prisutan]!` };
                    }
                    else if (greska_prSedmica && greska_odsutan && greska_prisutan == 0 && greska_nijeUneseno == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[i].prSedmica} za properties [prSedmica, odsutan]!` };
                    }
                    else if (greska_prSedmica && greska_nijeUneseno && greska_odsutan == 0 && greska_prisutan == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[i].prSedmica} za properties [prSedmica, nijeUneseno]!` };
                    }
                    else if (greska_prisutan && greska_odsutan && greska_prSedmica == 0 && greska_nijeUneseno == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[i].prSedmica} za properties [prisutan, odsutan]!` };
                    }
                    else if (greska_prisutan && greska_nijeUneseno && greska_prSedmica == 0 && greska_odsutan == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[i].prSedmica} za properties [prisutan, nijeUneseno]!` };
                    }
                    else if (greska_odsutan && greska_nijeUneseno && greska_prSedmica == 0 && greska_prisutan == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[i].prSedmica} za properties [odsutan, nijeUneseno]!` };
                    }
                    else if (greska_prisutan && greska_odsutan && greska_nijeUneseno && greska_prSedmica == 0) {
                        return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${listaPrisustva[i].prSedmica} za properties [${Object.keys(listaPrisustva[i])}]!` };
                    }

                }
            }
        }
        var prisustvo = 0;
        var ukupno_prisutan = 0;
        var ukupno_odsutan = 0;
        for (let i = 0; i < listaPrisustva.length; i++) {
            for (let j = i + 1; j < listaPrisustva.length; j++) {
                if (listaPrisustva[i].prSedmica == listaPrisustva[j].prSedmica) {
                    if ((listaPrisustva[j].prSedmica > 0 || listaPrisustva[j].prSedmica <= 15) && (listaPrisustva[j].prisutan >= 0 || listaPrisustva[j].prisutan <= 8) && (listaPrisustva[j].odsutan >= 0 || listaPrisustva[j].odsutan <= 8) && (listaPrisustva[j].nijeUneseno >= 0 || listaPrisustva[j].nijeUneseno <= 8)) {
                        ukupno_prisutan += listaPrisustva[j].prisutan;
                        ukupno_odsutan += listaPrisustva[j].odsutan;
                    }
                } else {
                    if ((listaPrisustva[i].prSedmica > 0 || listaPrisustva[i].prSedmica <= 15) && (listaPrisustva[i].prisutan >= 0 || listaPrisustva[i].prisutan <= 8) && (listaPrisustva[i].odsutan >= 0 || listaPrisustva[i].odsutan <= 8) && (listaPrisustva[i].nijeUneseno >= 0 || listaPrisustva[i].nijeUneseno <= 8)) {
                        ukupno_prisutan += listaPrisustva[i].prisutan;
                        ukupno_odsutan += listaPrisustva[i].odsutan;
                    }
                }
            }
        }
        prisustvo = (ukupno_prisutan) / (ukupno_prisutan + ukupno_odsutan);
        for (let i = 0; i < listaPrisustva.length; i++) {
            if ((listaPrisustva[i].prSedmica > 0 || listaPrisustva[i].prSedmica <= 15) && (listaPrisustva[i].prisutan >= 0 || listaPrisustva[i].prisutan <= 8) && (listaPrisustva[i].odsutan >= 0 || listaPrisustva[i].odsutan <= 8) && (listaPrisustva[i].nijeUneseno >= 0 || listaPrisustva[i].nijeUneseno <= 8)) {
                if (listaPrisustva[i].prSedmica == sedmica && listaPrisustva[i].nijeUneseno == 0) {
                    this.finalnoStanje = true;
                    return { prisustvoZaSedmicu: ` ${sedmica}, prisutan: ${listaPrisustva[i].prisutan}, odsutan: ${listaPrisustva[i].odsutan}, nijeUneseno: ${listaPrisustva[i].nijeUneseno}` };
                } else {
                    return { prisustvoZaSedmicu: 5, prisutan: -1, odsutan: -1, nijeUneseno: -1 };
                }
            }
        }

    }
}




