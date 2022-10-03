"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fichaController_1 = require("../controllers/fichaController");
class FichaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', fichaController_1.fichaController.list);
        this.router.get('/:id', fichaController_1.fichaController.getOne);
        this.router.post('/', fichaController_1.fichaController.create);
        this.router.put('/:id', fichaController_1.fichaController.update);
        this.router.delete('/:id', fichaController_1.fichaController.delete);
    }
}
module.exports = new FichaRoutes().router;
