import React from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import styles from './TodoItem.module.css';


export default function TodoItem({
  todo,
  month,
  deleteTodoItem,
  handleTodo,
  handleEditTrue,
}) {

  return (
    <div className={styles.todoBox}>
      <div
        className={styles.titleBox}
        onClick={() => {
          handleTodo(todo);
        }}
      >
        <div
          className={styles.color}
        ></div>
        <p className={styles.title}>{todo.title}</p>
      </div>
      <div>
        <BsFillPencilFill
          className={styles.edit}
          onClick={() => {
            handleTodo(todo);
            handleEditTrue();
          }}
        />
        <BsFillTrashFill
          className={styles.delete}
          onClick={() => {
            deleteTodoItem(month, todo.id);
          }}
        />
      </div>
    </div>
  );
}
