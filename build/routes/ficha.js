"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fichaController_1 = require("../controllers/fichaController");
const fichaController_2 = require("../controllers/fichaController");
class FichaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', fichaController_1.getItems);
        // this.router.get('/:id', fichaController.getFicha);
        this.router.post('/', fichaController_2.postItem);
        // this.router.put('/:id', fichaController.update);
        // this.router.delete('/:id', fichaController.delete);
    }
}
const fichaRoutes = new FichaRoutes();
exports.default = fichaRoutes;
