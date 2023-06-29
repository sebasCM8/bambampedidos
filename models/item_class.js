class Item {
    constructor() {
        this.itmId = "";
        this.itmPed = "";
        this.itmPro = 0;
        this.itmCant = 0;
    }

    toFirestore() {
        var obj = {
            itmPed: this.itmPed,
            itmPro: this.itmPro,
            itmCant: this.itmCant
        }
        return obj;
    }
}

module.exports = Item;