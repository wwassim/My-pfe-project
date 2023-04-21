// import React, { useState } from "react";
// import { Datepicker } from "@meinefinsternis/react-horizontal-date-picker";
// import { enUS } from "date-fns/locale";

// const Test = () => {
//   const [date, setDate] = useState<{
//     endValue: Date | null,
//     startValue: Date | null,
//     rangeDates: Date() | null,
//   }>({
//     startValue: null,
//     endValue: null,
//     rangeDates: null,
//   });

//   const handleChange = ({ startValue, endValue, rangeDates }: DatepickerEvent) => {
//     setDate((prev) => ({ ...prev, endValue, startValue, rangeDates }));
//   };

//   return (
//     <Datepicker
//       onChange={handleChange}
//       locale={enUS}
//       startValue={date.startValue}
//       endValue={date.endValue}
//     />
//   );
// };

// export default Test;
