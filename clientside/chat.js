var socket = io.connect('http://185.5.98.101:3000');
var onl = [];
function okno(){

	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			winH = window.innerHeight;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			winH = document.body.offsetHeight;
		}
	}
 $('input').blur();
nazwa_zmiennej = document.getElementById('przyklad');
nazwa_zmiennej.style.height=winH+"px";
}
function chat(){


  var tresc;
  var login;

  $('#m').keypress(function (e) {
        //e.preventDefault();
        var enter = e.keyCode === 13 || e.which === 13;
        if (enter) {
          tresc = $('#m').val();
          login = $('#login').val();
          if (login == "nick"){
          	var blad = "PODAJ NICK";
              $('#messages').append($('<li class="temp">').text(blad));
              $('.temp').addClass('error');
              $('.error').removeClass('temp');
          } else if (tresc == "/s"){
              var dane = {
                	  login: login,
                	  tresc: tresc,
                	  gra: '1'
                  };
              socket.emit('message', dane);
							var dane = {
                	  login: login,
                	  tresc: tresc,
                	  gra: '2'
                  };
              socket.emit('message', dane);
			  		figura(1);
						figura(2);
             $('#m').val("");
          } else if (tresc == "/c"){
              socket.emit('stop', 1);
             $('#m').val("");
          } else {
          var dane = {
        	  login: login,
        	  tresc: tresc,
        	  gra: '0'
          };
          socket.emit('message', dane);
          $('#m').val("");
          }
        }
        return !enter;
    });
 socket.on('online', function(online){
	 $('.onl').remove();
	 $('.onl2').remove();
	 for (var i=0; i<onl.length; i++) {
     onl.splice(i);
   }
		for (var i = 0; i < online.length; i++) {
			onl.push(online[i]);
			if (online[i].nick == 'Obserwator') {
		     $('#onl').append($('<li class="temp">').text(online[i].nick));
		     $('.temp').addClass('onl');
		     $('.onl').removeClass('temp');
			} else if (online[i].nick == 'masterObject'){
			} else {
			     $('#onl').append($('<li class="temp">').text(online[i].nick));
			     $('.temp').addClass('onl2');
			     $('.onl2').removeClass('temp');
			}
		}
	  });
 socket.on('zwrot', function(dane){
	     $('#messages').append($('<li>').text(dane));
	  });
 socket.on('zwrot2', function(dane){
	 var czy = $('#login').val();
	 if (dane.login == czy) {
     $('#messages').append($('<li class="temp">').text(dane.tresc));
     $('.temp').addClass('you');
     $('.you').removeClass('temp');
     var objDiv = document.getElementById("messages");
     objDiv.scrollTop = objDiv.scrollHeight;
	 } else {
	 $('#messages').append($('<li class="temp">>').text(dane.login+': '+dane.tresc));
     $('.temp').addClass('they');
     $('.they').removeClass('temp');
     var objDiv = document.getElementById("messages");
     objDiv.scrollTop = objDiv.scrollHeight;
	 }
	 if (dane.inGame == 1) {
		 console.log("zaczyna sie gra");
	 }
  });
 socket.on('grasz', function(grasz){
     $('#messages').append($('<li class="temp">').text(grasz));
     $('.temp').addClass('play');
     $('.play').removeClass('temp');
  });
 socket.on('figury', function(tablica){
	updateFigury(tablica);
 });
 socket.on('tura', function(tur){
	 tura = tur;
	 var txt;
	 if (tura == 1) {
     txt = 'Nastepny ruch: Biale'
     $('#messages').append($('<li class="temp">').text(txt));
     $('.temp').addClass('play');
     $('.play').removeClass('temp');
   } else {
     txt = 'Nastepny ruch: Czarne'
     $('#messages').append($('<li class="temp">').text(txt));
     $('.temp').addClass('play');
     $('.play').removeClass('temp');
   }
 });

 this.blabla = function() {
	 console.log('BLALDAL');
 }
}
