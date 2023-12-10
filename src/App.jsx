import { useEffect, useState } from "react";
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

  // Сохранение в localStorage при изменении списка задач
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Функция по добавлению новой задачи
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
    checkDeadline(newTodo);
  };

  // Функция удаления выбранной задачи
  const deleteTodosHandler = (id) => {
    let remainingTodos = todos.filter((todo) => todo.id !== id);
    setTodos(remainingTodos);
  };

  // Функция позволяющая отмечать/убирать отметку о выполнении задачи
  const toggleCheckedHandler = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : { ...todo },
    );
    setTodos(newTodos);
  };

  // Функция реагирующая на кнопку "изменить" текстовое поле задачи
  const editTodoHandler = (todo) => {
    setTodo(todo);
    setModalActive(true);
    checkDeadline(todo);
  };

  // Функция обновления измененной задачи
  const updatedTodos = (todo) => {
    let indexTodo = todos.findIndex((curTodo) => curTodo.id === todo?.id);
    let isEqual = JSON.stringify(todos[indexTodo]) === JSON.stringify(todo);

    if (!isEqual) {
      let startTodos = todos.slice(0, indexTodo);
      let endTodos = todos.slice(indexTodo + 1);
      let newTodos = [...startTodos, todo, ...endTodos];
      setTodos(newTodos);
    }
  };

  // Сортировка по дате создания задач
  const sortByCreatedAtHandler = (coef) => {
    setTodos(
      [...todos].sort((a, b) =>
        a.createdAt < b.createdAt ? 1 * coef : -1 * coef,
      ),
    );
  };

  // Сортировка по сроку выполнения  задач
  const sortByDeadlineHandler = (coef) => {
    setTodos(
      [...todos].sort((a, b) =>
        a.deadline > b.deadline ? 1 * coef : -1 * coef,
      ),
    );
  };

  // Функция, проверяющая подходит ли срок задачи к концу
  const checkDeadline = (todo = null) => {
    const hour = 60 * 60 * 1000;
    const handleDeadline = (todo) => {
      let timeToDeadline = new Date(todo.deadline).getTime() - Date.now();

      if (timeToDeadline < hour && timeToDeadline > 0) {
        showPushNotification(todo);
      }
    };

    if (!todos) {
      return;
    }

    if (todo) {
      handleDeadline(todo);
    } else {
      todos.forEach((item) => {
        handleDeadline(item);
      });
    }

    // Планируем проверку на дедлайн через час
    setTimeout(() => {
      checkDeadline();
    }, hour);
  };

  // Функция, отображающая уведобления в браузере
  const showPushNotification = async (todo) => {
    const registration = await navigator.serviceWorker.getRegistration();
    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        alert("Разрешите отправку уведомлений");
      } else {
        registration.showNotification("Дедлайн близко!", {
          body: `Срок задачи "${todo.text}" подходит к концу`,
        });
      }
    });
  };

  checkDeadline();

  return (
    <>
      {modalActive && (
        <ModalWindow
          active={modalActive}
          setActive={setModalActive}
          todo={todo}
          edit={updatedTodos}
        />
      )}
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
