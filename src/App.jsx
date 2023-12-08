import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import TodoList from "./components/Todos/TodoList";
import ModalWindow from "./components/UI/ModalWindow";
import Header from "./components/Header/Header";
import TodoForm from "./components/Form/TodoForm";

const App = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || [],
  );
  const [todo, setTodo] = useState({});
  const [modalActive, setModalActive] = useState(false);

  const addTodosHandler = ({ text, description, deadline }) => {
    const newTodo = {
      text,
      description,
      deadline,
      createdAt: new Date(),
      isCompleted: false,
      id: uuidv4(),
    };
    let savedTodos = todos;
    savedTodos = [...todos, newTodo];
    setTodos(savedTodos);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
  };

  const deleteTodosHandler = (id) => {
    let remainingTodos = todos.filter((todo) => todo.id !== id);
    setTodos(remainingTodos);
    localStorage.setItem("todos", JSON.stringify(remainingTodos));
  };

  const toggleCheckedHandler = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : { ...todo },
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const editTodoHandler = (todo) => {
    setModalActive(true);
    setTodo(todo);
  };

  const sortByCreatedAtHandler = (coef) => {
    setTodos(
      [...todos].sort((a, b) =>
        a.createdAt < b.createdAt ? 1 * coef : -1 * coef,
      ),
    );
  };

  const sortByDeadlineHandler = (coef) => {
    setTodos(
      [...todos].sort((a, b) =>
        a.deadline > b.deadline ? 1 * coef : -1 * coef,
      ),
    );
  };

  return (
    <>
      <ModalWindow
        active={modalActive}
        setActive={setModalActive}
        todo={todo}
      />
      <Header />
      <div className="main">
        <TodoForm addTodo={addTodosHandler} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodosHandler}
          toggleTodo={toggleCheckedHandler}
          editTodo={editTodoHandler}
          sortByCreatedAt={sortByCreatedAtHandler}
          sortByDeadline={sortByDeadlineHandler}
        />
      </div>
    </>
  );
};

export default App;
