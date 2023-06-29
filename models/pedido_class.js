class Pedido {
    constructor() {
        this.pedId = "";
        this.pedUsu = "";
        this.pedFecha = "";
        this.pedLat = "";
        this.pedLng = "";
        this.pedEstado = 0;

        this.pedEstadoNombre = "";
    }

    tofirestore() {
        var obj = {
            pedUsu: this.pedUsu,
            pedFecha: this.pedFecha,
            pedLat: this.pedLat,
            pedLng: this.pedLng,
            pedEstado: this.pedEstado,
        };
        return obj;
    }

    setMovilData(data) {
        this.pedUsu = data["pedUsu"];
        this.pedLat = data["pedLat"];
        this.pedLng = data["pedLng"];
    }

    fromFirestore(data) {
        this.pedUsu = data["pedUsu"];
        this.pedLat = data["pedLat"];
        this.pedLng = data["pedLng"];
        this.pedFecha = data["pedFecha"];
        this.pedEstado = data["pedEstado"];
    }
}

module.exports = Pedido;