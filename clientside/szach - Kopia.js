function szach() {
  var kPw; //pozycja krola bialego
  var kPb; //pozycja krola czarnego
  var szacuB = []; //bierki szachujace czarnego krola
  var szacuW = []; //bierki szachujace bialego krola

  for (var i = 0; i < all.length; i++) {
    if (all[i].ptyp == 'k' && all[i].pkolor == 'w') {
      kPw = i;
    }
    if (all[i].ptyp == 'k' && all[i].pkolor == 'b') {
      kPb = i;
    }
  }

  var xkw = all[kPw].x;
  var ykw = all[kPw].y;
  var xkb = all[kPb].x;
  var ykb = all[kPb].y;
    for (var i = 0; i < all.length; i++) {
      if (all[i].pkolor == 'w') { //szukana bierka jest biala - szachowanie czarnego

        var war5;
        var war1;
        if (all[i].ptyp != 'puste') {
          war1 = mozliwoscTyp(all[i].ptyp, xkb, ykb, all[i].x, all[i].y, i, kPb);
        }

        if (all[i].ptyp != 's') {
          war5 = poDrodze(all[i].x, all[i].y, xkb, ykb, i, kPb);
          if (war1 == 1 && war5 ==1) {
            szacuB.push(i);
          }
        }else if (war1 == 1) {
          szacuB.push(i);
        }

      }

      if (all[i].pkolor == 'b') { //szukana bierka jest czarna - szachowanie bialego

        var war5;
        if (all[i].ptyp != 'puste') {
          var war1 = mozliwoscTyp(all[i].ptyp, xkw, ykw, all[i].x, all[i].y, i, kPw);
        }

        if (all[i].ptyp != 's') {
          war5 = poDrodze(all[i].x, all[i].y, xkw, ykw, i, kPw);
          if (war1 == 1 && war5 ==1) {
            szacuW.push(i);
          }
        }else if (war1 == 1) {
          szacuW.push(i);
        }

      }
    }
  if (szacuB[0]) {
    var txt = 'SZACH CZARNYCH'
    $('#messages').append($('<li class="temp">').text(txt));
    $('.temp').addClass('error');
    $('.error').removeClass('temp');
    return 1;
  } else if(szacuW[0]){
    var txt = 'SZACH BIALYCH'
    $('#messages').append($('<li class="temp">').text(txt));
    $('.temp').addClass('error');
    $('.error').removeClass('temp');
    return 2;
  }else{
    return 0;
  }

}

function szachPO(sP, nP, sTyp, sKol) {
  var backup=new Array(all);
  var licznik=0;

  console.log(backup);

 all[sP].ptyp = 'puste';
 all[sP].pkolor = 'puste';
 all[nP].ptyp = sTyp;
 all[nP].pkolor = sKol;
licznik=szach();

  all = backup.slice();

delete backup;
return licznik;
}
