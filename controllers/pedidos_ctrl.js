const ResponseResult = require("../models/response_class");
const Item = require("../models/item_class");
const Pedido = require("../models/pedido_class");

const estados = require("./pedest_ctrl");
const { db } = require("../dbs/firestorehelper");

class PedidosController{
    static getDateTime() {
        var d = new Date();
        var theMonth = d.getMonth() + 1;
        var theDay = d.getDate();

        var theDate = d.getFullYear() + "-" + theMonth.toString() + "-" + theDay.toString();

        var t = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        var result = theDate + " " + t;
        return result;
    }

    static async registrarPedido(data){
        var result = new ResponseResult();

        var pedido = new Pedido();
        pedido.setMovilData(data["pedido"]);
        pedido.pedFecha = this.getDateTime();
        pedido.pedEstado = 1; //1 ES NUEVO - PENDIENTE

        var res = await db.collection("pedidos").add(pedido.tofirestore());
        pedido.pedId = res.id;
        var itemsPedido = [];
        for(let i = 0; i < data["detalle"].length; i++){
            var unItem = new Item();
            unItem.itmPed = pedido.pedId;
            unItem.itmPro = data["detalle"][i]["carPro"];
            unItem.itmCant = data["detalle"][i]["carCant"];
            itemsPedido.push(unItem);
        }

        for(let i = 0; i<itemsPedido.length; i++){
            await db.collection("items").add(itemsPedido[i].toFirestore());
        }

        result.ok = true;
        result.msg = "Pedido enviado a tienda BAMBAM";

        return result;
    }

    static async getPedidos(){
        var result = new ResponseResult();

        var pedidosSnap = await db.collection("pedidos").get();
        var pedidos = [];
        for (let i = 0; i < pedidosSnap.docs.length; i++) {
            var ped = new Pedido();
            ped.fromFirestore(pedidosSnap.docs[i].data())
            ped.pedId = pedidosSnap.docs[i].id;

            for (let idos = 0; idos < estados.length; idos++) {
                if (ped.pedEstado == estados[idos].estId) {
                    ped.pedEstadoNombre = estados[idos].estNombre;
                }
            }

            pedidos.push(ped);
        }

        result.ok = true;
        result.msg = "Pedidos obtenidos";
        result.data = pedidos;

        return result;
    }
}

module.exports = PedidosController;