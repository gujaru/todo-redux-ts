import styled from "styled-components";
import NewTodoForm from "./NewTodoForm";
import {useEffect} from "react";
import TodoListItem from "./TodoListItem";
import {fetchTodos, removeTodo, toggleTodo} from "./redux/todoThunk";
import {useDispatch, useSelector} from "react-redux";
import {getCompletedTodos, getIncompleteTodos, isTodosLoading} from "./redux/todoSelector";

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTodos());
    }, []);

    const incompleteTodos = useSelector(getIncompleteTodos);
    const completedTodos = useSelector(getCompletedTodos);
    const isLoading = useSelector(isTodosLoading);

    const loadingMessage = <div>Loading todos...</div>;
    const onClickRemove = () => async (id: number) => {
        // @ts-ignore
        await dispatch(removeTodo(id))
    }
    const onClickToggleComplete = () => async (id: number) => {
        // @ts-ignore
        await dispatch(toggleTodo(id))
    };

    const content = (
        <ListWrapper>
            <NewTodoForm/>
            <h3>Incomplete:</h3>
            {incompleteTodos && incompleteTodos.map(todo => <TodoListItem
                todo={todo}
                onClickRemove={onClickRemove()}
                onClickToggle={onClickToggleComplete()}/>)}
            <h3>Completed:</h3>
            {completedTodos && completedTodos.map(todo => <TodoListItem
                todo={todo}
                onClickRemove={onClickRemove()}
                onClickToggle={onClickToggleComplete()}/>)}
        </ListWrapper>
    );
    return isLoading ? loadingMessage : content;
};

export default TodoList;