import styles from './Business.module.css';
import logo from './Image/logo_landscape.svg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import closeCircle from './Image/ic_close_circle.svg';

function Page() {
    const [login, setLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // 체크박스 상태 추가


    return(
        <div>
            <TopBar selected="" login="" setLogin={setLogin}/>
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <EmailForm  email={email} setEmail ={setEmail}/>
                    <PasswordForm password={password} setPassword={setPassword}/>
                    <StayLogin rememberMe={rememberMe} setRememberMe={setRememberMe}/>
                    <SubmitButton/>
                </div>
            </div>    
        </div>
    )
}


function TopBar({selected, login, setLogin}){
    return(
        
            <nav>
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
                            <MenuIcon login={login} setLogin={setLogin} />
                        </div>
                </div>
            </nav>

        
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
      { text: "홈", to: "/business" },
      { text: "기업 서비스", to: "/business/solution"},
      { text: "자소설 소식", to: "/business/news-letters"},

    ];
  
    return (
      <div>
        {menuItems.map(item => (
          <ChangeColorOnHover
            text={item.text}
            to={item.to}
            clicked={selected === item.text}
          />
        ))}
        <ColorMenu/>
      </div>
    );
  }

  function MenuIcon(){
    const [isHover, setIsHover] = useState(false);
    return(
        <div className = {styles.buttons}>
            <div className={`${styles.loginButton} ${isHover ? styles.loginButton : styles.loginButton}`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                로그인
            </div>

             <div className={`${styles.serviceButton} ${isHover ? styles.serviceButton : styles.serviceButton}`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                           회원가입
             </div>
             <div className={styles.rightBin}/>
   
        </div>
    )
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
function ColorMenu(){
    return(
     
        <Link to={"https://b2b.spartacodingclub.kr/promotion/jasoseol"} className={styles.colorMenu}>
            기업교육해택
        </Link>

    )
}

function EmailForm ({email, setEmail}){

    return(
        <div className={styles.formGroup}>
            <div className={styles.title}>기업 회원 로그인</div>
            <label htmlFor="email" className={styles.label}>아이디(이메일주소)</label>
            <div style={{position: 'relative'}}>
                <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        className={styles.input}
                        placeholder="abcd@jasoseol.com"
                        onChange={(e) => setEmail(e.target.value)}
                
                    />
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

    )
}

function PasswordForm({password, setPassword}){
    return(
        <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>비밀번호</label>
            <div style={{position: 'relative'}}>
                <input type="password" id="password" name="password"  value={password} placeholder="8-16자리 비밀번호 입력" 
                            onChange={(e) => {setPassword(e.target.value)}}
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

            </div>
        </div>
    )
}

function StayLogin({rememberMe, setRememberMe}){
    return(
        <div className={styles.checkboxContainer}>
        <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className={styles.checkbox}
        />
        <label htmlFor="rememberMe" className={styles.checkLabel}>로그인 상태 유지하기</label>
    </div>
    )
}

function SubmitButton(){
    return(
        <button type="submit"className={styles.submitButton} onClick={submitToServer}>기업 계정 로그인</button>
    )
}

async function submitToServer(email,password){
    try{
        const response = await fetch(`http://localhost:8080/api/join/company-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
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

  export   {Page, TopBar};
