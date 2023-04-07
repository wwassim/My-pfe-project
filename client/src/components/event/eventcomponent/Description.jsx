import React from 'react'
import ReactReadMoreReadLess from "react-read-more-read-less";

const Description = ({description}) => {
  return (
    <div className='h-auto bg-white  rounded-xl mb-2 p-2 max-w-full  w-full text-justify'>
         <ReactReadMoreReadLess
                charLimit={200}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
            >
               {description}
            </ReactReadMoreReadLess>
    </div>
  )
}

export default Description