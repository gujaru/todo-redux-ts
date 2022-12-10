import styled from 'styled-components';
import {store} from "./store";
import { Provider } from "react-redux";
import TodoList from "./features/todos/TodoList";

const AppContainer = styled.div`
  margin: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  color: #222222;
  width: 100vw;
  height: 100vh;
`;

function App() {
    return (
        <Provider store={store}>
            <AppContainer>
                <TodoList/>
            </AppContainer>
        </Provider>
    )
}

export default App;
