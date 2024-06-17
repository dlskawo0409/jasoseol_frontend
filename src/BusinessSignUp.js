import { TopBar } from "./Business";
import styles from './BusinessSinUp.module.css'
import React, { useState, useEffect, useCallback } from 'react';
import alert from './Image/ic_alert.svg';
import closeCircle from './Image/ic_close_circle.svg';
import ic_info_purple from './Image/ic_info_purple.svg';
import arrow from './Image/ic_arrow_down_solid.svg'

function SignUp() {
    const [login, setLogin] = useState(false);
    return(
        <div>
            <TopBar selected="" login="" setLogin={setLogin}/>
            <div className={styles.mainContainer}>
                <CompanySignup/>
            </div>
        </div>
    )
}

function CompanySignup() {
    

    const [agreements, setAgreements] = useState({
        all: false,
        terms: false,
        personalInfo: false,
        marketing: false,
    });
    

    const handleAgreementChange = (e) => {
        const { name, checked } = e.target;

        if (name === "all") {
            setAgreements({
                all: checked,
                terms: checked,
                personalInfo: checked,
                marketing: checked,
            });
        } else {
            const newAgreements = {
                ...agreements,
                [name]: checked,
            };
            newAgreements.all = newAgreements.terms && newAgreements.personalInfo && newAgreements.marketing;
            setAgreements(newAgreements);
        }

    };

    const [showTooltip, setShowTooltip] = useState(false);

    const handleEmailFocus = () => {
        setShowTooltip(true);
    };

    const handleOutsideClick = () => {
        setShowTooltip(false);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = React.useState("");
    const [passwordChk, setPasswordChk] = React.useState("");
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [user, setUser] = useState(0); // 0 존재하지 않음 , 1 일반 유저 2 기업 유저
    const [passwordLength ,setPasswordLength] = useState(0);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidPasswordChk, setIsVailPasswordChk] = useState(false);
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [companyUsername, setCompanyUsername] = useState('');
    const [companyPhoneNum, setCompanyPhoneNum] = useState('');
    const [companyNickname, setCompanyNickname] = useState('');
    const [companyInfo, setCompanyInfo] = useState('사업자 등록 정보를 입력하면 자동으로 입력됩니다.');
    const [currentValue, setCurrentValue] = useState("자소설닷컴을 어떻게 알게 되셨나요?");
    const [selectClick, setSelectClick] = useState(false);
    const [submit, setSubmit] = useState(false);
    
    const handleEmailChange = async (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        const emailIsValid = emailRegEx.test(newEmail); // 현재 이메일 유효성 검사
        setIsValidEmail(emailIsValid); // 이메일 형식 검사 결과를 상태로 저장
        if (emailIsValid) {

            const emailCondition = await getEmailCondition(newEmail);
            setUser(emailCondition); // 이메일 존재 여부 상태 업데이트
        }
    };

    const passwordCheck = (password) => {
        // 8자 이상인지 확인
        const lengthCheck = /.{8,}/.test(password);
        // 조건들을 배열로 정의
        const conditions = [
          /[a-zA-Z]/.test(password), // 영문자 포함
          /[0-9]/.test(password),    // 숫자 포함
          /[^a-zA-Z0-9]/.test(password), // 특수문자 포함
        ];
        // 조건들 중 true인 것의 개수를 세어 2개 이상이면 true를 반환
        const validConditions = conditions.filter(Boolean).length >= 2;
        // 길이 체크와 조건 충족 여부를 모두 만족해야 함
        setIsValidPassword(lengthCheck && validConditions);
        return lengthCheck && validConditions;
    };
  
    const passwordDoubleCheck = (password, passwordChk) => {
        if(password !== passwordChk){
            console.log('비밀번호가 다릅니다.');
            setIsVailPasswordChk(false);
        }else{
            console.log('비밀번호가 동일합니다');
            setIsVailPasswordChk(true);
        }

    }

    const checkPasswordLength = (password) =>{
        setPasswordLength(password.length);

    }

    const checkRegistrationNumber = (registrationNumber) =>{

        const onlyNumber = registrationNumber.replace(/[^0-9]/g, '').slice(0,10)
        let left = ''
        let middle = ''
        let last = ''
        if(onlyNumber.length<=3){
            left = onlyNumber.slice(0,onlyNumber.length);
        }
        else if(3<=onlyNumber.length && onlyNumber.length <=5){
            left = onlyNumber.slice(0,3);
            middle='-'+onlyNumber.slice(3,onlyNumber.length);
        }
        else{
            left = onlyNumber.slice(0,3);
            middle='-'+onlyNumber.slice(3,5);
            last = '-'+onlyNumber.slice(5,10);
        }
        setRegistrationNumber(left +middle+last);

    }
    const handleOnChangeSelectValue = (e) => {
        setCurrentValue(e.target.getAttribute("value"));
        setSelectClick(false);
      };


    const changeCompanyName=(companyUsername) =>{
        setCompanyUsername(companyUsername);

    }
    const changeCompanyPhoneNum =(companyPhoneNum) =>{
        setCompanyPhoneNum(companyPhoneNum);

    }
    const changeCompanyNickname = (companyNickname) =>{
        setCompanyNickname(companyNickname);

    }
    
    const checkAll = useCallback(() => {
        if (
            email !== '' &&
            password !== '' &&
            isValidEmail &&
            user === '0' &&
            passwordLength >= 8 &&
            isValidPassword &&
            isValidPasswordChk &&
            registrationNumber.length === 12 &&
            companyUsername !== '' &&
            companyPhoneNum !== '' &&
            companyNickname !== '' &&
            currentValue !== "자소설닷컴을 어떻게 알게 되셨나요?" &&
            agreements.terms &&
            agreements.personalInfo
        ) {
            setSubmit(true);
        } else {
            setSubmit(false);
        }
    }, [
        email,
        password,
        isValidEmail,
        user,
        passwordLength,
        isValidPassword,
        isValidPasswordChk,
        registrationNumber,
        companyUsername,
        companyPhoneNum,
        companyNickname,
        currentValue,
        agreements.terms,
        agreements.personalInfo
    ]);
    const handleSubmit = (event) => {
        event.preventDefault(); // 폼 제출 막기
    }    
    useEffect(() => {
        checkAll();
    }, [
        checkAll
    ]);


    const clickSubmit=() =>{
        if(submit){
            submitToServer(email,password, registrationNumber, companyUsername, companyPhoneNum, companyNickname, agreements, currentValue)
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.title}>기업 회원 가입</div>
            
            <form className={styles.form} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>아이디(이메일주소)</label>
                    <div className={styles.inputWithTooltip}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            className={`${styles.input} ${!(isValidEmail||email==='') || ( user === 1) ?  styles.invalidInput: ''}`}
                            placeholder="abcd@jasoseol.com"
                            onFocus={handleEmailFocus}
                            onChange={handleEmailChange}
                            onBlur={handleOutsideClick}
                        />
                        {showTooltip && (isValidEmail || email==='' )&&  user==='0' && (
                            <div className={styles.tooltip}>
                                기업 도메인 이메일이 아닌 naver, daum, gmail 등의 개인 메일로 가입 시 일부 서비스 사용에 제한이 있습니다.
                            </div>
                        )}
                        {showTooltip && !isValidEmail && email!=='' &&(
                            <div className={styles.invalidToolTip}>
                                메일 형식에 맞지 않는 이메일 주소입니다.
                            </div>
                        )}
                        {showTooltip && email!==''  && isValidEmail && user === '2' &&(
                            <div className={styles.invalidToolTip}>
                                이미 가입된 아이디가 존재합니다.
                            </div>
                        )}
                        {showTooltip && email!==''  && isValidEmail && user === '1' &&(
                            <div className={styles.invalidToolTip}>
                                일반 계정으로 가입된 메일주소입니다.
                            </div>
                        )}
                        {email && (
                            <img
                                src={closeCircle}
                                alt="이메일 입력 지우기"
                                className={styles.clearButton}
                                onClick={() => setEmail('')}
                            />
                        )}
                    </div>
                </div>
            
          
            <div className={styles.formGroup}>
    
                <label htmlFor="password" className={styles.label}>비밀번호</label>
                    <div style={{position: 'relative'}}>
                        <input type="password" id="password" name="password"  value={password} placeholder="8-16자리 비밀번호 입력" 
                        onChange={(e) => {setPassword(e.target.value); passwordCheck(e.target.value); passwordDoubleCheck(e.target.value, passwordChk); checkPasswordLength(password)}}
                        className={`${styles.input} ${!(isValidPassword||password==='' ) ?  styles.invalidInput: ''}`}
                        onSubmit={handleSubmit} />
                        {password && (
                            <img
                                src={closeCircle}
                                alt="비밀번호 입력 지우기"
                                className={styles.clearButton}
                                onClick={() => setPassword('')}
                                />
                        )}
                    </div>
                <div style={{ marginBottom: '7px' }} />
                <div style={{position: 'relative'}}>
                    <input type="password" value={passwordChk}
                                    onChange={(e) => {setPasswordChk(e.target.value); passwordDoubleCheck(password, e.target.value)}}
                                    placeholder="비밀번호 재입력"
                                    className={styles.input}
                                    onSubmit={handleSubmit}
                                    />
                    {passwordChk && (
                    <img
                        src={closeCircle}
                        alt="비밀번호 입력 지우기"
                        className={styles.clearButton}
                        onClick={() => setPasswordChk('')}
                        />
                     )}
                </div>

                {password !=='' &&  passwordLength <8 &&<div className={styles.errorPassWordText}>
                    <img src={alert} alt="alert" style={{marginRight:'5px'}} />
                    비밀번호는 8자 이상 입력해야합니다.
                </div>}
                {password ==='' && passwordChk !=='' &&<div className={styles.errorPassWordText}>
                    <img src={alert} alt="alert" style={{marginRight:'5px'}} />
                        비밀번호가 입력되지 않았습니다.
                </div>}
                {password !=='' && passwordChk !=='' && passwordLength >8 && !isValidPasswordChk && <div className={styles.errorPassWordText}>
                    <img src={alert} alt="alert" style={{marginRight:'5px'}} />
                        비밀번호가 일치하지 않습니다.
                </div>}

            </div>

            <div className={styles.formGroup}>
                    <label className={styles.label}>사업자 등록번호</label>
                    <div style={{position: 'relative'}}>
                        <input type="text"  id="registrationNumber" name="registrationNumber" className={styles.input} value={registrationNumber} placeholder="000-00-00000"
                        onChange={(e)=>checkRegistrationNumber(e.target.value)} onSubmit={handleSubmit} 
                        />
                        {registrationNumber && (
                            <img
                                src={closeCircle}
                                alt="사업자 등록번호 입력 지우기"
                                className={styles.clearButton}
                                onClick={() => setRegistrationNumber('')}
                                />
                        )}
                    </div>
                    <div className={styles.couponAnnouncement}>
                        <img src={ic_info_purple} alt="ic_info_purple" className={styles.icInfoPurple}/>
                        <p className={styles.infoText}>사업자 등록번호 입력이 불가능하신 경우,<br /> 별도 문의 부탁드립니다.</p>
                    </div>
            </div>
                <div className={styles.formGroup}>
                    <label htmlFor="companyInfo" className={styles.label}>기업정보</label>
                    <label className={styles.companyInfo}>{companyInfo}</label>
                    
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="managerName" className={styles.label}>담당자 정보</label>
                    <div style={{position: 'relative'}}>
                        <input type="text" id="managerName" name="managerName" className={styles.input} value={companyUsername} placeholder="담당자명" onChange={(e)=>changeCompanyName(e.target.value)} onSubmit={handleSubmit} />
                        {companyUsername && (
                            <img
                                src={closeCircle}
                                alt="담당자명 지우기"
                                className={styles.clearButton}
                                onClick={() => setCompanyUsername('')}
                                />
                        )}
                    </div>
                    <div style={{ marginBottom: '7px' }} />

                    <div style={{position: 'relative'}}>
                        <input type="text" id="managerPhoneNum" name="managerPhoneNum" className={styles.input} value={companyPhoneNum} placeholder="담당자 연락처" onChange={(e)=>changeCompanyPhoneNum(e.target.value)} onSubmit={handleSubmit}/>
                        {companyPhoneNum && (
                            <img
                                src={closeCircle}
                                alt="담당자 연락처 지우기"
                                className={styles.clearButton}
                                onClick={() => setCompanyPhoneNum('')}
                                />
                        )}
                    </div>
                    <div style={{ marginBottom: '7px' }} />

                    <div style={{position: 'relative'}}>
                        <input type="text" id="managerNickName" name="managerNickName" className={styles.input} value={companyNickname} placeholder="자소설닷컴 채팅방 닉네임" onChange={(e)=>changeCompanyNickname(e.target.value)} onSubmit={handleSubmit}/>
                        {companyNickname && (
                            <img
                                src={closeCircle}
                                alt="닉네임 지우기"
                                className={styles.clearButton}
                                onClick={() => setCompanyNickname('')}
                                />
                        )}
                    </div>
                    <div style={{ marginBottom: '7px' }} />

                    <div className={styles.couponAnnouncement}>
                        <img src={ic_info_purple} alt="ic_info_purple" className={styles.icInfoPurpleCharge}/>
                        <p className={styles.infoTextCharge}>자소설닷컴 채팅방에서 활동 시 기업 인사담당자 아이디로 노출됩니다. 
                            채팅방에서는 인사담당자로서의 활동만을 권고하며 채팅방에서의 적극적인 소통은 취준생에게 긍정적인 기업 이미지를 줄 수 있습니다. 
                            (닉네임 설정은 30자까지만 가능)</p>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="discoveryPath" className={styles.label}>알게된 경로</label>
                    <div className={styles.selectContainer} onBlur={(e)=>setSelectClick(false)}>
                        <div className={styles.input} onClick={() =>{setSelectClick(!selectClick)}}>
                            <div className={styles.selected}>
                                <div className={styles.selectLabel}>{currentValue}</div>
                            </div>
                        </div>
                        <img src={arrow} className={styles.nonClearButton} alt="화살표 아이콘"></img>
                        <div className ={styles.option_container}style={{ display: selectClick ? 'block' : 'none'}}>
                            <div className={styles.optionFirst} onClick={handleOnChangeSelectValue} value='입사자, 지원자 지원경로 조사'>입사자, 지원자 지원경로 조사</div>
                            <div className={styles.option} onClick={handleOnChangeSelectValue} value='동료, 지인의 추천'>동료, 지인의 추천</div>
                            <div className={styles.option} onClick={handleOnChangeSelectValue} value='인터뷰, 기사 등 언론 매체'>인터뷰, 기사 등 언론 매체</div>
                            <div className={styles.option} onClick={handleOnChangeSelectValue} value='검색'>검색</div>
                            <div className={styles.option} onClick={handleOnChangeSelectValue} value='취업 준비하며 이용'>취업 준비하며 이용</div>
                            <div className={styles.optionLast} onClick={handleOnChangeSelectValue} value='기타'>기타</div>
                        </div>

                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>약관 동의</label>
                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxBigLabel}>
                            <input type="checkbox" name="all" checked={agreements.all} onChange={handleAgreementChange} />
                            <span className={styles.checkmark}></span>
                            모두 동의합니다.
                        </label>
                        <div className={styles.line}></div>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" name="terms" checked={agreements.terms} onChange={handleAgreementChange} />
                            <span className={styles.checkmark}></span>
                            [필수] 기업 회원 약관에 동의
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" name="personalInfo" checked={agreements.personalInfo} onChange={handleAgreementChange} />
                            <span className={styles.checkmark}></span>
                            [필수] 개인 정보 수집 및 이용에 동의
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" name="marketing" checked={agreements.marketing} onChange={handleAgreementChange} />
                            <span className={styles.checkmark}></span>
                            [선택] 마케팅 정보 수신에 동의
                        </label>
                        </div>
                </div>
                <button type="submit"className={`${styles.submitButton} ${(submit) ?  styles.submitReadyButton: ''}`}onClick={clickSubmit}>기업 회원 가입하기</button>
            </form>
        </div>
    );
}

async function getEmailCondition(email) {
    try {

      const response = await fetch(`http://localhost:8080/api/check-email?email=${email}`, {
        method: 'GET',
        headers: {
          type: "application / json",
        },
      });
  
  //    console.log(response);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data.message); 
      return data.message;
      

    } catch (error) {
      console.error('Error:', error);
      return -1; // 에러 처리, 실제 사용 시 필요에 따라 변경 가능
    }
  }

  const getComePath = (currentValue) => {
    switch(currentValue) {
        case '입사자, 지원자 지원경로 조사':
            return 'EMPLOYEE';
        case '동료, 지인의 추천':
            return 'COLLEAGUE';
        case '인터뷰, 기사 등 언론 매체':
            return 'INTERVIEW';
        case '검색':
            return 'SEARCH';
        case '취업 준비하며 이용':
            return 'USE';
        case '기타':
            return 'ETC';
        default:
            return 'ETC'; // 기본값 설정
    }
}


  async function submitToServer(email,password, registrationNumber, companyUsername, companyPhoneNum, companyNickname, agreements, currentValue){
    try{
        let tempMarketing = arguments.marketing ? '1' : '0'
        let resultComePath = getComePath(currentValue);

        const response = await fetch(`http://localhost:8080/api/join/company-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                nickname: companyNickname,
                marketing: tempMarketing,
                companyNum: registrationNumber,
                companyUserName : companyUsername,
                companyUserPhonenum : companyPhoneNum,
                comePath : resultComePath,

            }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json(); // JSON 객체를 기다린 후 반환받음
        const data = responseData.message;
        

        console.log(data);
        if(data === 'Join Success'){
            console.log('Join successful');
            window.location.href = '/business_users/sign_in';
            
        }

    }
    catch(error){
        console.log("Join Fail");
    }
  }


export default SignUp;
