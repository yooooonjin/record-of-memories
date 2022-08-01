import React, { useEffect, useRef, useState } from 'react';
import styles from './images.module.css';

const Images = ({ memories, days, onImageClick }) => {
  const [URL, setURL] = useState();

  useEffect(() => {
    memories &&
      Object.keys(memories).map((key) => {
        if (key === days.format('YYYY-MM-DD')) {
          memories[key].pictures && setURL(memories[key].pictures[0]);
        }
      });
  });

  return (
    <div
      className={styles.images}
      onClick={() => {
        onImageClick(days.format('YYYY-MM-DD'));
      }}
    >
      {URL && <img className={styles.image} src={`${URL}`} />}
      <div className={`${styles.day} ${URL && styles.white}`}>
        {days.format('DD')}
      </div>
    </div>
  );
};

export default Images;
