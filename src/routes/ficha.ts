import { Router } from "express";
import { getItems } from "../controllers/fichaController";
import { postItem } from "../controllers/fichaController";
import { deleteItem } from "../controllers/fichaController";
import { updateItem } from "../controllers/fichaController";
import {postallItems} from "../controllers/fichaController";
import {getItem} from "../controllers/fichaController";

class FichaRoutes {
    
        public router: Router = Router();
    
        constructor() {
            this.config();
        }
    
        config(): void {
            this.router.get('/', getItems);
            this.router.post('/', postItem);
            this.router.put('/:id', updateItem);
            this.router.delete('/:id', deleteItem);
            this.router.put('/cargar', postallItems);
            this.router.get('/:id', getItem);
        }
    }
    const fichaRoutes = new FichaRoutes();
export default fichaRoutes;