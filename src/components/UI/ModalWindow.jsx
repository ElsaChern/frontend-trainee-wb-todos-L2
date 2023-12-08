import { useState } from "react";
import Button from "./Button";
import style from "./ModalWindow.module.css";

const ModalWindow = ({ active, setActive, todo }) => {
  // const [newTodo, setNewTodo] = useState(todo);

  // console.log(todo);
  // console.log(newTodo.text);

  const handleChange = () => {};

  if (active)
    return (
      <div className={style.modal}>
        <div className={style.modalContent}>
          <p>Редактировать задачу</p>
          <div className={style.editInputs}>
            <input
              name="text"
              type="text"
              className={style.edit}
              // value={newTodo.text}
              onChange={handleChange}
            />
            <textarea
              name="description"
              type="text"
              className={style.editArea}
              // value={description}
              onChange={handleChange}
            />
            <input
              name="date"
              type="datetime-local"
              required
              className={style.edit}
              // value={deadline}
              onChange={handleChange}
            />
            <Button onClick={() => setActive(false)}>Сохранить</Button>
          </div>
        </div>
      </div>
    );
};

export default ModalWindow;
