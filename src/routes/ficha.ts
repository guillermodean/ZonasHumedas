import { Router } from "express";
import { getItems } from "../controllers/fichaController";
import { postItem } from "../controllers/fichaController";

class FichaRoutes {
    
        public router: Router = Router();
    
        constructor() {
            this.config();
        }
    
        config(): void {
            this.router.get('/', getItems);
            // this.router.get('/:id', fichaController.getFicha);
            this.router.post('/', postItem);
            // this.router.put('/:id', fichaController.update);
            // this.router.delete('/:id', fichaController.delete);
        }
    }
    const fichaRoutes = new FichaRoutes();
export default fichaRoutes;