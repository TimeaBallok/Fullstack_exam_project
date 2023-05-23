import {useQuery} from '@apollo/client';
import React, {useContext, useState} from 'react';
import GET_ALL_EVENTS from '../queries/GetAllEvents';
import './Events.css';
import CreateEventModal from "../components/CreateEventModal";
import AuthContext from "../context/authContext";
import DeleteEvent from "../components/DeleteEvent";
import UpdateEvent from "../components/UpdateEvent";
import Spinner from "../components/Spinner";
import handleErrors from "../handleErrors/handleErrors";

interface Event {
    _id: string;
    title: string;
    description: string;
    price: number;
    date: string;
    creator: {
        _id: string;
    }
}

interface Data {
    events: Event[];
}

const MyEvents: React.FC = () => {
    const auth = useContext(AuthContext);

    const {loading, error, data} = useQuery<Data>(GET_ALL_EVENTS);
    if (loading) return <Spinner/>
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

    const userId = localStorage.getItem('userId');
    if (!userId) {
        return <div>No user ID found</div>;
    }

    return (
        <React.Fragment>
            <div className="events-header">
                <div>
                    <h1>My Events</h1>
                </div>
                {auth.token && (
                    <div className="events-header-button">
                        <CreateEventModal/>
                    </div>
                )}
            </div>

            <div className="events-list">
                {data?.events?.filter((event) => event.creator._id === String(userId)).map(event => (
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
                        <UpdateEvent eventId={event._id} title={event.title} description={event.description}
                                     date={event.date} price={event.price} creator={event.creator._id} />
                        <DeleteEvent eventId={event._id}/>
                    </div>
                ))}
            </div>

        </React.Fragment>
    );
};

export default MyEvents;

