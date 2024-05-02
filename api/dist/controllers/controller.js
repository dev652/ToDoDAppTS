"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTasks = exports.viewTask = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
const tasks_1 = require("../model/tasks");
const contract_1 = require("../contract/contract");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskDate } = req.body;
    const task = yield (0, tasks_1.dateclashCheck)(taskDate);
    try {
        if (task !== "No Task Found") {
            res.status(409).json({ status: 409, message: "Date clash:Task cannot be added" });
        }
        else {
            res.status(200).json({ status: 200, message: "Task can be added" });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskDate } = req.body;
    const task = yield (0, tasks_1.dateclashCheck)(taskDate);
    try {
        console.log(task);
        if (task !== "No Task Found") {
            res.status(409).json({ status: 409, message: "Date clash:Task cannot be updated" });
        }
        else {
            res.status(200).json({ status: 200, message: "Task can be updated" });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const isTrue = yield (0, tasks_1.priorityCheck)(taskId);
        if (isTrue) {
            res.status(403).json({ status: 403, message: "Task cannot be deleted" });
        }
        else {
            res.status(200).json({ status: 200, message: "Task can be deleted" });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteTask = deleteTask;
const viewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        console.log(taskId);
        const task = yield contract_1.contract.methods.viewTask(taskId).call();
        const { id, name, date } = task;
        const numId = Number(id);
        const taskObj = {
            numId,
            name,
            date
        };
        res.status(200).json({ status: 200, taskObj, message: "Task Exist" });
    }
    catch (error) {
        res.status(404).json({ status: 500, message: "Task does not exist" });
        console.error(error);
    }
});
exports.viewTask = viewTask;
const allTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield contract_1.contract.methods.allTask().call();
        if (tasks.length < 0) {
            res.status(404).json({ status: 404, message: "Task list does not exist" });
        }
        else {
            const taskList = tasks.map(({ id, name, date }) => {
                const taskId = Number(id);
                return { taskId, name, date };
            });
            res.status(200).json({ status: 200, taskList, message: "Task Exist" });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.allTasks = allTasks;
//# sourceMappingURL=controller.js.map