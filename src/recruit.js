import { TopBar } from './Homepage.js';
import styles from './recruit.module.css';
import search_ic from './Image/magnifying_glass.svg';
import arrow_down from './Image/ic_arrow_down_solid.svg';
import start_ic from './Image/ic_star.svg';
import React, { useState , useEffect  } from 'react';

function Page() {
    
    const [chatOpen, setChatOpen] = useState(false);
    // useEffect(()=>{

    // },chatOpen);

    return (
        <div >
        <TopBar selected="채용공고" login={false} chatOpen={chatOpen} setChatOpen={setChatOpen}/>
     
            <div className={styles.mainContainer}>
                <div className={styles.calendarContainer}>
                    <TopSelect/>
                </div>
                {chatOpen &&(
                        <div className={styles.chatContainer}>
                            a
                        </div>
                    )
                }
            </div>
     
        </div>
        
    );
}
function TopSelect(){
    const [text, setText] = useState('');
    const [career, setCareer] = useState('채용형태 선택');
    const [company, setCompany] = useState('기업분류 선택');
    const [job, setJob] = useState('직무 선택');
    const [duration, setDuration] = useState('채용기간 선택')

    return(
        <div className={styles.topContainer}>
        <div className={styles.searchContainer}>
            <img src={search_ic} style={{width:'23px', marginLeft:'15px', marginRight:'10px'}} alt='검색 아이콘'/>

            <div style={{display:'flex', flexDirection:'column' }}>
                <div style={{fontSize:'11px',color:'#999'}}>기업명</div>
                <form>
                    <input id='searchText' className={styles.searchInputBottonText} value={text} onChange={() => setText(text)} placeholder='기업명을 검색하세요.'>
                    </input>
                </form>
            </div>

        </div>

        <div className={styles.selectContainer}>
            <SelectComponent object={career} defaultText ={'채용형태 선택'} topText={'채용형태'}/>
            <div className={styles.line}></div>
            <SelectComponent object={company} defaultText ={'기업분류 선택'} topText={'기업분류'}/>
            <div className={styles.line}></div>
            <SelectComponent object={job} defaultText ={'직무 선택'} topText={'직무'}/>
            <div className={styles.line}></div>
            <SelectComponent object={duration} defaultText ={'채용기간 선택'} topText={'채용기간'}/>
        </div>

        <div style={{display:'flex', justifyContent:'center', alignItems:'center',border:'solid', borderWidth:'1px', borderRadius:'20px', 
                    marginLeft:'20px',width:'97px',height:'40px', borderColor:'#BBB',fontSize:'14px', fontWeight:'400',
                    cursor:'pointer' }}>
            <img src={start_ic} alt='별' style={{width:'16px', height:'16px'}}/>
            즐겨찾기
        </div>
    </div>
    )
}
function ChatModal({login, chatOpen}){
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if(chatOpen){
            setIsVisible(true);
        }
        else{
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [chatOpen])



    if(chatOpen === false){
        return(null);
    }
    if(login === false){
        return(
            <div className={`${styles.chatContainer} ${chatOpen ? styles.modalEnter: styles.modalExit}`}>
                
            </div>
        )
    }
  
}

function SelectComponent({object, defaultText, topText}){
    const [isHover ,setIsHover] = useState(false);

    return(
        <>
            <div className={`${styles.oneSeletct} ${isHover ? (object === defaultText ? styles.gray : styles.blue) : ''}`}
                                onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                        
                                    <div style={{display:'flex', flexDirection:'column', marginLeft: '15px', marginRight:'15px'}}>
                                        <div className={styles.searchInputTopText}>{topText}</div>
                                        <div className={styles.searchInputBottonText}>{object}</div>
                                    </div>
                                    <img src ={arrow_down} alt='아래 화살표' className={styles.arrowDown}/>
                                    
                                </div> 
            
        </>
    )
}



export default Page;
