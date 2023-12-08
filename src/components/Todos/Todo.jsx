import { RiTodoFill, RiDeleteBin2Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import style from "./Todo.module.css";

const Todo = ({ todo, deleteTodo, toggleTodo, editTodo }) => {
  let dataDate = new Date(todo.deadline).toLocaleDateString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div
      className={`${style.todo} ${todo.isCompleted ? style.completedTodo : ""}`}
    >
      <RiTodoFill className={style.noteIcon} />
      <div className={style.nodeGroup}>
        <p className={style.text}>{todo.text}</p>
        <p className={style.description}>{todo.description}</p>
        <p className={style.deadline}>Срок: {dataDate}</p>
      </div>
      <div className={style.actions}>
        <FaCheck
          className={style.checkIcon}
          onClick={() => toggleTodo(todo.id)}
        />
        <MdEdit className={style.editIcon} onClick={() => editTodo(todo)} />
        <RiDeleteBin2Line
          className={style.deleteIcon}
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
    </div>
  );
};

export default Todo;
