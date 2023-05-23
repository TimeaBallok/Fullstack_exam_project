import {useQuery} from '@apollo/client';
import React, {useContext, useState} from 'react';
import GET_ALL_EVENTS from '../queries/GetAllEvents';
import './events.css';
import AuthContext from "../context/authContext";
import CreateEventModal from "../components/CreateEventModal";
import BookEvent from "../components/BookEvent";
import Spinner from "../components/Spinner";
import handleErrors from "../handleErrors/handleErrors";

interface Event {
    _id: string;
    title: string;
    description: string;
    price: number;
    date: string;
}

interface Data {
    events: Event[];
}

const Events: React.FC = () => {
    const auth = useContext(AuthContext);

    const {loading, error, data} = useQuery<Data>(GET_ALL_EVENTS);
    if (loading) return <Spinner/>;
    if (error) return handleErrors(error);


    const dayFormatter = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
    });

    return (
        <React.Fragment>
            <div className="events-header">
                <div>
                    <h1>Events</h1>
                </div>

                {auth.token && (
                    <div className="events-header-button">
                        <CreateEventModal/>
                    </div>
                )}

            </div>

            <div className="events-list">
                {data?.events?.map(event => (
                    <div key={event._id} className="event-card">
                        <div className="event-date">
                            <div className="event-day">{dayFormatter.format(new Date(event.date))}</div>
                            <div className="event-time">{timeFormatter.format(new Date(event.date))}</div>
                        </div>
                        <div className="event-details">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                        </div>
                        <div className="event-price">{event.price} DKK</div>
                        {auth.token && (
                            <BookEvent eventId={event._id}/>
                        )}
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};

export default Events;
