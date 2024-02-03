import React from 'react';
import styles from './TodoDetail.module.css';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

export default function TodoDetail({
  todo,
  month,
  closeDetail,
  deleteTodoItem,
  handleEditTrue,
}) {

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {todo.title}
        </h2>
        <p className={styles.time}>{todo.time}</p>
      </div>
      <p className={styles.description}>{todo.description}</p>
      <div className={styles.btnBox}>
        <AiOutlineClose className={styles.close} onClick={closeDetail} />
        <div className={styles.itemBtnBox}>
          <BsFillPencilFill
            className={styles.edit}
            onClick={() => {
              handleEditTrue();
            }}
          />
          <BsFillTrashFill
            className={styles.delete}
            onClick={() => {
              deleteTodoItem(month, todo.id);
              closeDetail();
            }}
          />
        </div>
      </div>
    </div>
  );
}
