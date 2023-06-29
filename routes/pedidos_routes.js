const express = require("express");
const ResponseResult = require("../models/response_class");
const router = express.Router();
const PedidosController = require("../controllers/pedidos_ctrl");

router.get("/pedidos", async function (req, res) {
    var response = new ResponseResult();

    try {
        response = await PedidosController.getPedidos();
    } catch (e) {
        response.ok = false;
        response.msg = "Excepcion: " + e;
    }

    return res.status(200).send(response);
});

router.post("/registrarPedido", async function (req, res) {
    var response = new ResponseResult();

    try {
        response = await PedidosController.registrarPedido(req.body);
    } catch (e) {
        response.ok = false;
        response.msg = "Excepcion: " + e;
    }

    return res.status(200).send(response);
});

module.exports = router;