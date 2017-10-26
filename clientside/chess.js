var all = [];
var tura = 1;
var wielkosc = 400;
var setup = function() {
  var canvas = createCanvas(wielkosc,wielkosc);
  canvas.parent('battleg');
  pW = loadImage("bierki/pW.png");
  wW = loadImage("bierki/wW.png");
  gW = loadImage("bierki/gW.png");
  sW = loadImage("bierki/sW.png");
  hW = loadImage("bierki/hW.png");
  kW = loadImage("bierki/kW.png");

  pB = loadImage("bierki/pB.png");
  wB = loadImage("bierki/wB.png");
  gB = loadImage("bierki/gB.png");
  sB = loadImage("bierki/sB.png");
  hB = loadImage("bierki/hB.png");
  kB = loadImage("bierki/kB.png");

}
var draw = function() {


}
function updateFigury(tablica) { //rysowanie
  for (var i=0; i<all.length; i++) {
    all.splice(i);
  }
  clear();
//console.log(tablica);
  for (var i=0; i < tablica.length; i++) {
      all.push(tablica[i]);
      var a = canvas.width/8;
      var b = canvas.height/8;
      var row = (tablica[i].y-1)*a;
      var col = (tablica[i].x-1)*b;
      var img;
      var white = '#FFCCBB';
      var black = '#FFAA55';
      var whiteP = 255;
      var blackP = 150;
      var color;
      noStroke();
        if (tablica[i].kolor == 'w') {
          color = white;
        } else if (tablica[i].kolor == 'b') {
          color = black;
        }
        fill(color);
        rect(col, row, a, b);
        if (tablica[i].pkolor == 'w') {
            switch (tablica[i].ptyp) {
              case 'p':
              img = pW;
              break;
              case 'k':
              img = kW;
              break;
              case 's':
              img = sW;
              break;
              case 'g':
              img = gW;
              break;
              case 'h':
              img = hW;
              break;
              case 'w':
              img = wW;
              break;
            }
            image(img, col, row, a, b);
        }else if (tablica[i].pkolor == 'b') {
            switch (tablica[i].ptyp) {
              case 'p':
              img = pB;
              break;
              case 'k':
              img = kB;
              break;
              case 's':
              img = sB;
              break;
              case 'g':
              img = gB;
              break;
              case 'h':
              img = hB;
              break;
              case 'w':
              img = wB;
              break;
            }
            image(img, col, row, a, b);
        }

      }
//console.log(tablica);

  }
