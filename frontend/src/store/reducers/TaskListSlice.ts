import { createSlice } from "@reduxjs/toolkit";
import { ITaskList } from "../../model/ITaskList";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchTaskLists } from "./ActionCreators";

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

const taskListSlice = createSlice(
    {
        name: "taskList",
        initialState,
        reducers:{
        },
        extraReducers:( builder) => {
            builder.addCase(fetchTaskLists.fulfilled, (state,action: PayloadAction<ITaskList[]>) => {
                state.isLoading = false;
                state.taskList = action.payload;
                state.error = '';
            });
            builder.addCase(fetchTaskLists.pending, (state) => {
                state.isLoading = true;
            })
            builder.addCase(fetchTaskLists.rejected, (state, action) => {
                state.isLoading = false;
                state.taskList = [];
                state.error = action.error.message || "";
              });
        }
    }
)

export default taskListSlice.reducer