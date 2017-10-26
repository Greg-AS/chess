var ruch = {
	sP: 0,
	nP:	0,
	sK: 'z'
};
var czyruch = 0;
function mouseClicked() {

		if (mouseX >= 0 && mouseX <= canvas.width && mouseY >= 0 && mouseY <= canvas.height) {
			var a = canvas.width/8;
			var b = canvas.height/8;
			var posx;
			var posy;
			var p;
			for (var i=1; i <9; i++) {
				var ia = i*a;
				if (mouseX < (ia)) {
					posx = i;
					break;
				}
			}

			for (var i=1; i<9; i++) {
				var ib = i*b;
				if (mouseY < (ib)) {
					posy = i;
					break;
				}
			}
			for (var i=0; i < all.length; i++) {
				if (all[i].x == posx && all[i].y == posy) {
					p = i;
				}
			}
			if (czyruch == 0) {
				if (all[p].ptyp != 'puste') {
					var turr = czyTura(all[p].pkolor);
					if (turr) {
						ruch.sP= p;
						czyruch = 1;
						//console.log("DOCHODZI");
						ruch.sK = all[p].kolor;
						zx = posx;
						zy = posy;
					} else {
						txt = 'Rusza przeciwny kolor'
				    $('#messages').append($('<li class="temp">').text(txt));
				    $('.temp').addClass('error');
				    $('.error').removeClass('temp');
					}
				}
			} else {
				ruch.nP = p;
				ruszanie(ruch);
			}
		}
}
