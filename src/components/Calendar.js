import React, {Fragment, useState} from 'react';
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import _ from 'lodash'
import moment from 'moment';
import ja from 'date-fns/locale/ja'
import './style.css'
registerLocale('ja', ja)

const toUtcIso8601str = (momentInstance) => {
  return momentInstance
    .clone()
    .utc()
    .format('YYYY-MM-DDTHH:mm:00Z')
}
const years = _.range(2000, getYear(new Date()) + 1, 1)
const months = Array.from(Array(12).keys())

const Calendar = () => {
  const [startDate, setStartDate] = useState(toUtcIso8601str(moment().subtract(7, 'days')))
  const [endDate, setEndDate] = useState(toUtcIso8601str(moment()))
  const handleChangeStart = (selectedDate) => {
    setStartDate(toUtcIso8601str(moment(selectedDate)))
  }
  const handleChangeEnd = (selectedDate) => {
    setEndDate(toUtcIso8601str(moment(selectedDate)))
  }


  return (
    <div className='main'>
      <Fragment>
        <div className='before-date'>
          <DatePicker
            locale="ja"
            selected={moment(startDate).toDate()}
            selectsStart
            startDate={moment(startDate).toDate()}
            endDate={moment(endDate).toDate()}
            onChange={handleChangeStart}
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled
            }) => (
              <div>
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  前月
                </button>
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
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  次月
                </button>
              </div>
            )}
          />
        </div>
        <div className='space'>
          〜
        </div>
        <div className='after-date'>
          <DatePicker
            locale="ja"
            selected={moment(endDate).toDate()}
            selectsEnd
            startDate={moment(startDate).toDate()}
            endDate={moment(endDate).toDate()}
            onChange={handleChangeEnd}
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled
            }) => (
              <div>
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  前月
                </button>
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
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  次月
                </button>
              </div>
            )}
          />
        </div>
      </Fragment>
    </div>
  )
}

export default Calendar;