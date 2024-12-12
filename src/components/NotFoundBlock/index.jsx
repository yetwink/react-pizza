import React from 'react';
import styles from './NotFoundBlock.module.css'


const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>☹️</span>
                <br/>
                Ничего не найдено! !
            </h1>
            <p className={styles.description}>
                This page is not available...
            </p>
        </div>
    );
};

export default NotFoundBlock;