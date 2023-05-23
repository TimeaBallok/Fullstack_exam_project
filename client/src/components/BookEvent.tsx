import React from 'react';
import {useMutation} from "@apollo/client";
import BOOK_EVENT from "../queries/BookEvent";
import './bookEvent.css';
import GET_BOOKINGS from "../queries/GetBookings";
import Spinner from "./Spinner";
import handleErrors from "../handleErrors/handleErrors";

function BookEvent(props: any) {

    const bookEvent = async (event: any) => {
        event.preventDefault();
        const data = await mutateFunction({variables: {bookingInput: {event: props.eventId, user: localStorage.getItem('userId')}}});
        console.log(data)
    };

    const [mutateFunction, {data, loading, error}] = useMutation(BOOK_EVENT, {
        refetchQueries: [GET_BOOKINGS]
    });
    if (loading) return <Spinner/>;
    if (error) return handleErrors(error);

    return (
        <div className="book-event">
            <button onClick={bookEvent}>BOOK</button>
        </div>
    );
}

export default BookEvent;