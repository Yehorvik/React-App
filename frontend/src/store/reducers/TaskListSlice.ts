import { createSlice } from "@reduxjs/toolkit";
import { ITaskList } from "../../model/ITaskList";
import { PayloadAction } from "@reduxjs/toolkit";

interface TaskListState{
    taskList: ITaskList[];
    isLoading: boolean;
    error: string;
}

const initialState : TaskListState = {
    taskList: [],
    isLoading: false,
    error: ""
}

export const taskListSlice = createSlice(
    {
        name: "taskList",
        initialState,
        reducers:{
            taskListFetching(state){
                state.isLoading = true;
            },
            taskListFetchingSuccess(state, action: PayloadAction<ITaskList[]>){
                state.isLoading = false;
                state.error = ''
                state.taskList = action.payload
            },
            taskListFetchingError(state, action : PayloadAction<string>){
                state.isLoading = false;
                state.error = action.payload
            }
        }
    }
)