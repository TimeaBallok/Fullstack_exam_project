import React, {useContext, useState} from 'react';
import {useMutation} from '@apollo/client';
import CREATE_EVENT from '../queries/CreateEvent';
import AuthContext from "../context/authContext";
import event from "../assets/event.png";
import GET_ALL_EVENTS from "../queries/GetAllEvents";
import './createEventModal.css'
import handleErrors from "../handleErrors/handleErrors";
import Spinner from "./Spinner";

interface createEventData {
    title: string;
    description: string;
    price: number;
    date: string;
    creator: string | null;
}

const CreateEventModal: React.FC = () => {
    const auth = useContext(AuthContext);


    const [showModal, setShowModal] = useState(false);
    const [createEventData, setCreateEventData] = useState<createEventData>({
        title: '',
        description: '',
        price: 0,
        date: '',
        creator: localStorage.getItem('userId'),

    });

    const onChange = (event: any) => {
        setCreateEventData({...createEventData, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(createEventData)
        const data = await mutateFunction({variables: {eventInput: createEventData}});
        console.log(data)
        setShowModal(false);
    };

    const [mutateFunction, {data, loading, error}] = useMutation(CREATE_EVENT, {
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
        <React.Fragment>
            <button className="btn-event" onClick={handleShowModal}>ADD EVENT</button>

            {showModal && (
                <div className="backshadow">
                    <div className="custom-modal">
                        <img src={event} />
                        <h2>Create new Event</h2>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" onChange={onChange}/>

                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" onChange={onChange}></textarea>

                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" name="price" onChange={onChange}/>

                            <label htmlFor="date">Date</label>
                            <input type="datetime-local" id="date" name="date" onChange={onChange}/>

                            <button type="submit">Create Event</button>
                            <button type="button" onClick={handleCloseModal}>Cancel</button>
                        </form>

                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default CreateEventModal;
