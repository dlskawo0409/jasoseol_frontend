import { TopBar } from './Homepage.js';
import { AiOutlineFileText, AiOutlineFolderOpen, AiOutlineSignature, AiOutlineUpload } from "react-icons/ai";
import React from 'react';
import styles from './resume_list.module.css';

function Page() {
    return (
        <div className={styles.mainContainer}>
            <TopBar selected="자기소개서" login={false} />
            <div className={styles.iconButtons}>
                <button className={`${styles.buttonWithIcon} ${styles.buttonHover}`}>
                    <div className={styles.iconAndText}>
                        <AiOutlineFileText size={35} className={`${styles.icon} ${styles.iconHover}`} />
                        <span className={`${styles.buttonText} ${styles.buttonTextHover}`}>자소서목록</span>
                    </div>
                </button>
                <button className={`${styles.buttonWithIcon} ${styles.buttonHover}`}>
                    <div className={styles.iconAndText}>
                        <AiOutlineFolderOpen size={35} className={`${styles.icon} ${styles.iconHover}`} />
                        <span className={`${styles.buttonText} ${styles.buttonTextHover}`}>불러오기</span>
                    </div>
                </button>
                <button className={`${styles.buttonWithIcon} ${styles.buttonHover}`}>
                    <div className={styles.iconAndText}>
                        <AiOutlineSignature size={35} className={`${styles.icon} ${styles.iconHover}`} />
                        <span className={`${styles.buttonText} ${styles.buttonTextHover}`}>새 자소서</span>
                    </div>
                </button>
                <button className={`${styles.buttonWithIcon} ${styles.buttonHover}`}>
                    <div className={styles.iconAndText}>
                        <AiOutlineUpload size={35} className={`${styles.icon} ${styles.iconHover}`} />
                        <span className={`${styles.buttonText} ${styles.buttonTextHover}`}>내보내기</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Page;
