import { TopBar } from "./Business.js";
import styles from './NewPassword.module.css'
import React, { useState } from 'react';
import {EmailForm ,SubmitButton} from './Business.js';

function Page(){
    const [login, setLogin] = useState(false);
    const [email, setEmail] = useState('');
    return(
        <div>
            <TopBar selected="" login="" setLogin={setLogin}/>
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                <EmailForm  email={email} setEmail ={setEmail}/>
                <SubmitButton text={'비밀번호 재설정 메일 보내기'}/>
                </div>
            </div>
        </div>
    )
}


export default Page;