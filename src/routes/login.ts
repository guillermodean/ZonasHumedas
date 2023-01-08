import { Router } from "express";
import * as bcrypt from 'bcrypt';

 class LoginRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', (req, res) => {
            res.send('login');
        });
    }
}

const loginRoutes = new LoginRoutes();
export default loginRoutes;






  
  
  
  
  