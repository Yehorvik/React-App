import axios from "axios";
import { AppDispatch } from "../store";
import { ITaskList } from "../../model/ITaskList";
import { taskListSlice } from "./TaskListSlice";

export const fetchTaskLists = () => async (distpatch: AppDispatch) =>{ 
    try {
        distpatch(taskListSlice.actions.taskListFetching());
        const response = await axios.get<ITaskList[]>("/list")
        distpatch(taskListSlice.actions.taskListFetchingSuccess(response.data));
    } catch (error: any) {
        distpatch(taskListSlice.actions.taskListFetchingError(error))
    }
}