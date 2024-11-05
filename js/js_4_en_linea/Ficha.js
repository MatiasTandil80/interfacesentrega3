class Ficha {

    constructor(coordenada, radius, imageUrl, jugador, context, borderColor) {
        this.coordenada = coordenada;          // Posición en el eje X
        this.radius = radius; 
        this.ctx = context;        // Contexto del canvas donde se dibujará la figura
        this.borderColor = borderColor; // Color del borde
        this.imageUrl = imageUrl; // URL de la imagen
        this.jugador = jugador;
        this.image = new Image();  // Crear una nueva instancia de Image
        this.image.src = this.imageUrl; // Cargar la imagen
        this.resaltado = false;
       
    }

        dibujarFicha() {
            this.image.onload = () => {
                this.ctx.beginPath();
                //this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
                // Primero dibujo la imagen
                this.ctx.drawImage(this.image, this.coordenada.getX() - this.radius, this.coordenada.getY() - this.radius, this.radius * 2, this.radius * 2);
                
                // Luego dibujo el borde si está resaltado
                if (this.resaltado) {
                    this.ctx.lineWidth = 5; // Grosor del borde
                    this.ctx.strokeStyle = this.borderColor; // Color del borde
                    this.ctx.stroke(); // Dibujar el borde
                }
        
                this.ctx.closePath();
            };
            // Si la imagen ya está cargada, dibujar inmediatamente
            if (this.image.complete) {
                this.image.onload();
            }
        }
        

    // Método para establecer una nueva posición para la figura
    setCoordenada(coordenada) {
        this.coordenada.setCoordenada(coordenada);  // Asignar nueva posición en el eje X e Y
        
    }

    // Método para obtener la posición actual de la figura
    getCoordenada() {
        return this.coordenada;
    }

    setResaltado(resaltado){
        this.resaltado = resaltado;
    }

    getResaltado(){
        return this.resaltado;
    }

    // Método para obtener el radio del círculo
    getRadius() {
        return this.radius; // Retornar el radio
    }

    // Método para verificar si un punto (x, y) está dentro del círculo
    isPointInside(x, y) {
        // Calcular las diferencias entre las coordenadas del círculo y el punto
        let _x = Number(this.coordenada.getX() - x);
        let _y = Number(this.coordenada.getY() - y);
        
        // Calcular si el punto está dentro del círculo usando la fórmula de la distancia
        let resultado = (Math.sqrt(_x * _x + _y * _y) < this.radius);
        
        return resultado; // Retornar true o false según si el punto está dentro del círculo
    }

}