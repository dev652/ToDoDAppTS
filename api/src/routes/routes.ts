import express, { Router } from 'express';
import {
    createTask,
    updateTask,
    deleteTask,
    viewTask,
    allTasks
} from '../controllers/controller';

const router: Router = express.Router();

router.route('/create-task').post(createTask);
router.route('/update-task').post(updateTask);
router.route('/delete-task/:taskId').delete(deleteTask);
router.route('/view-task/:taskId').get(viewTask);
router.route('/view-all-task').get(allTasks);

export default router;