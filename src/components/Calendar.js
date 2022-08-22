import React, {useState} from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import _ from 'lodash'
import moment from 'moment';

const toUtcIso8601str = (momentInstance) => {
  return momentInstance
    .clone()
    .utc()
    .format('YYYY-MM-DDTHH:mm:00Z')
}
const years = _.range(2000, getYear(new Date()) + 1, 1)
const months = Array.from(Array(12).keys())

const Calendar = () => {
  const [startDate, setStartDate] = useState(toUtcIso8601str(moment()))
  const handleChange = (selectedDate) => {
    setStartDate(toUtcIso8601str(moment(selectedDate)))
  }


  return (
    <DatePicker
      selected={moment(startDate).toDate()}
      onChange={handleChange}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth
      }) => (
        <div>
          <select
            value={getYear(date)}
            onChange={({ target: {value} }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}年
              </option>
            ))}
          </select>
          <select
            value={getMonth(date)}
            onChange={({ target: { value } }) => changeMonth(value)}
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option + 1}月
              </option>
            ))}
          </select>
        </div>
      )}
    />
  )
}

export default Calendar;