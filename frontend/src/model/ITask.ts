import { Priority } from "./Priority";

export interface ITask{
    id: number;
    name: string;
    dueDate: Date;
    description: string;
    priority: Priority
}