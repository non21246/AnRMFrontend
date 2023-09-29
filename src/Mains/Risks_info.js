import './Main.css';
import { NavLink } from 'react-router-dom';
import 'jspdf-autotable';

function RiskInfo() {
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
        <img src="profile.png" alt="โลโก้" className="profile" />
      </div>
      <div>
        <p>รหัสนักศึกษา: Mr.Kanok</p>
        <p>ชื่อ: Intaseri</p>
        <p>นามสกุล: ITD</p>
        <p>สาขา: Low</p>
        <p>ระดับความเสี่ยง:</p>
        <div className="risk-level">
          <img src="low.png" alt="Low" />
          <img src="Me.png" alt="Medium" />
          <img src="hig.png" alt="High" />
        </div>
      </div>
    </div>
  );
}

export default RiskInfo;
