function figura(strona) {
  if (strona == 1) {
    for (var i =1; i<9; i++) { //piony biale
      all[48+i-1].ptyp = 'p';
      all[48+i-1].pkolor = 'w';
    }
    all[61-1].ptyp = 'k'; //krol
    all[61-1].pkolor = 'w';

    all[60-1].ptyp = 'h'; //hetman
    all[60-1].pkolor = 'w';

    all[62-1].ptyp = 'g'; //goniec1
    all[62-1].pkolor = 'w';

    all[63-1].ptyp = 's'; //skoczek1
    all[63-1].pkolor = 'w';

    all[57-1].ptyp = 'w'; //wieza1
    all[57-1].pkolor = 'w';

    all[64-1].ptyp = 'w'; //wieza2
    all[64-1].pkolor = 'w';

    all[59-1].ptyp = 'g'; //goniec2
    all[59-1].pkolor = 'w';

    all[58-1].ptyp = 's'; //skoczek2
    all[58-1].pkolor = 'w';
  }

  if (strona == 2) {
    for (var i =1; i<9; i++) { //piony czarne
      all[8+i-1].ptyp = 'p';
      all[8+i-1].pkolor = 'b';
    }
    all[5-1].ptyp = 'k'; //krol
    all[5-1].pkolor = 'b';

    all[4-1].ptyp = 'h'; //hetman
    all[4-1].pkolor = 'b';

    all[3-1].ptyp = 'g'; //goniec1
    all[3-1].pkolor = 'b';

    all[2-1].ptyp = 's'; //skoczek1
    all[2-1].pkolor = 'b';

    all[1-1].ptyp = 'w'; //wieza1
    all[1-1].pkolor = 'b';

    all[8-1].ptyp = 'w'; //wieza2
    all[8-1].pkolor = 'b';

    all[6-1].ptyp = 'g'; //goniec2
    all[6-1].pkolor = 'b';

    all[7-1].ptyp = 's'; //skoczek2
    all[7-1].pkolor = 'b';
  }

  socket.emit('piony', all);
}
