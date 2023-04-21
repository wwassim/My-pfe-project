import React from 'react';
import EventTicketCard from './EventTicketCard';

const EventList = ({ event }) => {
  const keys = Object.keys(event);

  return (
    <>
      <h6 className='text-black-600 font-bold text-4xl text-left'>My Events</h6>
      <div className='flex flex-col pt-4'>
        {keys.map((key) => (
          <EventTicketCard key={key} item={event[key]} />
        ))}
      </div>
    </>
  );
};

export default EventList;
