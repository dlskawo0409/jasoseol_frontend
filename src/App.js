// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import { Page as Homepage } from './Homepage.js';
import Recruit from './recruit.js';
import ResumeList from './resume_list.js';
import SpecCareerDescription from './spec_career_description.js';
import Datalab from './datalab.js';
import Career from './career.js';
import Success from './Success.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExperienceForm from './ExperienceForm.js';
import {Page as Business} from './Business.js';
import BussinessSignUp from './BusinessSignUp.js';
import NewPassword from './NewPassword.js';
function App() {

    return (
        <>
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/recruit" element={<Recruit />} />
                <Route path="/resume_list" element={<ResumeList />} />
                <Route path="/spec_career_description" element={<SpecCareerDescription />} />
                <Route path="/datalab" element={<Datalab />} />
                <Route path="/career" element={<Career />} />
                <Route path="/success" element={Success} />
                <Route path="/experienceForm" element={<ExperienceForm/>}/>
                <Route path="/business_users/sign_in" element={<Business/>}/>
                <Route path="/business_users/sign_up" element={<BussinessSignUp/>}/>
                <Route path='/business_users/password/new' element={<NewPassword/>}/>
            </Routes>
        </Router>
        </>
    );
}



export default App;