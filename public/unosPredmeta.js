function callback (error, data) {
    let greska = document.getElementById('greska');

    if(error) {
        greska.style.color = 'red';
        if(error.status)
            greska.innerHTML = error.status;
        else
            greska.innerHTML = 'Nepoznata greska';
        return;
    }

    if(data == null) return;

    greska.style.color = 'forestgreen';
    if(data.status)
        greska.innerHTML = data.status;
    else
        greska.innerHTML = 'Uspjesno';

    let nazivPolje = document.getElementById('naziv');
    if(nazivPolje) nazivPolje.value = '';

    let kodPolje = document.getElementById('kod');
    if(kodPolje) kodPolje.value = '';
}

function klikniPotvrdi () {
    let nazivPolje = document.getElementById('naziv');
    let naziv = '';
    if(nazivPolje) naziv = nazivPolje.value;

    let kodPolje = document.getElementById('kod');
    let kod = '';
    if(kodPolje) kod = kodPolje.value;

    if( naziv == '' || kod == '' ) {
        let greska = document.getElementById('greska');
        greska.style.color = 'red';
        greska.innerHTML = 'Polja ne smiju biti prazna';
        return;
    }

    AjaxPozivi.posaljiPredmet({
        naziv: naziv,
        kod: kod
    }, callback);
}

let dugme = document.getElementById('potvrdiDugme');
if(dugme) {
    dugme.onclick = klikniPotvrdi;
}