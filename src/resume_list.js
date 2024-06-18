import { TopBar } from './Homepage.js';
import { AiOutlineFileText, AiOutlineFolderOpen, AiOutlineSignature, AiOutlineUpload } from "react-icons/ai";
import React from 'react';
import styles from './resume_list.module.css';

function Page() {
  const [fileButtonClicked, setFileButtonClicked] = React.useState(false);
  const [folderButtonClicked, setFolderButtonClicked] = React.useState(false);
  const [signatureButtonClicked, setSignatureButtonClicked] = React.useState(false);
  const [uploadButtonClicked, setUploadButtonClicked] = React.useState(false);

  const handleFileButtonClick = () => {
    setFileButtonClicked(!fileButtonClicked);
  };

  const handleFolderButtonClick = () => {
    setFolderButtonClicked(!folderButtonClicked);
  };

  const handleSignatureButtonClick = () => {
    setSignatureButtonClicked(!signatureButtonClicked);
  };

  const handleUploadButtonClick = () => {
    setUploadButtonClicked(!uploadButtonClicked);
  };

  return (
    <div className={styles.test}>
      <TopBar selected="자기소개서" login={false} />
      <div className={styles.iconButtons}>
        <button
          className={`${styles.buttonWithIcon} ${styles.buttonHover} ${fileButtonClicked ? styles.buttonActive : ''}`}
          onClick={handleFileButtonClick}
        >
          <div className={styles.iconAndText}>
            <AiOutlineFileText
              size={35}
              className={`${styles.icon} ${fileButtonClicked ? styles.iconActive : styles.iconHover}`}
            />
            <span
              className={`${styles.buttonText} ${fileButtonClicked ? styles.buttonTextActive : styles.buttonTextHover}`}
            >
              자소서 목록
            </span>
          </div>
        </button>
        <button
          className={`${styles.buttonWithIcon} ${styles.buttonHover} ${folderButtonClicked ? styles.buttonActive : ''}`}
          onClick={handleFolderButtonClick}
        >
          <div className={styles.iconAndText}>
            <AiOutlineFolderOpen
              size={35}
              className={`${styles.icon} ${folderButtonClicked ? styles.iconActive : styles.iconHover}`}
            />
            <span
              className={`${styles.buttonText} ${folderButtonClicked ? styles.buttonTextActive : styles.buttonTextHover}`}
            >
              불러오기
            </span>
          </div>
        </button>
        <button
          className={`${styles.buttonWithIcon} ${styles.buttonHover} ${signatureButtonClicked ? styles.buttonActive : ''}`}
          onClick={handleSignatureButtonClick}
        >
          <div className={styles.iconAndText}>
            <AiOutlineSignature
              size={35}
              className={`${styles.icon} ${signatureButtonClicked ? styles.iconActive : styles.iconHover}`}
            />
            <span
              className={`${styles.buttonText} ${signatureButtonClicked ? styles.buttonTextActive : styles.buttonTextHover}`}
            >
              새 자소서
            </span>
          </div>
        </button>
        <button
          className={`${styles.buttonWithIcon} ${styles.buttonHover} ${uploadButtonClicked ? styles.buttonActive : ''}`}
          onClick={handleUploadButtonClick}
        >
          <div className={styles.iconAndText}>
            <AiOutlineUpload
              size={35}
              className={`${styles.icon} ${uploadButtonClicked ? styles.iconActive : styles.iconHover}`}
            />
            <span
              className={`${styles.buttonText} ${uploadButtonClicked ? styles.buttonTextActive : styles.buttonTextHover}`}
            >
              내보내기
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Page;
