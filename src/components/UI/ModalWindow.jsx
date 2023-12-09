import { useState } from "react";
import Button from "./Button";
import style from "./ModalWindow.module.css";

const ModalWindow = ({ active, setActive, todo, edit }) => {
  const [text, setText] = useState(todo.text);
  const [description, setDescription] = useState(todo.description);
  const [deadline, setDeadline] = useState(todo.deadline);

  const handleEditClick = () => {
    const editedTodo = {
      ...todo,
      text,
      deadline,
      description,
    };
    setActive(false);
    edit(editedTodo);
  };

  const handleTextChange = (value) => {
    setText(value);
  };
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };
  const handleDeadlineChange = (value) => {
    setDeadline(value);
  };

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
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
            />
            <textarea
              name="description"
              type="text"
              className={style.editArea}
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
            <input
              name="deadline"
              type="datetime-local"
              required
              className={style.edit}
              value={deadline}
              onChange={(e) => handleDeadlineChange(e.target.value)}
            />
            <Button onClick={handleEditClick}>Сохранить</Button>
          </div>
        </div>
      </div>
    );
};

export default ModalWindow;
