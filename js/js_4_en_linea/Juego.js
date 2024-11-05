class Juego {

    constructor(modo, aliasAndroid, urlAndroid, aliasApple, urlApple, canvas, ctx) {

        this.modo = modo;
        this.urlAndroid = urlAndroid;
        this.urlApple = urlApple;
        this.cantidadFichas = ((this.modo + 2)*(this.modo + 3))/2; // Calcula la cantidad de fichas
        this.aliasAndroid = aliasAndroid;
        this.aliasApple = aliasApple;

        this.canvas = canvas;
        this.ctx = ctx; // Contexto del canvas
        this.tiempoRestante = 10 * 60; // 10 minutos en segundos
        this.intervalo = null; // Variable para el intervalo
        this.minutos = 0;
        this.segundos = 0;
        this.ficha;
        this.turno = 1;

        this.BotonReiniciar = new Boton('Reiniciar', 1360, 1560, 50, 130,this.ctx,this.canvas);
        this.BotonMenu = new Boton('Menu', 1360, 1560, 150, 230,this.ctx,this.canvas);

        
        let coordenada = new Coordenada(170, 400);
        this.displayJugadorIzq = new DisplayJugador(urlAndroid,this.aliasAndroid, this.cantidadFichas, coordenada, ctx);
        coordenada = new Coordenada(1320, 400);
        this.displayJugadorDer = new DisplayJugador(urlApple,this.aliasApple, this.cantidadFichas, coordenada, ctx);
        
        this.timer = new Timer(300,this.ctx);

        this.t1 = new Tablero(modo,ctx);
        
        //this.t1.drawTablero();
        this.drawCanvas();
        this.jugar();

    }

    drawBotonReiniciar(){
        /////////////////////////////BOTON REINICIAR//////////////////////////////////////////

        this.drawRoundedHollowRectangle(1360,50,200,80,30,5,'#7CFFDC','#10D4A3');
        const start = 'Reiniciar';
        this.ctx.fillStyle = '#665BAA'; // Color del texto    
        this.ctx.font = 'bold 40px Nunito, sans-serif'; // O usando "bold" para negrita
        const startWidth = this.ctx.measureText(start).width; // Obtener el ancho del texto
        // Dibujar el texto del título
        const startX = (this.canvas.width - startWidth) / 2; // Posición X para centrar
        this.ctx.fillText(start, 1460, 105); // Dibujar el título centrado
        
        ////////////////////////////////////////////////////////////////////////////////

    }

    drawBotonMenu(){
        /////////////////////////////BOTON MENU//////////////////////////////////////////

        this.drawRoundedHollowRectangle(1360,150,200,80,30,5,'#7CFFDC','#10D4A3');
        const start = 'Menú';
        this.ctx.fillStyle = '#665BAA'; // Color del texto    
        this.ctx.font = 'bold 40px Nunito, sans-serif'; // O usando "bold" para negrita
        const startWidth = this.ctx.measureText(start).width; // Obtener el ancho del texto
        // Dibujar el texto del título
        const startX = (this.canvas.width - startWidth) / 2; // Posición X para centrar
        this.ctx.fillText(start, 1460, 205); // Dibujar el título centrado
        
        ////////////////////////////////////////////////////////////////////////////////

    }

  /*  ClickearBotonMenu(){
        this.canvas.addEventListener("mousedown", (e) => {
            if(this.BotonMenu.evaluarCLickEnbotones(e.offsetX,e.offsetY)){
                    console.log("BOTON MENU");
            }
        });
    }

    ClickearBotonReiniciar(){
        this.canvas.addEventListener("mousedown", (e) => {
            if(this.BotonReiniciar.evaluarCLickEnbotones(e.offsetX,e.offsetY)){
                    console.log("BOTON REINICIAR");
                   
            }
        });
    }*/


   
    


    
    
    cambiarTurno() {
        this.turno = 1 - this.turno; // Cambia entre 0 y 1
        console.log(this.turno === 0 ? "Es el turno del Jugador 1" : "Es el turno del Jugador 2");
    }
    
    jugar() {
        
        //creo que turno debe volverse JugadorActual
        let fichaSigueClickeada = false;

        this.canvas.addEventListener("mousedown", (e) => {
            //evaluar si hizo click donde se espera
            
            console.log("MOUSE DOWN CON TURNO: "+this.turno);
            if (this.timer.tiempoRestante > 0) { // Controlo tiempo   
                if ((this.turno == 1) && (this.displayJugadorIzq.evaluarClick(e.offsetX,e.offsetY))) {
                    fichaSigueClickeada = true;
                    console.log("DENTRO DEL CIRCULO 1");
                    let coordenada = new Coordenada(e.offsetX, e.offsetY);
                    let radio = (860 / (this.modo + 3)) * 0.4;
                    this.ficha = new Ficha(coordenada, radio, this.urlAndroid, 1, this.ctx, null);
                    this.ficha.dibujarFicha();
                }else{
                    if ((this.turno == 0) && (this.displayJugadorDer.evaluarClick(e.offsetX,e.offsetY))) {
                        fichaSigueClickeada = true;
                        console.log("DENTRO DEL CIRCULO 2");
                        let coordenada = new Coordenada(e.offsetX, e.offsetY);
                        let radio = (860 / (this.modo + 3)) * 0.4;
                        this.ficha = new Ficha(coordenada, radio, this.urlApple, 2, this.ctx, null);
                        this.ficha.dibujarFicha();
                    }
                }
            }
            else{
                console.log("Se acabo el tiempo");
            }
        });

        this.canvas.addEventListener("mousemove", (e) => {
        //console.log("MOVIO");
            if (this.timer.tiempoRestante > 0) { // Controlo tiempo   
                if(fichaSigueClickeada){  
                    
                    this.moverFicha(e.offsetX, e.offsetY);
                }
            }
            else{
                fichaSigueClickeada = false;
            } 
        });   
        
        this.canvas.addEventListener("mouseup", (e) => {
        
          if (this.timer.tiempoRestante > 0) { // Controlo tiempo     
            if (fichaSigueClickeada) {
                fichaSigueClickeada = false;
                let soltoEnColumna = this.t1.evaluarHover(e.offsetX, e.offsetY)

                if (soltoEnColumna != -1) {// Solto en el Hover soltar

                    let filaCasilleroLibre = this.t1.hayCasilleroLibre(soltoEnColumna);
                    if (filaCasilleroLibre != -1) {

                        this.caerFicha(filaCasilleroLibre, soltoEnColumna)
                        let filaColocoFicha = this.t1.colocarFicha(filaCasilleroLibre, soltoEnColumna, this.ficha, this.turno);
                        
                        if (filaColocoFicha != -1){ // pudo colocar la ficha
                            
                            console.log("Colocó ficha en fila: "+ filaColocoFicha);
                            if (this.turno == 1) {
                                this.displayJugadorIzq.cantidadFichas -- ;
                            }
                            else {
                                if (this.turno == 0) {
                                    this.displayJugadorDer.cantidadFichas -- ;
                                }
                            }
                            this.drawCanvas();
                            let ganador = this.t1.evaluarGanador(filaColocoFicha, soltoEnColumna);
                            if(ganador.length == 0) {
                                this.cambiarTurno(); // Todavia no gano nadie
                                // this.drawCanvas();
                            }
                            else { // Hay un ganador
                                // this.drawCanvas();
                                ganador.forEach(posicion => {
                                    console.log(`Fila: ${posicion[0]}, Columna: ${posicion[1]}`);
                                });
                                // console.log("posiciones del ganador :"+ ganador);
                                console.log("Hay Ganador");
                                // Mostrar tablero con la lista de fichas ganadoras
                                // Mostrar cartel indicando el Alias ganador
                                clearInterval(this.timer.intervalo);
                                //this.drawCartelGanador();
                                this.turno = -1;
                                return ganador; // Hay un ganador
                            }
                            // CAMBIAR RESALTADO Y/O OPACADO DE LOS DISPLAY
                        }
                    }
                    else {
                        this.drawCanvas();
                    }
                }
                else{
                    this.drawCanvas();
                }
            }
          }
          else{
            console.log("Se acabo el tiempo");
            this.drawCanvas();
          }  
        });    
    

    }

    dibujarImagenDeFondo(){

        const gradiente = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradiente.addColorStop(0, '#03010c'); // Color inicial
        gradiente.addColorStop(1, '#5236cd'); // Color final 

        // Rellenar el canvas con el degradado
        this.ctx.fillStyle = gradiente;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    }
    
    drawCanvas(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpiar todo el canvas
    
        
            // Dibuja la imagen de fondo
            //  this.ctx.drawImage(this.fondo, 0, 0, this.canvas.width, this.canvas.height);

        this.timer.dibujarReloj();
        this.dibujarImagenDeFondo();//color de fondo
        this.displayJugadorDer.drawDisplayJugador();
        this.displayJugadorIzq.drawDisplayJugador();
        this.t1.drawTablero();

        this.BotonReiniciar.drawBoton(30,5,'#7CFFDC','#10D4A3');
        this.BotonMenu.drawBoton(30,5,'#7CFFDC','#10D4A3');

    }

    moverFicha (x, y) {

        this.ficha.setCoordenada(new Coordenada(x, y));
        this.drawCanvas();
        this.ficha.dibujarFicha();
        let posicionHover = this.t1.evaluarHover(x, y);
        
        if (posicionHover != -1){

            if (this.t1.hayCasilleroLibre(posicionHover)){
                this.t1.drawHover(posicionHover);
            }
        }
    }
   
    caerFicha(fila, columna) {
        
        let x = this.t1.coordenadaInicial.getX() + (this.t1.ladoCasillero * columna) + (this.t1.ladoCasillero/2);
        let yInicial = this.t1.coordenadaInicial.getY() + this.t1.ladoCasillero;
        let yFinal = yInicial + ((fila- 1) * this.t1.ladoCasillero) + (this.t1.ladoCasillero / 2)

        let i = yInicial;

        this.intervalo = setInterval(() => {
            
            if (i >= yFinal) {
                clearInterval(this.intervalo);
                return; // Salir de la función si llego a la posicion
            }

            this.ficha.setCoordenada(new Coordenada(x, i));
            this.drawCanvas();
            
            this.ficha.dibujarFicha();
            i = i + 5;
            
        }, 1); // Tiempo actualizacion
        
    }

    drawRectanguloRedondeado(x, y, width, height, radius, borderWidth, borderColor, fillColor) {
        this.ctx.fillStyle = fillColor; // Color de relleno
        this.ctx.strokeStyle = borderColor; // Color del borde
        this.ctx.lineWidth = borderWidth; // Grosor del borde
    
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    
        this.ctx.fill(); // Rellenar el interior
        this.ctx.stroke(); // Dibujar el borde
    }
    drawCartelGanador(){

        this.drawRectanguloRedondeado(500, 600, 400, 200, 20, 5, 'rgba(189,170,254,255)', 'rgba(104,67,255,255)');

        this.ctx.fillStyle = 'rgba(189,170,254,255)';
        this.ctx.font = '60px Nunito';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("Hay ganador", this.coordenada.getX() + (ancho / 2), imgY + imgHeight + 70); // Espacio bajo la imagen

    }





}