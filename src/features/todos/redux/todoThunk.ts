import {Todo, todoCreate, todoRemove, todosLoaded, todosLoading, todoToggle} from "./todoSlice";
import * as fetch from '../../../api/fetch'
import {Dispatch} from "react";

// https://vitejs.dev/guide/env-and-mode.html
const TODO_API_BASE_URL = import.meta.env.VITE_TODO_API_BASE_URL;
export function saveNewTodo(text: string) {
    return async function saveNewTodoThunk(dispatch: Dispatch<any>, getState) {
        let newTodo:any = {
            text: text 
        };

        // @ts-ignore
        dispatch(todosLoading())
        const newlyCreatedTodo = await fetch.post<Todo, Todo>(TODO_API_BASE_URL + '/todos', newTodo);
        console.log(JSON.stringify(newlyCreatedTodo));
        dispatch(todoCreate(newlyCreatedTodo));
    }
}
export const fetchTodos = () => async (dispatch) => {
    // @ts-ignore
    dispatch(todosLoading())
    const todoList = await fetch.get<Todo[]>(TODO_API_BASE_URL+'/todos')
    dispatch(todosLoaded(todoList))
}
export const removeTodo = (id:number) => async (dispatch) => {
    // @ts-ignore
    dispatch(todosLoading())
    try {
        await fetch.remove<Todo>(TODO_API_BASE_URL + '/todos/' + id);
    }catch{
    }
    dispatch(todoRemove(id));
}

export const toggleTodo = (id:number) => async (dispatch) => {
    // @ts-ignore
    dispatch(todosLoading())
    try {
        // @ts-ignore
        await fetch.put<Todo>(TODO_API_BASE_URL + '/todos/' + id + '/toggle');
    }catch{
    }
    dispatch(todoToggle(id));
}