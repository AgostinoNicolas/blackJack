const miModulo = (() =>{
    'use strick';

    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['J','K','Q','A'];

    let puntosJugadores = [];


    // Referencias del Html
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHtml = document.querySelectorAll('small');


    // Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2) =>{
        deck = crearDeck();
        puntosJugadores = [];
        for( let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHtml.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // Esta función permite crear un mazo aleatorio
    const crearDeck = () => {

        deck = [];

        for(let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }
        }

        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }
        return _.shuffle( deck );
    }

    // Esta función nos permite tomar una carta
    const pedirCarta = ( ) => {
        if( deck.length === 0){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    // Esta función nos permite dar un valor a las cartas
    const valorCarta = ( carta ) => {
        let valor = carta.substring(0, carta.length -1);
        return ( isNaN( valor ) ) ?
                (valor === 'A') ? 11 : 10
                : valor * 1;
    }

    //Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = (carta, turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    // Esta función crea la imagen de la carta
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
            imgCarta.src = `cartas/${carta}.png`;
            imgCarta.className = 'cartas';
            divCartasJugadores[turno].append(imgCarta);
    }

    // Esta función determina el ganador del juego
    const determinarGanador = () => {
        const [puntosComputadora, puntosMinimos] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Empataron, juega de nuevo');              
            }else if (puntosMinimos > 21){
                alert('Lo siento, la computadora gano');
            }else if (puntosComputadora > 21){
                alert('Felicitaciones, ganaste!');
            }else{
                alert('Lo siento, la computadora gano');
            }
        }, 100);
    }


    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do{
            let carta = pedirCarta();

            // Puntos del Computadora
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
            // Agrega la carta en el Html
            crearCarta(carta, puntosJugadores.length -1);

        }while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }


    // Eventos
    // Botón "Pedir carta"
    btnPedir.addEventListener('click', () => { 

        const carta = pedirCarta();
        // Puntos del jugador
        const puntosJugador = acumularPuntos(carta, 0);
        // Agrega la carta en el Html
        crearCarta(carta, 0);

        if( puntosJugador > 21 ){
            console.warn('Lo siento, perdiste.');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if( puntosJugador === 21){
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    // Botón "Detener"
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });

    // Botón "Nuevo juego"
    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

})();





