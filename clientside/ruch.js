var tura;
function ruszanie(ruch) {
  var sP = ruch.sP; // indeks starej poz
  var nP = ruch.nP; // indeks nowej poz
  var sTyp = all[sP].ptyp;
  var nTyp = all[nP].ptyp;
  var sKol = all[sP].pkolor;
  var nKol = all[nP].pkolor;
  var sX = all[sP].x;
  var sY = all[sP].y;
  var nX = all[nP].x;
  var nY = all[nP].y;

  var war1 = mozliwoscTyp(sTyp, nX, nY, sX, sY, sP, nP); //ruch ze wzgledu na typ
  var war4 = wlasnyKolor(nKol, sKol); //czy nowy kolor jest wlasny
  var war5 = poDrodze(sX, sY, nX, nY, sP, nP); //mozliwosc ruchu ze wzgledu na przeszkode po drodze
  var war6 = czyNasiebie(sX, sY, nX, nY); //czy klikasz 2 raz na siebie
  var warTura = czyTura(sKol); //czy jest twoja tura
  var war7;
  var war8 = 1;

  var szachodp = szach();
  if(szachodp==1 && tura==1){
    war7=0;
  }else if(szachodp==1 && tura==-1) {
    war7=1;
  }else if(szachodp==2 && tura==-1){
    war7=0;
  }else if(szachodp==2 && tura==1){
    war7=1;
  }else if (szachodp==0){
    war7=1;
  }

    console.log(war7+' '+war1+' '+war4+' '+war6+' '+warTura+' '+war8);
// wykonywanie ruchu po sprawdzeniu mozliwosci

  if (war7 == 1 && war1 == 1 && war4 == 0 && war6 == 0 && warTura == 1) {
   var szachPoOdp=szachPO(sP, nP, sTyp, sKol);
    if(szachPoOdp==1 && tura==1){//szachowanie czarnego tura biała
      war8=1;
    }else if(szachPoOdp==1 && tura==(-1)){//szachowanie czarnego tura czarna
      war8=0;
    }else if(szachPoOdp==2 && tura==1){//szachowanie bialego tura biala
      war8=0;
    }else if(szachPoOdp==2 && tura==(-1)){//szachowanie bialego tura czarna
      war8=1;
    }
    if (war8 == 1 && sTyp == 's') {
      wykonajRuch(sP, nP, sTyp, sKol);
    } else if (war8 == 1 && war5 == 1) {
      wykonajRuch(sP, nP, sTyp, sKol);
    }
  }
}

function czyTura (sKol) {
  if (tura == 1 && sKol == 'w') {
    return 1;
  } else if (tura == -1 && sKol == 'b') {
    return 1;
  }
  return 0;
}

function wykonajRuch(sP, nP, sTyp, sKol) {
  all[sP].ptyp = 'puste';
  all[sP].pkolor = 'puste';
  all[nP].ptyp = sTyp;
  all[nP].pkolor = sKol;
  czyruch=0;
  zy = -2;
  zx = -2;
  all[ruch.sP].kolor = ruch.sK;
  socket.emit('piony', all);
  socket.emit('tura', tura);
}

function czyNasiebie(sX, sY, nX, nY) {
  if (sX == nX && sY == nY) {
    zy = -2;
    zx = -2;
    czyruch=0;
    all[ruch.sP].kolor = ruch.sK;
    return 1;
  } else {
    return 0;
  }
}


function mozliwoscTyp(sTyp, nX, nY, sX, sY, sP, nP) {
  switch (sTyp) {
    case 'w':
      if (sX == nX) {
        return 1;
      } else if (sY == nY) {
        return 1;
      } else {return 0;}
    break;
    case 'g':
    if ( (Math.abs(sX-nX)) == (Math.abs(sY-nY)) ) {
        return 1;
      } else {return 0;}

    break;

    case 's':
    if ( nP == sP-17 || nP == sP-15 || nP == sP-10 || nP == sP-6 || nP == sP+6 || nP == sP+10 || nP == sP+15 || nP == sP+17 ) {
        return 1;
      } else {return 0;}
    break;

    case 'h':
      if (sX == nX) {
        return 1;
      } else if (sY == nY) {
        return 1;
      } else if ( (Math.abs(sX-nX)) == (Math.abs(sY-nY)) ) {
        return 1;
      } else {return 0;}
    break;

    case 'k':
    if ( nP == sP-9 || nP == sP-8 || nP == sP-7 || nP == sP-1 || nP == sP+1 || nP == sP+7 || nP == sP+8 || nP == sP+9 ) {
        return 1;
      } else {return 0;}
    break;

    case 'p':
    if (nX == sX) { //ruch do przodu bez bicia
      if (sY == 2 || sY == 7) {//poczatkowy ruch o 2
        if(all[nP].ptyp == 'puste' && (((nY == sY +2) && (all[sP].pkolor=='b')) || ((nY == sY -2) && (all[sP].pkolor=='w')))) {
          return 1;
        }
        if (all[nP].ptyp == 'puste'&& all[sP].pkolor == 'w' && (nY == sY-1)) {
          return 1;
        }
        if (all[nP].ptyp == 'puste'&& all[sP].pkolor == 'b' && (nY == sY+1)) {
          return 1;
        }
      } else {//ruch o 1
        if (all[nP].ptyp == 'puste'&& all[sP].pkolor == 'w' && (nY == sY-1)) {
          return 1;
        }
        if (all[nP].ptyp == 'puste'&& all[sP].pkolor == 'b' && (nY == sY+1)) {
          return 1;
        }
      }
    } else {
      if (all[nP].ptyp != 'puste' && all[sP].pkolor == 'w' && (nY == sY-1) && (nX == sX-1 || nX ==sX+1)) {
        return 1;
      }
      if (all[nP].ptyp != 'puste' && all[sP].pkolor == 'b' && (nY == sY+1) && (nX == sX-1 || nX ==sX+1)) {
        return 1;
      }
    }return 0;
    break;

    default:
    console.log('brak typu figury');
    return 0;
    break;
  }

}

function wlasnyKolor(nKol, sKol) {
  if (nKol == sKol) {
    zy = -2;
    zx = -2;
    return 1;
  } else {return 0;}
}

function poDrodze(sX, sY, nX, nY, sP, nP) {
    //pionowo
    if (sX == nX && sY != nY) {
      var odl = Math.abs(sP-nP);
      var min;
      if (sP<nP) {
        min = sP;
      } else { min = nP;}
      for (var i=(min+8); i<(min+odl);) {
        if (all[i].pkolor != 'puste') {

          return 0;
        }
        i = i+8;
      }return 1;
    }

    //poziomo
    if (sX != nX && sY == nY) {
      var odl = Math.abs(sP-nP);
      var min;
      if (sP<nP) {
        min = sP;
      } else { min = nP;}
      for (var i=(min+1); i<(min+odl); i++) {
        if (all[i].pkolor != 'puste') {
          return 0;
        }
      }return 1;
    }

    //po skosie
    if (Math.abs(sX - nX) == Math.abs(sY - nY)) { //czy mamy do czynienia z ruchem po przekatnej kwadratu
      var odl = Math.abs(sP-nP); //odleglosc
      var min;
      if (sP<nP) {
        min = sP;
      } else { min = nP;}
      if (((sX < nX) && (sY < nY)) || ((sX > nX) && (sY > nY))) {
        for (var i=(min+1+8); i<(min+odl);) {
          if (all[i].pkolor != 'puste') {
            return 0;
          }
          i = i+9;
        }
      }else if (((sX < nX) && (sY > nY)) || ((sX > nX) && (sY < nY))) {
        for (var i=(min-1+8); i<(min+odl);) {
          if (all[i].pkolor != 'puste') {
            return 0;
          }
          i = i+7;
        }
      }
      return 1;
    }
}
