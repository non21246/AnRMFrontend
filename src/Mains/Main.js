import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import './Main.css';
import {NavLink} from "react-router-dom";

const localizer = momentLocalizer(moment);

const initialEvents = [
    {
        title: 'แข่ง Capture the flag of security',
        type:'กิจกรรมภายนอก',
        start: new Date(2023, 9, 1, 9, 0),
        end: new Date(2023, 9, 1, 16, 0), 
        organizers:'Huawei',
        description: 'แข่งที่ G-Tower'
    },
    {
        title: 'งานสัมมนา เรื่อง IT',
        type:'งานสัมมนา',
        start: new Date(2023, 9, 5, 14, 0),
        end: new Date(2023, 9, 5, 15, 30),
        organizers:'อาจารย์สุรศักดิ์ เรืองแสง',
        description: 'งานสัมมนา เรื่อง IT จัดที่ห้อง 2102'
    },
];

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 640px;
  position: relative;
`;

const StyledCalendar = styled(Calendar)`
  margin: 10px;
`;

const AddEventButton = styled.button`
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 2;
`;

function App() {
    const [events, setEvents] = useState(initialEvents);
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', type:'', start: new Date(), end: new Date(), organizers:'', description: ''});
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventDetails, setShowEventDetails] = useState(false);

    const closeAddEvent = () => {
        setShowAddEvent(false);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowEventDetails(true);
      };
    
      const closeEventDetails = () => {
        setShowEventDetails(false);
    };

    const handleAddEvent = () => {
        // ตรวจสอบว่าทุกช่องมีค่าหรือไม่
        if (
            newEvent.title === '' ||
            newEvent.type === '' ||
            newEvent.organizers === '' ||
            newEvent.description === ''
        ) {
            alert('โปรดกรอกข้อมูลให้ครบถ้วน');
        } else {
            // ถ้าทุกช่องถูกกรอกครบถ้วนให้เพิ่มกิจกรรม
            setEvents([...events, newEvent]);
            setNewEvent({
                title: '',
                type: '',
                start: new Date(),
                end: new Date(),
                organizers: '',
                description: '',
            });
            setShowAddEvent(false);
        }
    };
    
      

    return (
        <div>
            <div className="header" >
                <NavLink to='/' className='nav-links'>
                    <img src="logo.png" alt="โลโก้" className="logo" />
                </NavLink>
                <NavLink to='/risk' >
                    <img src="icon_one.png" alt="Risk" className="nav-icon" />
                </NavLink>
                <img src="profile.png" alt="โปรไฟล์" className="profile" />
            </div>
        <CalendarContainer>
            <StyledCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleEventClick}
            />
            <AddEventButton onClick={() => setShowAddEvent(true)}>
                <img className="add-event-button" src="plus.png" alt="Widget" />
            </AddEventButton>
            {showAddEvent && (
                <div className="modal">
                <div className="modal-content">
                <span className="close" onClick={closeAddEvent}>&times;</span>
                <h2>เพิ่มกิจกรรม</h2>
                    <form>
                        <label htmlFor="eventName">ชื่อกิจกรรม:</label>
                        <input type="text" id="eventName" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                        <label htmlFor="eventType">ประเภทกิจกรรม:</label>
                        <select id="eventType" value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}>
                            <option value="1">กิจกรรมมหาลัย</option>
                            <option value="2">งานสัมมนา</option>
                            <option value="3">กิจกรรมภายนอก</option>
                        </select>
                        <label htmlFor="startDate">วันที่เริ่ม:</label>
                        <input type="datetime-local" id="startDate" value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setNewEvent({ ...newEvent, start: moment(e.target.value).toDate() })} />
                        <label htmlFor="endDate">วันที่สิ้นสุด:</label>
                        <input type="datetime-local" id="endDate" value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setNewEvent({ ...newEvent, end: moment(e.target.value).toDate() })} />
                        <label htmlFor="namemaster">จัดโดย:</label>
                        <textarea id="namemaster" value={newEvent.organizers} onChange={(e) => setNewEvent({ ...newEvent, organizers: e.target.value })} />
                        <label htmlFor="description">รายละเอียด:</label>
                        <textarea id="description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
                        <div className="modal-buttons">
                            <button onClick={handleAddEvent}>บันทึก</button>
                            <button onClick={closeAddEvent}>ยกเลิก</button>
                        </div>
                    </form>
                </div>
                </div>
                )}
            
            {showEventDetails && selectedEvent && (
                <div className="modal">
                    <div className="modal-content">
                    <span className="close" onClick={closeEventDetails}>&times;</span>
                    <h2>รายละเอียดกิจกรรม</h2>
                        <form>
                            <label className='eventName'>ชื่อ: {selectedEvent.title}</label>
                            <label htmlFor="eventType">ประเภท: {selectedEvent.type === '1' ? 'กิจกรรมมหาลัย' : selectedEvent.type === '2' ? 'งานสัมมนา' : 'กิจกรรมภายนอก'}</label>
                            <label htmlFor="startDate">วันที่เริ่ม: {moment(selectedEvent.start).format('YYYY-MM-DD HH:mm')}</label>
                            <label htmlFor="endDate">วันที่สิ้นสุด: {moment(selectedEvent.end).format('YYYY-MM-DD HH:mm')}</label>
                            <label id="namemaster">จัดโดย: {selectedEvent.organizers}</label>
                            <label id="description">รายละเอียด: {selectedEvent.description}</label>
                        </form>
                    </div>
                </div>
                )}
        </CalendarContainer>
        </div>
    );
}

export default App;