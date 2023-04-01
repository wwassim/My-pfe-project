// import React, { useState, useEffect } from 'react';
// import './style.css';
// import moment from 'moment';
// import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

// export default function App() {
//   const [value, onChange] = useState([new Date(), new Date()]);
//   const [error, setError] = useState('');
//   const handleOnChange = (newValue) => {
//     const [startDate, endDate] = newValue;
//     if (startDate > endDate) {
//       setError('End date must be after start date');
//     } else {
//       setError('');
//       onChange(newValue);
//     }
//   };
//   const closeCalender = () => {
//     debugger;
//     console.log(
//       'StartDate:' +
//         moment(value[0]).format('MMMM Do YYYY, hh:mm:ss A') +
//         '           EndDate:' +
//         moment(value[1]).format('MMMM Do YYYY, hh:mm:ss A')
//     );
//   };

//   return (
//     <div>
//       <div>
//         <p>REACT-DATE TIME RANGE-PICKER</p>
//         <DateTimeRangePicker
//           onChange={handleOnChange}
//           value={value}
//           disableClock={true}
//           disableCalendar={false}
//           format={'d-MM-yyyy HH:mm'}
//           minDate={new Date()}
//           onCalendarClose={closeCalender}
//         />
//         {error && <p>{error}</p>}
//       </div>
//     </div>
//   );
// }
