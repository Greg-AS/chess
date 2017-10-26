var helmet = require('helmet')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var figury = [];
var tur = 1;

//Create the app
app.use(helmet())
app.disable('x-powered-by')

var data;
var logind;
var masterObject = {
		ip: 0,
		nick: 'masterObject',
		gra: '-1',
};

var online = [masterObject];


//HOST SERWERA HTTP
//Using express: http://expressjs.com/



var sendy = function(req, res){
 res.send('<h1>Hello worldd</h1>');
 // res.sendFile(__dirname + '/client/index.html');
}
app.get('', sendy);
var doit = function() {
  console.log('listening on *:3000');
}
http.listen(3000, doit);
/////////////////////



	function logowanie(ip, nick){
		var logod = {
				ip: ip,
				nick: nick,
				gra: '0'
		};
		online.push(logod);
	}

	function update(ip, nick) {
		for (var i = 0; i <= online.length-1; i++) {
			var temp = online[i].ip;
			if (ip == temp) {
				online[i].nick = nick;
				break;
			}
		}
	}

	function intoGameWhite(ip) {
		for (var i = 0; i <= online.length-1; i++) {
			var temp = online[i].ip;
			if (ip == temp) {
				online[i].gra = '1';
				break;
			}
		}
	}
	function intoGameBlack(ip) {
		for (var i = 0; i <= online.length-1; i++) {
			var temp = online[i].ip;
			if (ip == temp) {
				online[i].gra = '-1';
				break;
			}
		}
	}

	function delet(ip) {

		for (var i = 0; i <= online.length-1; i++) {
			var temp = online[i].ip;
			if (ip == temp) {
				online.splice(i);
				break;
			}
		}
	}

	function checkGame(par) {
		var ttp = 0;
		for (var i = 0; i <= online.length-1; i++) {
			if (online[i].gra == par){
				ttp++;
			}
		}
		return ttp;
	}

	function wyborGracza(ip, gra, ttp) {
		if (ttp==0 && gra == 1) {
    		intoGameWhite(ip);
    		io.sockets.emit('grasz', "Rozpoczyna się gra");
    		heartbeat();

		}else if(ttp!=0 && gra == 1) {
    		io.sockets.emit('grasz', "Miejsce jest zajęte");
    		heartbeat();
		}
		if (ttp==0 && gra == 2) {
    		intoGameBlack(ip);
    		io.sockets.emit('grasz', "Rozpoczyna się gra");
    		heartbeat();

		}else if(ttp!=0 && gra == 2) {
    		io.sockets.emit('grasz', "Miejsce jest zajęte");
    		heartbeat();
		}
	}
	function createBattle() {
			for (var j = 1; j < 9; j++) {
				for (var i = 1; i < 9; i++) {
					var y_ = j;
					var x_ = i;

					if (y_ == 1 || y_ == 3 || y_ == 5 || y_ == 7) {
						if (x_ == 1 || x_ == 3 || x_ == 5 || x_ == 7) {
							var kolor = 'w';
						} else {
							var kolor = 'b';
						}
					} else {
						if (x_ == 1 || x_ == 3 || x_ == 5 || x_ == 7) {
							var kolor = 'b';
						} else {
							var kolor = 'w';
						}
					}
					var pole = {
						kolor: kolor,
						x: x_,
						y: y_,
						ptyp: 'puste',
						pkolor: 'puste'
					};
					figury.push(pole); //tablica: A to y=8, H to y=1
				}
			}
	}
createBattle();

//setInterval(heartbeat, 3000);

function heartbeat() {
  io.sockets.emit('figury', figury);
	io.sockets.emit('online', online);
}

function emitTura() {
	io.sockets.emit('tura', tur);
}

//PAKIETY socket
io.sockets.on('connection',
  // We are given a websocket object in our function
  function(socket) {

    data = "Nowy uzytkownik!";
    console.log("Nowy uzytkownik: " + socket.id);
    logowanie(socket.id, "Obserwator");
    heartbeat();
		emitTura();

      io.sockets.emit('zwrot', data);

    socket.on('disconnect', function() {
      data = "Uzytkownik wychodzi...";
      console.log("Client has disconnected");
      delet(socket.id);
      heartbeat();
      io.sockets.emit('zwrot', data);
    });


    socket.on('message',
    	function(dane) {
    	update(socket.id, dane.login);
    	var ttp = 0;
    	if (dane.gra == 1){
    		ttp = checkGame(1);
    		wyborGracza(socket.id, dane.gra, ttp);

   		} else if (dane.gra == 2) {
    		ttp = checkGame(2);
    		wyborGracza(socket.id, dane.gra, ttp);
   		} else {
   	    	heartbeat();
    		io.sockets.emit('zwrot2', dane)
   		}
    });

    socket.on('piony',
    	function(figs) {
			for (var i=0; i<figury.length; i++) {
				figury.splice(i);
			}
			for (var i=0; i<figs.length; i++) {
				var tefigs = figs[i];
				figury.push(tefigs);
			}
   	    	heartbeat();
   		}
    );
		socket.on('tura',
    	function(tura) {
					tur = -tur;
   	    	emitTura();
   		}
    );
		socket.on('stop',
    	function(cos) {
					tur = 1;
					figury = [];
					createBattle();
					io.sockets.emit('grasz', "Gra zakonczona przez jednego z uzytkownikow");
   	    	emitTura();
					heartbeat();
   		}
    );
  }
);
