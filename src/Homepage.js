import logo from './Image/logo_landscape.svg';
import userIcon from './Image/ic_account.svg';
import notificationIcon from './Image/ic_notification.svg';
import chatIcon from './Image/ic_chat.svg';
import chatPressIcon from './Image/ic_chat_pressed.svg'
import icClose from './Image/ic_close.svg';
import kakaoImage from './Image/img_logo_kakao.svg';
import naverImage from './Image/img_logo_naver.svg';
import googleImage from './Image/img_logo_google.svg';
import businessIcon from './Image/ic_business.svg';
import closeCircle from './Image/ic_close_circle.svg';
import alert from './Image/ic_alert.svg';
import check from './Image/ic_check_blue.svg';
import selected from './Image/ic_checkbox_rounded_selected.svg';
import unselected from './Image/ic_checkbox_rounded_unselected.svg';
import ic_info_purple from './Image/ic_info_purple.svg';
import arrowRight from './Image/ic_arrow_right_linear.svg'
import arrowLeft from './Image/ic_arrow_left_linear.svg'
import add from './Image/ic_add.svg'
import search_ic from './Image/magnifying_glass.svg';
import ExperienceForm from './ExperienceForm.js'
import styles from './hompage.module.css';
import React, { useState , useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Page() {
    const location = useLocation();
    const [login, setLogin] = useState(false);
    const [career, setCareer] = useState(false);

    useEffect(() => {
      if (location.state) {
        if (location.state.login !== undefined) {
          setLogin(location.state.login);
        }
        if (location.state.career !== undefined) {
          setCareer(location.state.career);
        }
      }
    }, [location.state]);
  

    if(login & career=== false){
        <Link to={ExperienceForm}>
        </Link>
    }

    return (
        <div>
            <TopBar selected="" login={login} setLogin={setLogin} setCareer={setCareer}/>
            <div className={styles.mainContainer}>
                    <RotateSlide />
                    <SearchDP/>
            </div>
        </div>
    );
}





function TopBar({selected, login, setLogin, setCareer, chatOpen, setChatOpen}){
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
   

    // 모달 닫기 함수 수정
    const closeModal = () => {setModalMode(""); setModalOpen(false);};
    const openModal = () => setModalOpen(true);
    const openChat = () => {setChatOpen(true)};
    const closeChat = () => {setChatOpen(false)};


    // 애니메이션 종료 후 처리
    useEffect(() => {
        if (isClosing) {
            const timer = setTimeout(() => {
                setModalOpen(false); // 실제로 모달 상태 업데이트
                setIsClosing(false); // 애니메이션 상태 초기화
            },350); // 애니메이션 지속 시간과 동일하게 설정

            return () => clearTimeout(timer);
        }
    }, [isClosing]);

    return (
        <div>
            {isModalOpen && (
                <div style={{
                             position: 'fixed',
                             top: 0,
                             left: 0,
                             width: '100%',
                             height: '100%',
                             backgroundColor: 'rgba(0, 0, 0, 0.5)',
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center',
                             zIndex: 10,
                         }}// 모달의 배경 스타일
                    onClick={closeModal} // 오버레이 클릭 시 모달 닫기
                >
                    <div className={`${styles.modalScreen} ${isClosing ? styles.modalExit : styles.modalEnter}`} onClick={(e) => e.stopPropagation()}>
                        <OpenLoginModal onClose={closeModal}  modalMode={modalMode} setModalMode={setModalMode} setLogin={setLogin} setCareer={setCareer} />
                    </div>
                </div>
            )}
                <div className = {styles.TopBar}>
                    <div className = {styles.Items}>

                        <div className ={styles.BarLogo}>
                            <RedirectionLogoTo to="/" />
                        </div>
                        <div className = {styles.line}>
                        </div>
                        <div className = {styles.menu}>
                            <ClickedMenu selected = {selected} />
                        </div>

                    </div>
                    <div className ={styles.bin}></div>
                    <div className ={styles.icons}>
                        <MenuIcon login={login} setLogin={setLogin} setModalOpen={setModalOpen} />
                        {selected === '채용공고' && chatOpen === false && (
                            <div className={styles.chatButtonContainer} onClick={openChat}>
                                <img src ={chatIcon} alt='채팅 아이콘' />
                            </div>
                            )
                        }
                        {selected === '채용공고' && chatOpen === true &&(
                            <div className={styles.chatButtonContainer} onClick={closeChat}>
                                <img src ={chatPressIcon} alt='채팅 눌린 아이콘' />
                            </div>

                        )}
                    </div>
                </div>



        </div>


    )
}

function RedirectionLogoTo({ to }) {
    return (
        <Link to={to}>
            <img src={logo} alt="자소설 닷컴 logo" />
        </Link>
    );
}

function ClickedMenu({ selected }) {
  const menuItems = [
    { key: "recurit", text: "채용공고", to: "/recruit" },
    { key: "resume_list", text: "자기소개서", to: "/resume_list"},
    { key: "spec_career_description",text: "이력서", to: "/spec_career_description"},
    { key: "datalab",text: "데이터랩", to: "/datalab"},
    { key: "practice",text: "실무경험 채우기", to: "/practice"}, // 'to' 속성을 적절히 수정하세요
    { key: "career",text: "주니어 이직", to: "/career"}
  ];

  return (
    <div>
      {menuItems.map(item => (
        <ChangeColorOnHover
          text={item.text}
          to={item.to}
          clicked={selected === item.text}
          key={item.key}
        />
      ))}
    </div>
  );
}

function ChangeColorOnHover({ text , to , clicked }) { // props 객체 구조 분해
  const [isHover, setIsHover] = useState(false);

  if (clicked === true){
      return(
              <div className = {styles.clickedMenu}>
                {text}
              </div>
      )
  }

  return (
      <Link to={to} className={`${styles.linkNoDecoration} ${isHover ? styles.textBold : styles.textNormal}`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                {text}
      </Link>
  );
}

function MenuIcon({login, setLogin, setModalOpen}){
    const [isHover, setIsHover] = useState(false);

    if(login){
        return (
        <div className={styles.icons}>
            <div className={styles.icon}>
                <img src={userIcon} alt="userIcon" />
            </div>
            <div className={styles.icon}>
                <img src={notificationIcon} alt="notificationIcon" />
            </div>
            <div className={styles.icon}>
                <img src={chatIcon} alt="chatIcon" />
            </div>
        </div>
        )
    }
    return(
        <div className = {styles.buttons}>
            <div className={`${styles.loginButton} ${isHover ? styles.loginButton : styles.loginButton}`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
            onClick = {()=> setModalOpen(true)}>
                회원가입/로그인
            </div>

             <div className={`${styles.serviceButton} ${isHover ? styles.serviceButton : styles.serviceButton}`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                           기업서비스
             </div>
        </div>
    )
}

function OpenLoginModal({ onClose, modalMode, setModalMode, setLogin, setCareer}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = React.useState("");
    const [isHover, setIsHover] = useState(false);

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/


    const emailCheck = (username) => {
        return emailRegEx.test(username); //형식에 맞을 경우, true 리턴
    }
    const passwordCheck = (password) => {
        if(password.match(passwordRegEx)===null) { //형식에 맞지 않을 경우 아래 콘솔 출력
            console.log('비밀번호 형식을 확인해주세요');
            return;
        }else{ // 맞을 경우 출력
            console.log('비밀번호 형식이 맞아요');
        }
    }

      const handleSubmit = (event) => {
        event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
        console.log('Submitted email:', email);
        // 이메일을 서버로 보내거나 검증 로직 추가 가능
      };

    if(modalMode === 'JoinEmail'){
        return(
            <EmailJoinModal onClose={onClose} setModalMode={setModalMode} setLogin ={setLogin} setCareer={setCareer}/>
        )
    }

    const clearInput = () => {
        setEmail(''); // 이메일 상태를 빈 문자열로 설정
    };

    return (
    <div
            style={{
                backgroundColor: 'white',
                width: '340px',
                height: '530px',
                padding: '30px',
                zIndex: 11,
                borderRadius: '10px'
            }}
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
        >
        <div className={styles.modalContent}>
            <div className={styles.modalTop}>
                <div className={styles.modalTitle}>
                    시작하기
                </div>
                    <img src={icClose } alt="ic_close"  onClick={onClose}
                                                             style={{ cursor: 'pointer' }}/>
            </div>

            <div className={styles.OAuth2Container}>
                <img src = {kakaoImage} alt="kakaoImage" style={{ cursor: 'pointer' }}/>
                <img src = {naverImage} alt ="naverImage" style={{ cursor: 'pointer' }}/>
                <img src = {googleImage} alt = "googleImage" style={{ cursor: 'pointer' }}/>
            </div>
            <div className={styles.joinLogin} onClick={()=> setModalMode('JoinEmail')}>
                이메일로 회원가입
            </div>
            <div className={styles.emailLoginContainer}>
                <div className={styles.emailText}>
                    이메일로 로그인
                </div>
                <div className={styles.modalBottom}>
                    <div className={styles.inputContainer}>
                        <form  onSubmit={handleSubmit}>
                            <label>
                                <input type="email" value={email}
                                onChange={(e) => {setEmail(e.target.value); emailCheck(e.target.value)}}
                                placeholder="이메일 주소를 입력해 주세요"
                                className={styles.input}
                                id="emailInput"
                                />
                                 {email && (
                                    <img
                                        src={closeCircle}
                                        alt="이메일 입력 지우기"
                                        className={styles.clearButton}
                                        onClick={() => setEmail('')}
                                        />
                                 )}
                            </label>
                        </form>
                    </div>

                    <div className={styles.inputContainer}>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <input type="password" value={password}
                                onChange={(e) => {setPassword(e.target.value); passwordCheck(e.target.value)}}
                                placeholder="비밀번호를 입력해 주세요"
                                className={styles.input}
                                />
                                 {password && (
                                    <img
                                        src={closeCircle}
                                        alt="비밀번호 입력 지우기"
                                        className={styles.clearButton}
                                        onClick={() => setPassword('')}
                                        />
                                 )}
                            </label>
                        </form>
                    </div>
                </div>
                <div className={`${styles.summitButton} ${isHover ? styles.summitButton : styles.summitButton}`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={() => getLogin(email, password, setLogin, setCareer)}>
                    로그인
                </div>
                <div className={`${styles.findPassword} ${isHover ? styles.findPassword : styles.findPassword}`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                   <span>비밀번호가 기억나지 않으세요?</span>
                </div>
            </div>
            <div className={`${styles.business} ${isHover ? styles.business : styles.business}`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <div className={`${styles.businessLinkAndImage} ${isHover ? styles.businessLinkAndImage : styles.businessLinkAndImage}`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <img src={businessIcon} alt="ic_business"/>
                     <Link to={"/business_users/sign_in"} className={styles.businessLink}>
                        <span>혹시 기업회원이신가요?</span>
                     </Link>
                 </div>
                 
            </div>


        </div>

    </div>
    );
}

function EmailJoinModal({ onClose, setModalMode, setLogin, setCareer }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = React.useState("");
    const [passwordChk, setPasswordChk] = React.useState("");

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;


    const [isValidEmail, setIsValidEmail] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidPasswordChk, setIsVailPasswordChk] = useState(false);


    const handleEmailChange = async (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        const emailIsValid = emailRegEx.test(newEmail); // 현재 이메일 유효성 검사
        setIsValidEmail(emailIsValid); // 이메일 형식 검사 결과를 상태로 저장
        if (emailIsValid) {
            const emailExist = await checkEmailExist(newEmail); // 비동기 호출 결과 기다림
            setEmailExist(emailExist); // 이메일 존재 여부 상태 업데이트
//            console.log(isValidEmail && emailExist);
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
    const handleSubmit = (event) => {
        event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
        console.log('Submitted email:', email);
        // 이메일을 서버로 보내거나 검증 로직 추가 가능
    };

  // 이미지와 텍스트 쌍을 객체로 관리
  const initialItems = [
    { image: unselected, boldText: "[필수]", Text:'만 14세 이상입니다.', selected: false },
    { image: unselected, boldText: "[필수]", Text:'이용약관',           selected: false },
    { image: unselected, boldText: "[필수]", Text:'개인정보 처리 방침',   selected: false },
    { image: unselected, boldText: "[선택]", Text:'맞춤형 채용 공고 소식 받기',   selected: false }
  ];
  const [items, setItems] = useState(initialItems);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // 개별 아이템 토글 함수
  const toggleItem = index => {
    const newItems = [...items];
    newItems[index].selected = !newItems[index].selected;
    newItems[index].image = newItems[index].selected ? selected : unselected;
    setItems(newItems);
  };

  // 전체 동의 토글 함수
  const toggleAll = () => {
    const newState = !isAllSelected;
    setIsAllSelected(newState);
    const updatedItems = items.map(item => ({
      ...item,
      selected: newState,
      image: newState ? selected : unselected
    }));
    setItems(updatedItems);
  };

  // 개별 아이템 상태가 변경될 때마다 전체 동의 상태 업데이트
  useEffect(() => {
    setIsAllSelected(items.every(item => item.selected));
  }, [items]);

    async function sendJoinData() {
        // 조건 확인

        if (items[0].selected && items[1].selected &&items[2].selected&& isValidEmail && isValidPassword && isValidPasswordChk && !emailExist) {
            // 조건을 모두 만족하면 실행
            const marketing = items[3].selected ? 1 : 0;

            try {
                const response = await fetch('http://localhost:8080/api/join', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        // 추가적인 헤더가 필요한 경우 여기에 추가
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        marketing: marketing,
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
                }

            
                try{
                    const token = getLogin(email, password, setLogin, setCareer);
                    
                }
                catch(error){
                    console.log("login fail");
                }

                    

                // if (token) {
                //     // 로컬 스토리지에 토큰 저장
                //     localStorage.setItem('jwt', token);
                //     console.log(token);
                //     window.location.href = 'http://localhost:8080/success';
                // }

                // 로그인 성공 후 처리 로직 추가 가능
            } catch (error) {
                console.error('Join failed:', error);
                // 에러 처리 로직 추가 가능
            }
        } else {
            console.log('Conditions not met for login');
            // 조건을 만족하지 않을 때의 처리 로직 추가 가능
        }
    }

    

    return(
        <div className={styles.EmailJoinModal}>
           <div className={styles.EmailJoinModalTop}>
                <span>회원가입</span>
                <img src={icClose}  alt="ic_close" onClick={onClose}/>
           </div>
           <div className={styles.emailJoinInputContainer} >
                <span>이메일</span>
                {isValidEmail&& !emailExist && <img src={check} alt="check" style={{marginLeft:'5px'}}/>}

                    <div className={styles.emailInputContainer}>
                        <form  onSubmit={handleSubmit}>
                            <label>
                                <input type="email" value={email}
                                onChange={handleEmailChange}
                                placeholder="abc@example.com"
                                className={`${styles.input} ${!(isValidEmail||email==='') || emailExist ?  styles.invalidInput: ''}`}
                                />
                                 {email && (
                                    <img
                                        src={closeCircle}
                                        alt="이메일 입력 지우기"
                                        className={styles.clearButton}
                                        onClick={() => setEmail('')}
                                        />
                                 )}
                            </label>
                        </form>
                    </div>
                            {!(isValidEmail||email==='' )&& <div className={styles.errorEmailText}>
                                <img src={alert} alt="alert" style={{marginRight:'5px'}}/>
                                이메일 형식이 아닙니다.
                            </div>}
                            {(isValidEmail && emailExist) && <div className={styles.errorEmailText}>
                                <img src={alert} alt="alert" style={{marginRight:'5px'}}/>
                                이미 가입한 계정입니다.로그인해주세요.
                                <div className={styles.errorGoLoginText} onClick={()=>setModalMode("")}>
                                로그인
                                </div>
                            </div>}
           </div>

           <div className={styles.emailJoinInputContainer} >
                <span>비밀번호</span>
                {isValidPassword && <img src={check} alt="check" style={{marginLeft:'5px'}}/>}
                    ontain<div className={styles.emailInputCer}>
                        <form  onSubmit={handleSubmit}>
                            <label>
                                <input type="password" value={password}
                                onChange={(e) => {setPassword(e.target.value); passwordCheck(e.target.value); passwordDoubleCheck(e.target.value, passwordChk)}}
                                placeholder="8자 이상 입력"
                                className={`${styles.input} ${!(isValidPassword||password==='' ) ?  styles.invalidInput: ''}`}
                                />
                                 {password && (
                                    <img
                                        src={closeCircle}
                                        alt="비밀번호 입력 지우기"
                                        className={styles.clearButton}
                                        onClick={() => setPassword('')}
                                        />
                                 )}
                            </label>
                        </form>

                    </div>
                            {!(isValidPassword||password==='' )&& <div className={styles.errorPassWordText}>
                                <img src={alert} alt="alert" style={{marginRight:'5px'}} />
                                영문/숫자/특수문자 중 2가지 이상 조합하여 8자 이상 입력해주세요.
                            </div>}
           </div>

           <div className={styles.emailJoinInputContainer} >
                <span>비밀번호 확인</span>
                {isValidPasswordChk && <img src={check} alt="check" style={{marginLeft:'5px'}}/>}
                    <div className={styles.emailInputContainer}>
                        <form  onSubmit={handleSubmit}>
                            <label>
                                <input type="password" value={passwordChk}
                                onChange={(e) => {setPasswordChk(e.target.value); passwordDoubleCheck(password, e.target.value)}}
                                placeholder="비밀번호 재입력"
                                className={styles.input}
                                />
                                 {passwordChk && (
                                    <img
                                        src={closeCircle}
                                        alt="비밀번호 확인 입력 지우기"
                                        className={styles.clearButton}
                                        onClick={() => setPasswordChk('')}
                                        />
                                 )}
                            </label>
                        </form>
                    </div>
                            {!(isValidPasswordChk||passwordChk==='' )&& <div className={styles.errorPassWordText}>
                                <img src={alert} alt="alert" style={{marginRight:'5px'}} />
                                비밀번호가 일치하지 않습니다.
                            </div>}

           </div>
           <div className={styles.joinLine}></div>
            <div>
              <div className={`${styles.agreeAllButton}`} onClick={toggleAll}>
                전체 동의
                <img src={isAllSelected ? selected : unselected} alt="" style={{cursor:'pointer'}} />

              </div>
              {items.map((item, index) => (
                <div key={index} className={styles.term} onClick={() => toggleItem(index)}>
                  <div className={styles.termBoldText}>{item.boldText}</div>
                  <div className={styles.termText}>{item.Text}</div>

                  <img src={item.image} alt="" style={{cursor:'pointer'}} />
                </div>
              ))}
            </div>

            <div className={styles.couponAnnouncement}>
                <img src={ic_info_purple} alt="ic_info_purple" className={styles.icInfoPurple}/>
                <div className={styles.infoText}>맞춤공고, 채용설명회 및 박람회소식,<br/>교육 할인 쿠폰을 받을 수 있어요. </div>
            </div>
           <div className={styles.whiteBin}>
            </div>
            <div className={styles.ModalFoot}>

                <div className={styles.emailSummitButtonContainer}>
                    <div className={styles.goLoginModal}  onClick={() => setModalMode(null)}>
                        <div className={styles.goLoginText}>
                            이전
                        </div>
                    </div>
                    <div className={styles.smallWhiteBin}/>
                    <div className={styles.emailSummitButton}>
                        <div className={styles.emailSummitText} onClick={sendJoinData}>
                            다음
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
async function checkEmailExist(email) {
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
    console.log(data.message); // 서버 응답 로그 출력, 실제 사용 시 필요에 맞게 조정

    // 예시 응답 처리, 실제 서버의 응답 구조에 따라 조정 필요
    if (data.message === 'Email exists') {
     return true; // 이메일이 존재하는 경우
    } else {
        return false; // 이메일이 존재하지 않는 경우
    }
  } catch (error) {
    console.error('Error:', error);
    return false; // 에러 처리, 실제 사용 시 필요에 따라 변경 가능
  }
}

async function getLogin(email, password, setLogin, setCareer){
    try{
        const response = await fetch(`http://localhost:8080/login?username=${email}&password=${password}`,{
            method: 'POST',
            headers:{
                type: "application / json",
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const token = await response.headers.get('Authorization');
        if(token){{
            localStorage.setItem('jwt', token);
            // console.log(token); token 확인용
            setLogin(true);
            const temp = await getCarrer(email);
            console.log(temp);
            if(temp === 0){
                console.log("re");
                // <Link to={"/ExperienceForm"}></Link>
                window.location.href = `/ExperienceForm?email=${encodeURIComponent(email)}`; // email을 쿼리 매개 변수로 추가;
            }
            else{
                setCareer(true);
                <Link to={{pathname: "/", state: {login : true, career : true}}}></Link>
            }
            // console.log("login state: ");
        }}


    }
    catch(error){
        console.error('login fali Error: ', error);
    }
}

async function getCarrer(email){
    try{
        const response = await fetch(`http://localhost:8080/api/check-career?email=${email}`,{
            method: 'GET',
            headers:{
                type: "application / json",
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = (await response.json()).message;
   
        return data;
    


    }
    catch(error){
        console.error('login fali Error: ', error);
    }
}
function RotateSlide() {
    const [isMount, setMount] = useState(false);
    const [trainCompartment, setTrainCompartment] = useState([]);
    const [isHover, setIsHover] = useState(false);
    const [curSlide, setCurSlide] = useState(0);
    const [nextSlide, setNextSlide] = useState(1); // 다음 슬라이드를 저장하는 상태
    const [isFading, setIsFading] = useState(false); // 페이드 인/아웃 상태를 관리하는 상태 변수
    const [openImageModal, setImageModal] = useState(false);

    const [trainCompartmentData, redirectionUrls] = useMainImages();
    const FIRST_SLIDE_INDEX = 0;
    const LAST_SLIDE_INDEX = trainCompartment.length - 1;
    const MOVE_SLIDE_INDEX = 1;

    useEffect(() => {
        if (!isMount && trainCompartmentData.length > 0) {
            setTrainCompartment(trainCompartmentData);
            setMount(true);
        }
    }, [isMount, trainCompartmentData]);

    useEffect(() => {
        const id = setInterval(() => {
            moveToSlide('next');
        }, 4000);

        return () => clearInterval(id);
    }, [trainCompartment]);


    const moveToSlide = (value) => {
        if (isFading) return; // 애니메이션 중일 때는 새로운 슬라이드 전환을 방지
        setIsFading(true); // 페이드 아웃 시작

        setNextSlide((prevSlide) => {
            if (value === 'next') {
                return prevSlide < LAST_SLIDE_INDEX
                    ? prevSlide + MOVE_SLIDE_INDEX
                    : FIRST_SLIDE_INDEX;
            } else if (value === 'prev') {
                return prevSlide > FIRST_SLIDE_INDEX
                    ? prevSlide - MOVE_SLIDE_INDEX
                    : LAST_SLIDE_INDEX;
            }
        });

        setTimeout(() => {
            setCurSlide((prevState) => {
                if (value === 'next') {
                    return prevState < LAST_SLIDE_INDEX
                        ? prevState + MOVE_SLIDE_INDEX
                        : FIRST_SLIDE_INDEX;
                } else if (value === 'prev') {
                    return prevState > FIRST_SLIDE_INDEX
                        ? prevState - MOVE_SLIDE_INDEX
                        : LAST_SLIDE_INDEX;
                }
            });
            setIsFading(false); // 페이드 인 시작
        }, 500); // 페이드 아웃 지속 시간과 동일하게 설정
    };
    const handleImageClick = () => {
        setImageModal(true);
      };
    return (
        <div className={styles.slideContainer}>
            <div
                className={styles.slideShow}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {trainCompartment.length > 0 && (
                    <>
                        <img
                            src={trainCompartment[curSlide]}
                            alt={`Slide ${curSlide}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                opacity: isFading ? 0.3 : 1,
                                transition: 'opacity 500ms ease-in-out',
                                zIndex:'1',
                                cursor: 'pointer',
                        
                            }}
                            onClick={() => goToRedirectionImage(redirectionUrls[curSlide])}
                        />
                        <img
                            src={trainCompartment[nextSlide]}
                            // src={localStorage.getItem("image "+nextSlide)}
                            alt={`Slide ${nextSlide}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                opacity: isFading ? 1 : 0.3,
                                transition: 'opacity 500ms ease-in-out',
                                zIndex:'2',
                            }}
                        />
                    </>
                )}
                
                <div className={styles.slideIndex} onClick={handleImageClick}>
                    <div className={styles.slideIndexText}>
                        <div className ={styles.slideIndexLeftText}>
                            {curSlide+1} 
                        </div>
                        <div className={styles.slideIndexRightText}>
                            / {trainCompartment.length}
                        </div>
                        <img src={add} className={styles.plusImage} ></img>
                    </div>
                </div>
                <ImageModal openImageModal={openImageModal} setImageModal={setImageModal} trainCompartment={trainCompartment} redirectionUrls={redirectionUrls}/>
            </div>
            {isHover && (
                <button
                    className={styles.prevButton}
                    onClick={() => moveToSlide('prev')}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    <img src={arrowLeft} alt="arrowLeft" />
                </button>
            )}
            {isHover && (
                <button
                    className={styles.nextButton}
                    onClick={() => moveToSlide('next')}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    <img src={arrowRight} alt="arrowRight"/>
                </button>
            )}

        </div>
    );
}



function useMainImages() {
    const [imageUrls, setImageUrls] = useState([]);
    const [redirectionUrls , setRedirectionUrls] = useState([]);
    const [images, setImages] = useState([]);
    const BASE_URL = 'http://localhost:8080/api/image/';

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch(`${BASE_URL}main`);
                const jsonData = await response.json();
                const imageUrls = jsonData.map(item => `${BASE_URL}${item.IMAGE_URL}`);
                const redirectionUrls = jsonData.map(item => item.REDIRECTION_URL);
            
                setImageUrls(imageUrls);
                setRedirectionUrls(redirectionUrls);

                const fetchedImages = await Promise.all(imageUrls.map(url => fetchImage(url)));
                setImages(fetchedImages);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
        fetchImages();
    }, []);
    return [images, redirectionUrls];
}

async function fetchImage(imageUrl) {
    const response = await fetch(`${imageUrl}`, {
        method: 'GET',
    });
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
}
const goToRedirectionImage = (url) => {
    window.location.href = url;
    // 또는 history.push(url); // 이 경우, URL이 동일한 도메인 내에 있어야 함
  };


// function ImageModal({ openImageModal, setImageModal, trainCompartment }) {
//     const closeModal = () => setImageModal(false);

    
//     return (
//         <div>
//         {openImageModal && (               
//             <div style={{
//                     position: 'fixed',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     zIndex: 20,
//                 }}// 모달의 배경 스타일
//             onClick={closeModal} // 오버레이 클릭 시 모달 닫기
//             >
//                 <div className={styles.imageModal}>
//                     <div className={styles.imageModalText}>
//                         혜택/공고
//                         <img src ={icClose} alt="ic_close" onClick={closeModal}></img>
//                     </div>
//                     {trainCompartment.map(item =>(
//                         <img src={item} className={styles.modalImage} alt="mainImage"/>
//                     ))
//                     }
                    
//                 </div>

//             </div>
//         )}
//     </div>
//     );
// }
function ImageModal({ openImageModal, setImageModal, trainCompartment , redirectionUrls}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (openImageModal) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300); // 애니메이션 시간 (300ms) 후에 isVisible 상태를 false로 설정
        }
    }, [openImageModal]);

    const closeModal = () => setImageModal(false);

    return (
        <div>
            {isVisible && (               
                <div 
                    className={`${styles.imageModalContainer} ${openImageModal ? styles.fadeIn : ''}`}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 20,
                    }} 
                    onClick={closeModal} // Overlay 클릭 시 모달 닫기
                >
                    <div className={`${styles.imageModal} ${openImageModal ? '' : styles.fadeOut}`} onClick={e => e.stopPropagation()}>
                        <div className={styles.imageModalText}>
                            혜택/공고
                            <img src={icClose} alt="ic_close" onClick={closeModal}></img>
                        </div>

                        {trainCompartment.map((item, index) => (
                            <img key={index} src={item} className={styles.modalImage} alt="mainImage"onClick={() => goToRedirectionImage(redirectionUrls[index])}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}




function SearchDP(){
    const [searchText, setSearchText] = useState('');
    const changeValue = (event) => {
        setSearchText(event.target.value);
    }
    return(
        <div className={styles.searchDPContainer}>
            <div className={styles.slideContainer}>
                <div className={styles.searchContainer}>
                    <img src ={search_ic} alt='search_icon'></img>
                    <form>
                        <input style={{border:'none', marginLeft:'20px', width:'500px', height:'20px',fontSize:'20px'}}
                        type="text" value={searchText} placeholder='채용 공고를 찾아보세요' onChange={changeValue}  ></input>
                    </form>
                </div>

            </div>
            <div className={styles.zResultContainer}>
                {searchText !== '' && 
                        <div className={styles.resultOfSearchContainer}>
                            <DisplaySearchResult searchText={searchText}/>
                        </div>
                    }
            </div>
        </div>
    );
}

function DisplaySearchResult({ searchText }) {
    const [result, setResult] = useState([]); // 초기값을 빈 배열로 설정

    useEffect(() => {
        fetch(`http://localhost:8080/announcement/text?text=${searchText}`)
        .then(response => response.json())
        .then(data => (console.log(data), setResult(data)))
        .catch(error => console.error('Error:', error));
    }, [searchText]);

    if (result.length === 0) {
        return (
            <div style={{ display:'flex', justifyContent:'center'}}>
                <div className={styles.basicResultContainer}>
                    <div className={styles.basicResult}>
                        검색한 기업의 진행 중인 채용 공고가 없어요.
                    </div>
                    <div className={styles.basicResult}>
                        다른 검색어로 찾아보세요.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{display: 'flex'}}>
            {result.map((item) =>(
                <div className={styles.resultContainer} >
                    <div style={{fontWeight:'500', paddingLeft: '20px'}}>
                        {item.companyName}
                    </div>
                    <div style={{color:'#BDBDBD', paddingLeft: '10px'}}>
                        {item.announcementTitle}
                    </div>
                </div>
            ))}
                
        </div>
    );
}



export   {Page, TopBar};