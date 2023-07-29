import React from "react";
import styles from "./Preloader.module.scss";

const Preloader = () => {
  return (
    <div className={styles.dice}>
      <div className={styles.face + " " + styles.firstFace}>
        <div className={styles.dot}></div>
      </div>
      <div className={styles.face + " " + styles.secondFace}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      <div className={styles.face + " " + styles.thirdFace}>
        <div className={styles.columnx}>
          <div className={styles.dot}></div>
        </div>
        <div className={styles.dot}></div>
        <div className={styles.columny}>
          <div className={styles.dot}></div>
        </div>
      </div>
      <div className={styles.face + " " + styles.fourthFace}>
        <div className={styles.column}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
        <div className={styles.column}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
      <div className={styles.face + " " + styles.fifthFace}>
        <div className={styles.column}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
        <div className={styles.column}>
          <div className={styles.dot}></div>
        </div>
        <div className={styles.column}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
      <div className={styles.face + " " + styles.sixthFace}>
        <div className={styles.column}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
        <div className={styles.column}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
