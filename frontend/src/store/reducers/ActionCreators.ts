import axios from "axios";
import { AppDispatch } from "../store";
import { ITaskList } from "../../model/ITaskList";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchTaskLists = () => async (distpatch: AppDispatch) =>{ 
//     try {
//         distpatch(taskListSlice.actions.taskListFetching());
//         const response = await axios.get<ITaskList[]>("/list")
//         distpatch(taskListSlice.actions.taskListFetchingSuccess(response.data));
//     } catch (error: any) {
//         distpatch(taskListSlice.actions.taskListFetchingError(error))
//     }
// }

export const fetchTaskLists = createAsyncThunk(
    "user/fetchAll",
    async(_, thunkApi) =>{
        const response = await axios.get<ITaskList[]>("/tasks")
        //distpatch(taskListSlice.actions.taskListFetchingSuccess(response.data));
        return response.data;
    }
)