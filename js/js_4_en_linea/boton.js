class Boton {

    constructor(nombre, inicioX, finX, inicioY, finY,ctx,canvas){

        this.nombre = nombre;        
        this.inicioX = inicioX;
        this.inicioY = inicioY;

        this.finX = finX;
        this.finY = finY;

        this.canvas = canvas;
        this.ctx = ctx;
    }



    drawBoton(radius, borderWidth, borderColor, fillColor) {

        let x = this.inicioX;
        let y = this.inicioY;
        let width = this.finX - this.inicioX;
        let height = this.finY - this.inicioY;

        

        //RECTANGULO BOTON
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
        this.ctx.stroke(); // Dibujar el borde

        //TEXTO BOTON
        this.ctx.fillStyle = '#665BAA'; // Color del texto    
        this.ctx.font = 'bold 40px Nunito, sans-serif'; // O usando "bold" para negrita
        const startWidth = this.ctx.measureText(this.nombre).width; // Obtener el ancho del texto
        // Dibujar el texto del título
        const startX = (this.canvas.width - startWidth) / 2; // Posición X para centrar
        //this.ctx.fillText(this.nombre, 1460, 105); // Dibujar el título centrado
        this.ctx.fillText(this.nombre, x + (width/2), y + (height*0.65));

    }

    evaluarCLickEnbotones(x,y){
        console.log("CLICK X: "+x);
        console.log("CLICK Y: "+y);
        console.log("INICIO BOTON X: "+this.inicioX);
        console.log("INICIO BOTON Y: "+this.inicioY);
        console.log("FIN BOTON X: "+this.finX);
        console.log("FIN BOTON Y: "+this.finY);
        return ((x >= this.inicioX && x <= this.finX ) && (y  >= this.inicioY)
                            && (y <= this.finY));            
    }


}