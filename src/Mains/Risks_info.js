import './Risks_info.css';
import { NavLink, useParams } from 'react-router-dom';
import 'jspdf-autotable';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RiskInfo(props) {
  const [studentInfo, setStudentInfo] = useState({});
  const { studentID } = useParams();

  useEffect(() => {
    fetchUserData(studentID);
  }, [studentID]);

  const fetchUserData = (studentID) => {
    axios.get(`http://localhost:8080/users/${studentID}`)
      .then((response) => {
        setStudentInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error);
      });
  };

  if (!studentInfo || Object.keys(studentInfo).length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="App">
      <div className="header">
        <NavLink to="/risk" className='ml-2'>
          <img src="ringht.arrow.png" alt="โลโก้" className="profile" />
        </NavLink>
        <NavLink to="/" className='nav-links'>
          <img src="logo.png" alt="โลโก้" className="logo" />
        </NavLink>
        <img src="meme.gif" alt="โลโก้" className="profile" />
      </div>
      <div className="content">
        <div className="student-info">
          <h1>Student Information</h1>
          <p>รหัสนักศึกษา: {studentID}</p>
          <p>ชื่อ: {studentInfo.gender}.{studentInfo.firstname}</p>
          <p>นามสกุล: {studentInfo.lastname}</p>
          <p>สาขา: {studentInfo.major}</p>
          <p>ระดับความเสี่ยง: {studentInfo.riskLevel}</p>
        </div>
        <div className="student-image">
          <img src="Me.png" alt="Me" />
        </div>
      </div>
    </div>
  );
}

export default RiskInfo;
