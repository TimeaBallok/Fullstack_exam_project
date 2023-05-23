import React, {useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import CANCEL_BOOKING from "../queries/CancelBooking";
import GET_BOOKINGS from "../queries/GetBookings";
import './cancelBooking.css';
import Spinner from "./Spinner";
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


function CancelBooking(props: any) {
    const [message, setMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const cancelBooking = async (event: any) => {
        event.preventDefault();
        try {
            const data = await mutateFunction({variables: {bookingId: props.bookingId}});
            console.log(data)
            setMessage(`The event ${props.eventTitle} has been cancelled.`);
            setIsModalOpen(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setMessage(null);
            }, 3000);
        }
        catch (error) {
            console.log(error)
            setMessage(`The event ${props.eventTitle} could not be cancelled.`);
            setIsModalOpen(true);
        }

    };

    const {loading: queryLoading, error: queryError, data, refetch} = useQuery<Data>(GET_BOOKINGS);
    if (queryLoading) return <Spinner/>;
    if (queryError) return handleErrors(queryError);

    const [mutateFunction] = useMutation(CANCEL_BOOKING, {
        onCompleted: () => {
            setTimeout(() => {
                refetch();
            }, 3000);
        }
    });


    return (
        <div className="delete-event">
            <button onClick={cancelBooking}>CANCEL</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p> {message && <div>{message}</div>}</p>
                    </div>
                </div>
            )}
        </div>

    );
}

export default CancelBooking;