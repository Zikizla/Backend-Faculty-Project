class Predmet{
    constructor(_kod){
        this.kod = _kod;
    }
    provjeriKodPredmeta(kod){
        let naziv_predmeta = "";
        let studij = "";
        let godina = "";
        let semestar = "";
        if(kod.length > 10) return false;
        for(let i=0; i<kod.length; i++){
            if(i<2){
                naziv_predmeta+=kod[i];
            }
            if(i>2){
                if(kod[i]=="-") break;
                studij+=kod[i];
            }
        }
        for(let i=0; i<kod.length; i++){
            if(i==7){
                godina+=kod[i];
            }
            if(i==9){
                semestar+=kod[i];
            }
        }
        if(naziv_predmeta!="RI" && naziv_predmeta!="AE" && naziv_predmeta!="TK" && naziv_predmeta!="EE" && naziv_predmeta!="RS"){ //RS je ukljucen zbog primjera testa u zadatku
            return false;
        }
        if(studij!="BoE" && studij!="MoE" && studij!="RS"){
            return false;
        }
        if((studij=="MoE" || studij=="RS") && godina>2 || godina<1){
            return false;
        }
        if(studij=="BoE" && godina>3 || godina<1){
            return false;
        }
        if(semestar>2 || semestar<1){
            return false;
        }
        return true;
    }
}

module.exports = Predmet;

let npr = new Predmet();

/*console.log(npr.provjeriKodPredmeta("RI-BoE-1-1")); // vraca true;
console.log(npr.provjeriKodPredmeta("AE-BoE-1")); // vraca false;
console.log(npr.provjeriKodPredmeta("TK-MoE-3-1")); // vraca flase;
console.log(npr.provjeriKodPredmeta("RS-boe-1-2")); // vraca false;*/
