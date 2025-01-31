import express from 'express';

import {
    test,
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
} from '../controllers/userController.js';


const router = express.Router();


router.get('/apiTest', test);
router.post('/create', createUser);
router.get('/:id', getUserById);
router.get('/', getUsers);
router.patch('/update/:id', updateUser); 
router.delete('/delete/:id', deleteUser);


export default router;

