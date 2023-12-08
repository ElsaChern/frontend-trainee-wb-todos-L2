import Button from "../UI/Button";
import Todo from "./Todo";
import style from "./TodoList.module.css";
import { FaSortAmountDownAlt, FaSortAmountDown } from "react-icons/fa";

const TodoList = ({
  todos,
  deleteTodo,
  toggleTodo,
  editTodo,
  sortByCreatedAt,
  sortByDeadline,
}) => {
  return (
    <div className={style.todoList}>
      {todos.length ? (
        <div className={style.sortBtns}>
          <p>По дате создания</p>
          <Button onClick={() => sortByCreatedAt(-1)}>
            <FaSortAmountDownAlt />
          </Button>
          <Button onClick={() => sortByCreatedAt(1)}>
            <FaSortAmountDown />
          </Button>
          <p>По сроку выполнения</p>
          <Button onClick={() => sortByDeadline(1)}>
            <FaSortAmountDownAlt />
          </Button>
          <Button onClick={() => sortByDeadline(-1)}>
            <FaSortAmountDown />
          </Button>
        </div>
      ) : (
        <div className={style.todoListEmpty} />
      )}
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
