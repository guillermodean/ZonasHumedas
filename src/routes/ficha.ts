import { Router } from "express";
import { fichaController } from "../controllers/fichaController";

class FichaRoutes {
    
        public router: Router = Router();
    
        constructor() {
            this.config();
        }
    
        config(): void {
            this.router.get('/', fichaController.getFichas);
            this.router.get('/:id', fichaController.getFicha);
            this.router.post('/', fichaController.create);
            this.router.put('/:id', fichaController.update);
            this.router.delete('/:id', fichaController.delete);
        }
    }
    module.exports = new FichaRoutes().router;