import React from 'react';
import './deleteEvent.css';
import {useMutation} from "@apollo/client";
import GET_ALL_EVENTS from "../queries/GetAllEvents";
import DELETE_EVENT from "../queries/DeleteEvent";
import handleErrors from "../handleErrors/handleErrors";
import Spinner from "./Spinner";

function DeleteEvent(props: any) {

    const deleteEvent = async (event: any) => {
        event.preventDefault();
        const data = await mutateFunction({variables: {eventId: props.eventId}});
        console.log(data)
    };

    const [mutateFunction, {data, loading, error}] = useMutation(DELETE_EVENT, {
        refetchQueries: [GET_ALL_EVENTS]
    });
    if (loading) return <Spinner/>;
    if (error) return handleErrors(error);

    return (
        <div className="delete-event">
            <button onClick={deleteEvent}>DELETE</button>
        </div>
    );
}

export default DeleteEvent;