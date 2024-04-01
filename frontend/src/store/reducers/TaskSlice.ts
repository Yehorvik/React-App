import { ITask } from "../../model/ITask";

interface TasksState{
    user: ITask[];
    isLoading: boolean;
}