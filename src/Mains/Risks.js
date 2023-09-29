import './Main.css';
import { NavLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Risk() {
  const studentData = [
    { id: 1, studentID: '631104525', firstName: 'Mr.Kanok', lastName: 'Intaseri', major: 'ITD', riskLevel: 'Low' },
    { id: 2, studentID: '641116413', firstName: 'Ms.Praethong', lastName: 'Sungaun', major: 'ITD', riskLevel: 'Medium' },
    { id: 3, studentID: '651117752', firstName: 'Ms.Jun', lastName: 'Jaokha', major: 'ITD', riskLevel: 'High' },   
  ];

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text('Student Risk Level', 10, 10);
    doc.autoTable({
      head: [['No.', 'Student ID', 'Firstname', 'Lastname', 'Major', 'Risk Level']],
      body: studentData.map((student, index) => [
        index + 1,
        student.studentID,
        student.firstName,
        student.lastName,
        student.major,
        student.riskLevel,
      ]),
    });
  
    doc.save('student_risk.pdf');
  };

  return (
    <div className="App">
      <div className="header">
        <NavLink to="/" className='ml-2'>
          <img src="ringht.arrow.png" alt="โลโก้" className="profile" />
        </NavLink>
        <h1>ย้อนกลับ</h1>
        <NavLink to="/" className='nav-links'>
          <img src="logo.png" alt="โลโก้" className="logo" />
        </NavLink>
        <img src="add_notes.png" alt="โลโก้" className="nav-icon" onClick={handleGeneratePDF}/>
        <img src="profile.png" alt="โลโก้" className="profile" />
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
                <td><NavLink to="/riskinfo">{student.studentID}</NavLink></td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
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
