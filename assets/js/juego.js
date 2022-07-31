/**
 * 2C -> Two of Clubs
 * 2D -> Two of Diamonds
 * 2H -> Two of Hearts
 * 2S -> Two of Sword
 **/


 (()=>{
 	'use strict'

	 	// Objects from DOM
	const btnPedir = document.querySelector('#btnPedir'),
	      btnDetener = document.querySelector('#btnDetener'),
	      btnNuevo = document.querySelector('#btnNuevo');
	let smallElementArrays = document.querySelectorAll('small');
	let smallJugador = smallElementArrays[0],
	    smallComputadora = smallElementArrays[1];
	const divCartasJugador = document.querySelector('#jugador-cartas'),
	      divCartasComputer = document.querySelector('#computadora-cartas');



	// Global Variables
	let puntosJugador     = 0,
	    puntosComputadora = 0;




	const inicializarJuego = ()=>{
		deck = crearDeck();


		//último jugador la computadora;
	}


	const crearDeck = () => {
		let deck = [];
		const tipos      = ['C','D','H','S'],
		      especiales = ['A','J','Q','K'];

		for( let i = 2; i<=10; i++){
			for(let tipo of tipos){
				deck.push(i+tipo);
			}
		}

		for( let tipo of tipos){
			for (let especial of especiales){
				deck.push(especial+tipo);
			}
		}
		//console.log(deck);
		deck = _.shuffle(deck);
		//console.log(deck);

		return deck;
	};

	let deck = crearDeck();

	const pedirCarta = (mazoCartas) => {
		if(deck.length === 0){
			throw 'no hay cartas en el deck';
		}

		return mazoCartas.pop();
	}

	let carta = pedirCarta(deck);


	const valorCarta = (carta) =>{
		let valor = carta.substring(0,carta.length-1);
		return isNaN(valor)? ((valor==='A')? 11:10) : Number(valor);;
	}

	// jugador pierde o aprieta detener - Turno de computadora
	const turnoComputadora = (puntosMinimos) => {

		do{

			const carta = pedirCarta(deck);
			puntosComputadora += valorCarta(carta);
			smallComputadora.innerHTML=puntosComputadora;
			divCartasComputer.innerHTML += `<img class="carta" src="./assets/cartas/${carta}.png">`;

			if( puntosMinimos > 21 ){
				break;
			}



		}while(puntosComputadora <= puntosMinimos && puntosComputadora <= 21);


		setTimeout(()=>{
			if( puntosComputadora === puntosJugador){
				alert('Nadie Gana');
			}else if(puntosJugador > 21){
				alert('Computadora Gana');
			}
			else if( puntosComputadora > 21){
				alert('Jugador Gana');
			}
			else if( puntosComputadora > puntosJugador && puntosComputadora <= 21){
				alert('Computadora Gana')
			}


		},50);




	}




	// Eventos
	btnPedir.addEventListener('click',()=>{
		const carta = pedirCarta(deck);
		puntosJugador += valorCarta(carta);
		smallJugador.innerHTML=puntosJugador;

		divCartasJugador.innerHTML += `<img class="carta" src="./assets/cartas/${carta}.png">`;

		/*
		const cartaElement = document.createElement('img'); 
		cartaElement.setAttribute("class","carta"); 
		cartaElement.setAttribute("src",`./assets/cartas/${carta}.png`);
		divCartasJugador.appendChild(cartaElement);

		//<img class="carta" src="./assets/cartas/2C.png">
		*/

		if (puntosJugador > 21){
			btnPedir.disabled = true;
			console.warn('Lo siento mucho, perdiste');
			turnoComputadora(puntosJugador);
		}

		else if (puntosJugador === 21){
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			console.warn('21 ---- gran avance');
			turnoComputadora(puntosJugador);


		}

	});


	btnDetener.addEventListener('click', ()=>{
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoComputadora(puntosJugador);
	});



	btnNuevo.addEventListener('click',()=>{
		btnPedir.disabled = false;
		btnDetener.disabled = false; 
		deck = crearDeck();
		puntosJugador = 0;
		puntosComputadora = 0;
		smallComputadora.innerHTML= 0 ;
		divCartasComputer.innerHTML = '';
		smallJugador.innerHTML= 0;
		divCartasJugador.innerHTML = '';
		//console.log(deck);
		


});
 })();

 