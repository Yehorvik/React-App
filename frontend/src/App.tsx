import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchTaskLists } from './store/reducers/ActionCreators';

function App() {
  const dispatch = useAppDispatch();
  const {taskList, isLoading, error} = useAppSelector(state => state.taskListReducer) || {}
  useEffect(()=>{
    dispatch(fetchTaskLists())
  }, [])
  return (
    <div className="App">
      {isLoading && <h1>loading</h1>}
      {isLoading && <h1>{error}</h1>}
      {}
      {JSON.stringify(taskList|| null, null, 2)}
     </div>
  );
}

export default App;
