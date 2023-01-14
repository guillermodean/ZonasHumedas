import { Router } from "express";
import * as bcrypt from 'bcrypt';
import { login } from "../controllers/loginController";

 class LoginRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/', login);
}
 }

const loginRoutes = new LoginRoutes();
export default loginRoutes;






  
  
  
  
  