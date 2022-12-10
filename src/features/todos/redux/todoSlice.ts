import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface Todo {
    id: number;
    text: string;
    isCompleted: boolean;
    createdAt: Date;
}

export interface TodosState {
    status: string;
    entities: Todo[]
}

const initialState: TodosState = {
    status: "loading",
    entities: [],
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todosLoading(state, action) {
            state.status = 'loading'
        },
        todosLoaded(state: TodosState, action: PayloadAction<Todo[]>) {
            if (action.payload) {
                const newEntities: Todo[] = [];
                action.payload.forEach((todo) => {
                    newEntities.push(todo);
                })
                state.entities = newEntities
            }
            state.status = 'idle'
        },
        todoCreate: (state: TodosState, action: PayloadAction<Todo>) => {
            const item = action.payload;
            state.entities.push(item);
            state.status = 'idle'
        },
        todoRemove: (state: TodosState, action: PayloadAction<number>) => {
            const filtered = state.entities.filter((todo) => todo.id !== action.payload);
            state.entities = filtered;
            state.status = 'idle'
        },
        todoToggle: (state: TodosState, action: PayloadAction<number>) => {
            const todo = state.entities.find(x => x.id === action.payload);
            if (todo) todo.isCompleted = !todo.isCompleted;
            state.status = 'idle'
        }
    },
});

export const {todoCreate, todoRemove, todoToggle, todosLoading, todosLoaded} = todosSlice.actions;

export default todosSlice.reducer;