import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import { Page as Homepage } from './Homepage.js';
import Recruit from './recruit.js';
import ResumeList from './resume_list.js';
import SpecCareerDescription from './spec_career_description.js';
import Datalab from './datalab.js';
import Career from './career.js';
import Success from './Success.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

    return (

        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/recruit" element={<Recruit />} />
                <Route path="/resume_list" element={<ResumeList />} />
                <Route path="/spec_career_description" element={<SpecCareerDescription />} />
                <Route path="/datalab" element={<Datalab />} />
                <Route path="/career" element={<Career />} />
                <Route path="/success" element={Success} />
            </Routes>
        </Router>

    );
}



export default App;


