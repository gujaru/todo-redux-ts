import {createSelector} from "@reduxjs/toolkit";

/***
 * https://react-redux.js.org/api/hooks#useselector
 */
export const getTodos = state => state.todos.entities;
export const isTodosLoading = state => state.todos.status === 'loading';
export const getIncompleteTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => !todo.isCompleted)
);
export const getCompletedTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => todo.isCompleted),
);
