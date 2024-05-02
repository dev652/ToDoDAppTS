import { contract } from '../contract/contract';
import { Task } from '../controllers/controller';



const dateclashCheck = async (taskDate: string): Promise<string> => {
    try {
        const tasks : Task[]= await contract.methods.allTask().call();
        const foundTask = tasks.find((task: { date: string }) => task.date === taskDate);

        if (foundTask) {
            return foundTask.name;
        }

        return "No Task Found";
    } catch (error) {
        console.error("Error in dateclashCheck:", error);
        throw error;
    }
};

const priorityCheck = async (id: number): Promise<boolean> => {
    try {
        const tasks : Task[]= await contract.methods.allTask().call();
        const result = tasks[id - 1].name.includes("priority");
        return result;
    } catch (error) {
        console.error("Error in priorityCheck:", error);
        throw error;
    }
};

export { dateclashCheck, priorityCheck };
