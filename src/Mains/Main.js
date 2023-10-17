import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import './Main.css';
import {NavLink} from "react-router-dom";
// import axios from 'axios';

const localizer = momentLocalizer(moment);

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

function Main() {
    const [events, setEvents] = useState([]);
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', type:'1',place: '1', start: new Date(), end: new Date(), organizer:'', description: ''});
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventDetails, setShowEventDetails] = useState(false);

    useEffect(() => {
        getAllActivity();
    }, []);

    const getAllActivity = () => {
        fetch('http://localhost:8080/act')
        .then(response => response.json())
        .then(data => setEvents(data))
        .catch((error) => {
            console.error(error);
        });
    };

    const closeAddEvent = () => {
        setShowAddEvent(false);
    }

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowEventDetails(true);
      };
    
      const closeEventDetails = () => {
        setShowEventDetails(false);
    };

    const handleAddEvent = () => {
        if (
            newEvent.title === '' ||
            newEvent.type === '' ||
            newEvent.organizer === '' ||
            newEvent.description === ''
        ) {
            alert('โปรดกรอกข้อมูลให้ครบถ้วน');
        } else if(newEvent.end <= newEvent.start){
            alert('โปรดกรอกเวลาให้ถูกต้อง');
        } else {
            fetch('http://localhost:8080/act', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            })
            .then((response) => {
                if (response.ok) {
                    alert('บันทึกสำเร็จ');
                    setEvents([...events, newEvent]);
                    setNewEvent({
                        title: '',
                        type: '',
                        place: '',
                        start: new Date(),
                        end: new Date(),
                        organizer: '',
                        description: '',
                    });
                    setShowAddEvent(false);
                } else {
                    alert('เกิดข้อผิดพลาดในการบันทึก');
                }
            })
            .catch((error) => {
                alert(error);
            });
        }
    }; 

    const handlejoinEvent = () => {
            alert('เข้าร่วมกิจกรรมสำเร็จ');
    }

    return (
        <div>
            <div className="header" >
                <NavLink to='/' className='nav-links'>
                    <img src="logo.png" alt="โลโก้" className="logo" />
                </NavLink>
                <NavLink to='/risk' >
                    <img src="icon_one.png" alt="Risk" className="nav-icon" />
                </NavLink>
                <img src="meme.gif" alt="โปรไฟล์" className="profile" />
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
                            <option value="3">กิจกรรมจิตอาสา</option>
                        </select>
                        <label htmlFor="eventType">ประเภทสถานที่:</label>
                        <select id="eventType" value={newEvent.place} onChange={(e) => setNewEvent({ ...newEvent, place: e.target.value })}>
                            <option value="1">ภายในมหาวิทยาลัย</option>
                            <option value="2">ภายนอกมหาวิทยาลัย</option>
                        </select>
                        <label htmlFor="startDate">วันที่เริ่ม:</label>
                        <input type="datetime-local" id="startDate" value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setNewEvent({ ...newEvent, start: moment(e.target.value).toDate() })} />
                        <label htmlFor="endDate">วันที่สิ้นสุด:</label>
                        <input type="datetime-local" id="endDate" value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setNewEvent({ ...newEvent, end: moment(e.target.value).toDate() })} />
                        <label htmlFor="namemaster">จัดโดย:</label>
                        <textarea id="namemaster" value={newEvent.organizer} onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })} />
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
                            <label id="namemaster">จัดโดย: {selectedEvent.organizer}</label>
                            <label id="description">รายละเอียด: {selectedEvent.description}</label>
                            <div className="modal-buttons">
                                <button onClick={handlejoinEvent}>เข้าร่วมกิจกรรม</button>
                            </div>
                        </form>
                    </div>
                </div>
                )}
        </CalendarContainer>
        </div>
    );
}

export default Main;