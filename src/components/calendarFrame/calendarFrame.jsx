import React, { useState } from 'react';
import styles from './calendarFrame.module.css';
import moment from 'moment';
import Calendar from '../calendar/calendar';
import Dots from '../dots/dots';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleLeft,
  faCircleRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import XButton from '../xButton/xButton';
import { closeModal, openModal } from '../../service/modalController';

const CalendarFrame = ({
  memories,
  user,
  showModal,
  setShowModal,
  selectDiary,
}) => {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const navigate = useNavigate();

  //날짜 클릭하면 선택 날짜 일기로 이동
  const onDateClick = (day) => {
    const memory = memories && memories[day] ? memories[day] : {};
    selectDiary
      ? navigate('/ourMemory', {
          state: { memory, day, user, selectDiary, member: memories.member },
        })
      : navigate('/todayDiary', { state: { memory, day, user } });
  };

  return (
    <>
      <div className={styles.calendar}>
        <div className={styles.calendar_mark}>
          {!selectDiary && <Dots />}
          {selectDiary && (
            <p
              className={styles.deletOurDiary}
              onClick={() => {
                setShowModal(openModal('delete', showModal));
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </p>
          )}
          <button
            className={styles.button}
            onClick={() => {
              setMoment(getMoment.clone().subtract(1, 'month'));
            }}
          >
            <FontAwesomeIcon icon={faCircleLeft} />
          </button>
          <div className={styles.month}>{today.format('YYYY년 MM월')}</div>
          <button
            className={styles.button}
            onClick={() => {
              setMoment(getMoment.clone().add(1, 'month'));
            }}
          >
            <FontAwesomeIcon icon={faCircleRight} />
          </button>
          <div className={styles.pcHide}>
            {!selectDiary && (
              <XButton
                onClick={() => {
                  setShowModal(closeModal('calendar', showModal));
                }}
              />
            )}
          </div>
          {selectDiary && (
            <XButton
              onClick={() => {
                setShowModal(closeModal('ourCalendar', showModal));
              }}
            />
          )}
        </div>
        <Calendar today={today} onDateClick={onDateClick} memories={memories} />
      </div>
    </>
  );
};

export default CalendarFrame;
