function generisiTabelu(data) {
    let rezultat = document.getElementById('rezultat');

    let tabela = document.createElement('table');
    tabela.className = 'rezultat-tabela';
    let tijeloTabele = document.createElement('tbody');

    let red_1 = document.createElement('tr');
    let red_1_kolona_1 = document.createElement('td');
    let red_1_kolona_2 = document.createElement('td');
    red_1_kolona_1.innerHTML = 'prisustvoZaSedmicu';
    red_1_kolona_2.innerHTML = data.prisustvoZaSedmicu;
    red_1.appendChild(red_1_kolona_1);
    red_1.appendChild(red_1_kolona_2);

    let red_2 = document.createElement('tr');
    let red_2_kolona_1 = document.createElement('td');
    let red_2_kolona_2 = document.createElement('td');
    red_2_kolona_1.innerHTML = 'prisutan';
    red_2_kolona_2.innerHTML = data.prisutan;
    red_2.appendChild(red_2_kolona_1);
    red_2.appendChild(red_2_kolona_2);

    let red_3 = document.createElement('tr');
    let red_3_kolona_1 = document.createElement('td');
    let red_3_kolona_2 = document.createElement('td');
    red_3_kolona_1.innerHTML = 'odsutan';
    red_3_kolona_2.innerHTML = data.odsutan;
    red_3.appendChild(red_3_kolona_1);
    red_3.appendChild(red_3_kolona_2);

    let red_4 = document.createElement('tr');
    let red_4_kolona_1 = document.createElement('td');
    let red_4_kolona_2 = document.createElement('td');
    red_4_kolona_1.innerHTML = 'nijeUneseno';
    red_4_kolona_2.innerHTML = data.nijeUneseno;
    red_4.appendChild(red_4_kolona_1);
    red_4.appendChild(red_4_kolona_2);

    tijeloTabele.appendChild(red_1);
    tijeloTabele.appendChild(red_2);
    tijeloTabele.appendChild(red_3);
    tijeloTabele.appendChild(red_4);
    tabela.appendChild(tijeloTabele);

    if(rezultat) {
        rezultat.innerHTML = '';
        rezultat.appendChild(tabela);
    }
}

function callback (error, data) {
    let greska = document.getElementById('greska');

    if(error) {
        greska.style.color = 'red';
        if(error.status)
            greska.innerHTML = error;
        else
            greska.innerHTML = 'Nepoznata greska';
        return;
    }

    if(data == null) return;

    let rezultat = document.getElementById('rezultat');

    greska.innerHTML = '';

    if(data.status) {
        rezultat.innerHTML = data.status;
    } else {
        generisiTabelu(data);
    }
}

function klikniPretrazi () {
    let kodPredmetaPolje = document.getElementById('kod-predmeta');
    let kodPredmeta = '';
    if(kodPredmetaPolje) kodPredmeta = kodPredmetaPolje.value.trim();

    let indexStudentaPolje = document.getElementById('index-studenta');
    let indexStudenta = '';
    if(indexStudentaPolje) indexStudenta = indexStudentaPolje.value.trim();

    let sedmicaPolje = document.getElementById('sedmica');
    let sedmica = '';
    if(sedmicaPolje) sedmica = sedmicaPolje.value.trim();

    if( kodPredmeta == '' || indexStudenta == '' || sedmica == '' ) {
        let greska = document.getElementById('greska');
        greska.style.color = 'red';
        greska.innerHTML = 'Polja ne smiju biti prazna';
        return;
    }

    AjaxPozivi.dajPrisustvo(kodPredmeta, indexStudenta, sedmica, callback);
}

let dugme = document.getElementById('pretraziDugme');
if(dugme) {
    dugme.onclick = klikniPretrazi;
}