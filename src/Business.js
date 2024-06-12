import styles from './Business.module.css';
import logo from './Image/logo_landscape.svg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Page() {
    const [login, setLogin] = useState(false);
    return(
        <div>
            <TopBar selected="" login="" setLogin={setLogin}/>
        </div>
    )
}

function TopBar(selected, login, setLogin){
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


  export   {Page, TopBar};
