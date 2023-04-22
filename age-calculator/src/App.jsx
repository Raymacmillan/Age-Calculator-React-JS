import { useState } from 'react'
import './styles/index.css'
import arrow from './assets/images/icon-arrow.svg'
function App() {


  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [difference, setDifference] = useState({ years: "--", months: "--", days: '--' });
  const [formErrors, setFormErrors] = useState({})
  const [isValid, setIsValid] = useState(true)

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleDateSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setIsValid(false)
      setFormErrors(errors)
    } else {
      setIsValid(true)
      setFormErrors({})

      const dateString = `${year}-${month}-${day}`;
      const inputDate = new Date(dateString);
      const currentDate = new Date();
      const differenceInMs = currentDate - inputDate;


      let years = 0;
      let months = 0;
      let days = 0;


      if (differenceInMs > 0) {
        years = currentDate.getFullYear() - inputDate.getFullYear();
        months = currentDate.getMonth() - inputDate.getMonth();
        days = currentDate.getDate() - inputDate.getDate();
        if (months < 0 || (months === 0 && days < 0)) {
          years--;
          months = months + 12;
          if (days < 0) {
            const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            days = days + daysInPreviousMonth;
          }
        }
        if (days < 0) {
          const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0).getDate();
          days = days + daysInPreviousMonth;
          months--;
        }
      }
      setDifference({ years, months, days });
    }
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };


  const validateForm = () => {
    const errors = {}
    const maxDays = daysInMonth(month, year)

    if (day < 1 || day > maxDays) {
      errors.day = 'Must be a valid date'
    }

    if (month < 1 || month > 12) {
      errors.month = 'Must be a valid month'
    }

    if (year < 1900 || year > new Date().getFullYear()) {
      errors.year = 'Must be a valid year'
    }
    return errors
  }



  return (
    <>
      <div className="main-container">
        <div className="date-wrapper">

          <div className="input-wrapper">
            <div className="label">
              <span
                className={formErrors.day && "error-header"}>DAY</span>
              <span
                className={formErrors.month && "error-header"}>MONTH</span>
              <span
                className={formErrors.year && "error-header"}>YEAR</span>
            </div>
            <form className="form" onSubmit={handleDateSubmit}>
              <div>
                <div className="input-control">
                  <input onChange={handleDayChange}
                    value={day}
                    max={daysInMonth(month, year)}
                    type="number"
                    name="day"
                    placeholder="DD"
                    className={formErrors.day && "error"}>

                  </input>

                  {formErrors.day && (<span className="error-message">{formErrors.day}</span>)}
                </div>
                <div className="input-control">
                  <input type="number"
                    name="month"
                    onChange={handleMonthChange}
                    value={month}
                    max="12"
                    placeholder="MM"
                    className={formErrors.month && "error"}
                  ></input>
                  {formErrors.month && (<span className="error-message">{formErrors.month}</span>)}
                </div>
                <div className="input-control">
                  <input type="number"
                    onChange={handleYearChange}
                    value={year}
                    name="year"
                    placeholder="YYYY"
                    className={formErrors.month && "error"}>

                  </input>
                  {formErrors.year && (<span className="error-message">{formErrors.year}</span>)}
                </div>
              </div>


              <div className="btn-wrapper">
                <hr />
                <button aria-label="calculate"
                ><img src={arrow} aria-hidden="true" alt="" /></button>
              </div>
            </form>

          </div>

          {isValid ? (
            <div className="result-wrapper">
              <h1><span>{difference.years}</span> years</h1>
              <h1><span>{difference.months}</span> months</h1>
              <h1><span>{difference.days}</span> days</h1>
            </div>
          ) : <div className="result-wrapper">
            <h1><span>{difference.years}</span> years</h1>
            <h1><span>{difference.months}</span> months</h1>
            <h1><span>{difference.days}</span> days</h1>
          </div>}

        </div>

      </div>

    </>
  )
}

export default App
