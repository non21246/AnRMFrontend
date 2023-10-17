import './Main.css';
import { NavLink, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

function Risk() {
  const [studentData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios.get('http://localhost:8080/users')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error);
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Student Risk Level', 10, 10);
    doc.autoTable({
      head: [['No.', 'Student ID', 'Firstname', 'Lastname', 'Major', 'Risk Level']],
      body: studentData.map((student, index) => [
        index + 1,
        student.studentID,
        student.gender + '.' + student.firstname,
        student.lastname,
        student.major,
        student.riskLevel,
      ]),
    });

    doc.save('student_risk_report.pdf');
  };

  const generateCSV = () => {
    const csvData = studentData.map((student, index) => ({
      No: index + 1,
      StudentID: student.studentID,
      Name: student.gender + '.' + student.firstname,
      Lastname: student.lastname,
      Major: student.major,
      RiskLevel: student.riskLevel,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'student_risk_report.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    const exportFormat = window.prompt('Select export format (PDF or CSV):');
    if (exportFormat === 'PDF' || exportFormat === 'pdf') {
      generatePDF();
    } else if (exportFormat === 'CSV' || exportFormat === 'csv') {
      generateCSV();
    } else {
      alert('Invalid export format. Please enter "PDF" or "CSV".');
    }
  };

  return (
    <div className="App">
      <div className="header">
        <NavLink to="/" className='ml-2'>
          <img src="ringht.arrow.png" alt="โลโก้" className="profile" />
        </NavLink>
        <NavLink to="/" className='nav-links'>
          <img src="logo.png" alt="โลโก้" className="logo" />
        </NavLink>
        <img src="add_notes.png" alt="โลโก้" className="nav-icon" onClick={handleExport}/>
        <img src="meme.gif" alt="โลโก้" className="profile" />
      </div>
      <div className="table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Student ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Major</th>
              <th>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/riskinfo/${typeof student.studentID === 'string' ? student.studentID.replace("ITD", "เทคโนโลยีสารสนเทศและนวัตรรมดิจิทัล").replace("DBT", "ธุรกิจดิจิทัล") : student.studentID}`}>{student.studentID}</Link>
                </td>
                <td>{student.gender + '.' + student.firstname}</td>
                <td>{student.lastname}</td>
                <td>{student.major}</td>
                <td>{student.riskLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Risk;
