import {Router} from 'express';
import {getUsers, getUser, createUser, deleteUser, updateUser} from '../controllers/userController';


class UsersRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/',getUsers);
        this.router.post('/',createUser);
        this.router.delete('/:id',deleteUser);
        this.router.put('/:id',updateUser);
        this.router.get('/user/:id',getUser);
    }
}

const userRoutes = new UsersRoutes();
export default userRoutes;