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
exports.priorityCheck = exports.dateclashCheck = void 0;
const contract_1 = require("../contract/contract");
const dateclashCheck = (taskDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield contract_1.contract.methods.allTask().call();
        const foundTask = tasks.find((task) => task.date === taskDate);
        if (foundTask) {
            return foundTask.name;
        }
        return "No Task Found";
    }
    catch (error) {
        console.error("Error in dateclashCheck:", error);
        throw error;
    }
});
exports.dateclashCheck = dateclashCheck;
const priorityCheck = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield contract_1.contract.methods.allTask().call();
        const result = tasks[id - 1].name.includes("priority");
        return result;
    }
    catch (error) {
        console.error("Error in priorityCheck:", error);
        throw error;
    }
});
exports.priorityCheck = priorityCheck;
//# sourceMappingURL=tasks.js.map