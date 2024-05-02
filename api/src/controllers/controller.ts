import { Request, Response } from 'express';
import { dateclashCheck, priorityCheck } from '../model/tasks';
import { contract } from '../contract/contract';

interface TaskRequestBody {
  taskDate: string;
}

export interface Task {
  id: string;
  name: string;
  date: string;
}

interface TaskObj {
  numId: number;
  name: string;
  date: string;
}

interface TaskList {
  taskId: number;
  name: string;
  date: string;
}
export const createTask = async (req: Request, res: Response) => {
  const { taskDate }: TaskRequestBody = req.body;
  const task = await dateclashCheck(taskDate);
  try {
    if (task !== "No Task Found") {
      res.status(409).json({ status: 409, message: "Date clash:Task cannot be added" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be added" });
    }
  } catch (error) {
    console.error(error);
  }
}

export const updateTask = async (req: Request, res: Response) => {
  const { taskDate }: TaskRequestBody = req.body;
  const task = await dateclashCheck(taskDate);
  try {
    console.log(task)
    if (task !== "No Task Found") {
      res.status(409).json({ status: 409, message: "Date clash:Task cannot be updated" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be updated" });
    }
  } catch (error) {
    console.error(error);
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId }: { taskId?: number } = req.params;
    const isTrue = await priorityCheck(taskId);
    if (isTrue) {
      res.status(403).json({ status: 403, message: "Task cannot be deleted" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be deleted" });
    }
  } catch (error) {
    console.error(error);
  }
}

export const viewTask = async (req: Request, res: Response) => {
  try {
    const { taskId }: { taskId?: string } = req.params;
    console.log(taskId);
    const task: Task = await contract.methods.viewTask(taskId).call();
    const { id, name, date } = task;
    const numId: number = Number(id);
    const taskObj: TaskObj = {
      numId,
      name,
      date
    };
    res.status(200).json({ status: 200, taskObj, message: "Task Exist" });
  } catch (error) {
    res.status(404).json({ status: 500, message: "Task does not exist" });
    console.error(error);
  }
}

export const allTasks = async (req: Request, res: Response) => {
  try {
    const tasks: Task[] = await contract.methods.allTask().call();
    if (tasks.length < 0) {
      res.status(404).json({ status: 404, message: "Task list does not exist" });
    } else {
      const taskList: TaskList[] = tasks.map(({ id, name, date }) => {
        const taskId: number = Number(id);
        return { taskId, name, date };
      });
      res.status(200).json({ status: 200, taskList, message: "Task Exist" });
    }
  } catch (error) {
    console.error(error);
  }
}