import styled from "styled-components";
import {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {saveNewTodo} from "./redux/todoThunk";
import {getTodos} from "./redux/todoSelector";

const FormContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px grey;
`;

const NewTodoInput = styled.input`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-bottom: 2px solid #ddd;
  border-radius: 8px;
  width: 70%;
  outline: none;
`;

const NewTodoButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  margin-left: 8px;
  width: 20%;
  background-color: #22ee22;
`;
const NewTodoForm = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const todos = useSelector(getTodos);

    return (
        <FormContainer>
            <NewTodoInput
                type="text"
                placeholder="Type your new todo here"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}/>
            <NewTodoButton
                onClick={async (e) => {
                    const isDuplicateText = todos.some(todo => todo.text.toLowerCase() === inputValue.toLowerCase());
                    if (!isDuplicateText) {
                        await dispatch(saveNewTodo(inputValue));
                        setInputValue('');
                    } else {
                        // put a modal alert
                        console.log("duplicate found");
                    }
                }}>
                Create Todo
            </NewTodoButton>
        </FormContainer>);
};

export default NewTodoForm;