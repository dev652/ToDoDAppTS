"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const router = express_1.default.Router();
router.route('/create-task').post(controller_1.createTask);
router.route('/update-task').post(controller_1.updateTask);
router.route('/delete-task/:taskId').delete(controller_1.deleteTask);
router.route('/view-task/:taskId').get(controller_1.viewTask);
router.route('/view-all-task').get(controller_1.allTasks);
exports.default = router;
//# sourceMappingURL=routes.js.map