import { Router } from "express";
import { getItems } from "../controllers/fichaController";
import { postItem } from "../controllers/fichaController";
import { deleteItem } from "../controllers/fichaController";
import { updateItem } from "../controllers/fichaController";

class FichaRoutes {
    
        public router: Router = Router();
    
        constructor() {
            this.config();
        }
    
        config(): void {
            this.router.get('/', getItems);
            // this.router.get('/:id', fichaController.getFicha);
            this.router.post('/', postItem);
            this.router.put('/:id', updateItem);
            this.router.delete('/:id', deleteItem);
        }
    }
    const fichaRoutes = new FichaRoutes();
export default fichaRoutes;