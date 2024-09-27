import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const CalendarCom = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);

    };

    return (
        <Calendar onChange={onChange}
            value={date} />
    )
}

export default CalendarCom
