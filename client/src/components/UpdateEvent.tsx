import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import GET_ALL_EVENTS from "../queries/GetAllEvents";
import './updateEvent.css';
import event from "../assets/event.png";
import UPDATE_EVENT from "../queries/UpdateEvent";
import handleErrors from "../handleErrors/handleErrors";
import Spinner from "./Spinner";

interface createEventData {
    title: string;
    description: string;
    price: number;
    date: string;
    creator: string | null;
}

function UpdateEvent(props: any) {

    const [showModal, setShowModal] = useState(false);
    const [createEventData, setCreateEventData] = useState<createEventData>({
        title: props.title,
        description: props.description,
        price: props.price,
        date: props.date,
        creator: props.creator,
    });

    const onChange = (event: any) => {
        setCreateEventData({...createEventData, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(createEventData)
        const data = await mutateFunction({variables: {eventId: props.eventId, eventInput: createEventData}});
        console.log(data)
        setShowModal(false);
    };

    const [mutateFunction, {data, loading, error}] = useMutation(UPDATE_EVENT, {
        refetchQueries: [GET_ALL_EVENTS]
    });
    if (loading) return <Spinner/>
    if (error) return handleErrors(error);


    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCreateEventData({
            title: '',
            description: '',
            price: 0,
            date: '',
            creator: '',
        });
    };

    return (
        <>
        <div className="update-event">
            <button onClick={handleShowModal}>UPDATE</button>
        </div>

            {showModal && (
                <div className="backshadow">
                    <div className="custom-modal">
                        <img src={event} />
                        <h2>Update Event</h2>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" defaultValue={props.title} name="title" onChange={onChange}/>

                            <label htmlFor="description">Description</label>
                            <textarea id="description" defaultValue={props.description} name="description" onChange={onChange}></textarea>

                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" defaultValue={props.price} name="price" onChange={onChange}/>

                            <label htmlFor="date">Date</label>
                            <input type="datetime-local" id="date"  name="date" onChange={onChange}/>

                            <button type="submit">Update Event</button>
                            <button type="button" onClick={handleCloseModal}>Cancel</button>
                        </form>

                    </div>
                </div>
            )}

        </>
    );
}

export default UpdateEvent;