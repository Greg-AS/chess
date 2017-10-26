function szach(tabl = all, warmat = 0) {
  var kPw; //pozycja krola bialego
  var kPb; //pozycja krola czarnego
  var szacuB = []; //bierki szachujace czarnego krola
  var szacuW = []; //bierki szachujace bialego krola

  for (var i = 0; i < tabl.length; i++) {
    if (tabl[i].ptyp == 'k' && tabl[i].pkolor == 'w') {
      kPw = i;
    }
    if (tabl[i].ptyp == 'k' && tabl[i].pkolor == 'b') {
      kPb = i;
    }
  }
console.log("szach po kpb");
  var xkw = tabl[kPw].x;
  var ykw = tabl[kPw].y;
  var xkb = tabl[kPb].x;
  var ykb = tabl[kPb].y;
    for (var i = 0; i < tabl.length; i++) {
      if (tabl[i].pkolor == 'w') { //szukana bierka jest biala - szachowanie czarnego

        var war5;
        var war1;
        if (tabl[i].ptyp != 'puste') {
          war1 = mozliwoscTyp(tabl[i].ptyp, xkb, ykb, tabl[i].x, tabl[i].y, i, kPb);
        }

        if (tabl[i].ptyp != 's') {
          war5 = poDrodze(tabl[i].x, tabl[i].y, xkb, ykb, i, kPb);
          if (war1 == 1 && war5 ==1) {
            szacuB.push(i);
          }
        }else if (war1 == 1) {
          szacuB.push(i);
        }

      }

      if (tabl[i].pkolor == 'b') { //szukana bierka jest czarna - szachowanie bialego

        var war5;
        if (tabl[i].ptyp != 'puste') {
          var war1 = mozliwoscTyp(tabl[i].ptyp, xkw, ykw, tabl[i].x, tabl[i].y, i, kPw);
        }

        if (tabl[i].ptyp != 's') {
          war5 = poDrodze(tabl[i].x, tabl[i].y, xkw, ykw, i, kPw);
          if (war1 == 1 && war5 ==1) {
            szacuW.push(i);
          }
        }else if (war1 == 1) {
          szacuW.push(i);
        }

      }
    }
  if(warmat==0){
    if (szacuB[0]) {
    if (mat() == 1){
var txt = 'SZACH MAT KONIEC GRY (WYGRYWA BIALY)'
      $('#messages').append($('<li class="temp">').text(txt));
      $('.temp').addClass('error');
      $('.error').removeClass('temp');
    koniecGry();
}
    var txt = 'SZACH CZARNYCH'
    $('#messages').append($('<li class="temp">').text(txt));
    $('.temp').addClass('error');
    $('.error').removeClass('temp');
    return 1;
  } else if(szacuW[0]){
    if (mat() == 1){
var txt = 'SZACH MAT KONIEC GRY (WYGRYWA CZARNY)'
      $('.temp').addClass('error');
      $('.error').removeClass('temp');
koniecGry();
    }
    var txt = 'SZACH BIALYCH'
    $('#messages').append($('<li class="temp">').text(txt));
    $('.temp').addClass('error');
    $('.error').removeClass('temp');
    return 2;
  }else{
    return 0;
  }
}
}

function mat() {
  console.log("mat poczatek");
  var warmat = 1;
  var liczBlad = 0; //liczbna pionow z niemoznoscia ruchu
  var liczAll = 0; //liczba wszystkich pionow danego typu
    for (var i = 0; i < all.length; i++ ) {
      if (all[i].pkolor == 'b') {
        liczAll++;
        for (var j = 0; j < all.length; j++){
          console.log("mat srodek");
            var wr1, wr4, wr5, wr9;
            var sTyp = all[i].ptyp;
            var nX = all[j].x;
            var nY = all[j].y;
            var sX = all[i].x;
            var sY = all[i].y;
            var sP = i;
            var nP = j;
            var nKol = all[j].pkolor;
            var sKol = all[i].pkolor;
            if(czyNasiebie(sX, sY, nX, nY)==0){
              wr1 = mozliwoscTyp(sTyp, nX, nY, sX, sY, sP, nP); //ruch ze wzgledu na typ
              wr4 = wlasnyKolor(nKol, sKol); //czy nowy kolor jest wlasny
              wr5 = poDrodze(sX, sY, nX, nY, sP, nP); //mozliwosc ruchu ze wzgledu na przeszkode po drodze
              wr9 = szachPO(sP, nP, sTyp, sKol, warmat); //czy bedzie szach po hipotetycznym ruchu
              if (wr1 == 0 || wr4 == 1 || wr5 == 0 || wr9 != 0) {
                liczBlad++;
              }
            }
        }
      }
    }
    console.log(liczBlad);
    console.log(liczAll);

    if (liczBlad == liczAll) {
        return 1;
    } else {
        return 0;
    }
  }


///////////////////////////////////////////////////////////////

function szachPO(sP, nP, sTyp, sKol,warmat=0) {
  var backup=all.slice();
  var licznik=0;
  socket.emit('piony', all); //dziala ale nie wiadomo dlaczego
  console.log("szachpo");

 backup[sP].ptyp = 'puste';
 backup[sP].pkolor = 'puste';
 backup[nP].ptyp = sTyp;
 backup[nP].pkolor = sKol;
licznik=szach(backup,warmat);

delete backup;
//console.log(backup);
return licznik;
}
