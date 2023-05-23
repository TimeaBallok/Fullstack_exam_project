import React, {useContext} from 'react';
import AuthContext from '../context/authContext';
import {useQuery} from "@apollo/client";
import GET_BOOKINGS from "../queries/GetBookings";
import CancelBooking from "../components/CancelBooking";
import './events.css';
import Spinner from "../components/Spinner";
import handleErrors from "../handleErrors/handleErrors";


interface Booking {
    _id: string;
    event: {
        _id: string;
        title: string;
        description: string;
        price: number;
        date: string;
    },
    user: {
        _id: string;
    }
}

interface Data {
    bookings: Booking[];
}

function BookingsPage() {
    const auth = useContext(AuthContext);

    const {loading, error, data} = useQuery<Data>(GET_BOOKINGS);
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
                    <h1>My bookings</h1>
            </div>
        <div className="events-list">
            { data?.bookings?.filter((booking: Booking) => booking.user._id === String(userId)).map((booking: Booking) => (
                <div key={booking._id} className="event-card">
                    <div className="event-date">
                        <div className="event-day">{dayFormatter.format(new Date(booking.event.date))}</div>
                        <div className="event-time">{timeFormatter.format(new Date(booking.event.date))}</div>
                    </div>
                    <div className="event-details">
                        <h3>{booking.event.title}</h3>
                        <p>{booking.event.description}</p>
                    </div>
                    <div className="event-price">{booking.event.price} DKK</div>
                    <CancelBooking bookingId={booking._id} eventTitle={booking.event.title} />
                </div>
                ))}
        </div>
        </React.Fragment>
    );
}

export default BookingsPage;
