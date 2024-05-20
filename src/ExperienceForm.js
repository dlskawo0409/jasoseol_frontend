import React from 'react';
import './ExperienceForm.css';
import { useLocation } from 'react-router-dom';

const ExperienceForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');


  return (
    <div className="experience-form">
      <header className="header">
        <h1>내 정보</h1>
      </header>
      <main className="main-content">
        <div className="progress-bar"></div>
        <h2 className="section-title">경력 정보</h2>
        <p className="instruction">경력 여부를 선택해 주세요.</p>
        <div className="options">
          <button className="option-button">신입이에요</button>
          <button className="option-button">경력입니다</button>
          <button className="option-button">경력이지만 신입 지원도 생각해요</button>
        </div>
        <div className="navigation-buttons">
          <button className="nav-button prev-button">이전</button>
          <button className="nav-button next-button">다음</button>
        </div>
      </main>
    </div>
  );
}

export default ExperienceForm;
