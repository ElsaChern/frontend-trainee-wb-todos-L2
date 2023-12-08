import { useState } from "react";
import style from "./TodoForm.module.css";
import Button from "../UI/Button";

const TodoForm = ({ addTodo }) => {
  const [values, setValues] = useState({
    text: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const clearValues = () => {
    setValues({
      text: "",
      description: "",
      deadline: "",
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addTodo(values);
    clearValues();
  };

  return (
    <div className={style.formWrapper}>
      <form onSubmit={onSubmitHandler}>
        <input
          name="text"
          type="text"
          className={`${style.formInput} ${style.input}`}
          placeholder="Создайте новую задачу"
          value={values.text}
          onChange={handleChange}
          maxLength={30}
        />
        <textarea
          name="description"
          type="text"
          className={`${style.formArea} ${style.input}`}
          placeholder="Добавьте описание (необязательно)"
          value={values.description}
          onChange={handleChange}
        />
        <input
          name="deadline"
          type="datetime-local"
          required
          className={`${style.deadline} ${style.input}`}
          value={values.deadline}
          onChange={handleChange}
        />
        <Button type="submit" title="Добавить" disabled={!values.text.trim()}>
          Добавить
        </Button>
      </form>
    </div>
  );
};

export default TodoForm;
