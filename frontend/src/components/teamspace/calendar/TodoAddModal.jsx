import React, { useState } from 'react';
import moment from 'moment';
import styles from './TodoAddModal.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

export default function TodoAddModal({
  date,
  open,
  closeModal,
  schedule,
  addSchedule,
}) {

  const [color, setColor] = useState('pink');
  const [title, setTitle] = useState('');
  const [description, setDescrpition] = useState('');
  const [time, setTime] = useState('09:00');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === '') {
      return;
    }

    const month = date.getMonth() + '월';
    const newTodo = {
      id: `${uuidv4()}`,
      date: `${moment(date).format('YYYY년 MM월 DD일')}`,
      color: `${color}`,
      title: `${title}`,
      description: `${description}`,
      time: `${time}`,
    };

    if (Object.keys(schedule).includes(`${date.getMonth()}월`)) {
      const monthSchedule = schedule[month].concat(newTodo);
      addSchedule((prev) => ({
        ...prev,
        [month]: monthSchedule,
      }));
    } else {
      addSchedule((prev) => ({
        ...prev,
        [month]: [newTodo],
      }));
    }

    setColor('pink');
    setTitle('');
    setDescrpition('');
    setTime('09:00');
    closeModal();
  };

  return (
    <div
      className={open ? `${styles.modal} ${styles.openModal}` : styles.modal}
    >
      <form
        onSubmit={handleSubmit}
      >
        <div className={styles.infoBox}>
          <h2 className={styles.info}>일정 등록하기</h2>
          <AiOutlineClose className={styles.closeBtn} onClick={closeModal} />
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.title}
          placeholder="title"
        />
        <textarea
          className={styles.description}
          rows="5"
          cols="33"
          placeholder="description"
          value={description}
          onChange={(e) => setDescrpition(e.target.value)}
        />
        <input
          type="time"
          className={styles.time}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit" className={styles.addBtn}>
          OK
        </button>
      </form>
    </div>
  );
}
