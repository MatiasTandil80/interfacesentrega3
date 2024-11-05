class Timer{

    constructor(tiempoRestante, ctx) {

        this.tiempoRestante = tiempoRestante;
        this.ctx = ctx;
        
        this.intervalo = setInterval(() => {
            // Comprobar si tiempoRestante es negativo
            if (this.tiempoRestante < 0) {
                clearInterval(this.intervalo);
                this.dibujarReloj(0, 0); // Mostrar 00:00 cuando termine
                return; // Salir de la función si el tiempo ha terminado
            }

            // Calcular minutos y segundos
            this.minutos = Math.floor(this.tiempoRestante / 60);
            this.segundos = this.tiempoRestante % 60;

            // Dibujar el tiempo en el canvas
            this.dibujarReloj();

            // Reducir el tiempo restante
            this.tiempoRestante--;
        }, 1000); // Actualiza cada segundo
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

    dibujarReloj() {
        
        this.drawRectanguloRedondeado(50, 50, 200, 100, 30, 10, 'rgba(189,170,254,255)', 'rgba(104,67,255,255)');

        this.ctx.fillStyle = 'rgba(189,170,254,255)'; // Color del texto
        this.ctx.font = 'bold 50px Nunito, sans-serif'; // Estilo de la fuente

        this.ctx.fillText(`${String(this.minutos).padStart(2, '0')}:${String(this.segundos).padStart(2, '0')}`, 151, 117); // Dibujar el tiempo
    }
}