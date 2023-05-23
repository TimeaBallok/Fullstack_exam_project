import React, {useState} from 'react';
import event from "../assets/event.png";

function TestM() {

    // const [showModal, setShowModal] = useState(false);
    // const handleShowModal = () => {
    //     setShowModal(true);
    // };
    //
    // const handleCloseModal = () => {
    //     setShowModal(false);
    // };

    const handleAlert = () => {
        alert("clicked");
    }

    return (
        <div>
            <button className="btn-event" onClick={handleAlert}>click</button>
        </div>
        // <React.Fragment>
        //     <button className="btn-event" onClick={handleShowModal}>click</button>
        //
        //     {showModal && (
        // <div className="backshadow">
        //     <div className="custom-modal">
        //         <img src={event} />
        //         <h2>Create new Event</h2>
        //
        //         <form >
        //             <label htmlFor="title">Title</label>
        //             <input type="text" id="title" name="title" />
        //
        //             <label htmlFor="description">Description</label>
        //             <textarea id="description" name="description" ></textarea>
        //
        //             <label htmlFor="price">Price</label>
        //             <input type="number" id="price" name="price" />
        //
        //             <label htmlFor="date">Date</label>
        //             <input type="datetime-local" id="date" name="date"/>
        //
        //             <button type="submit">Create Event</button>
        //             <button type="button" onClick={handleCloseModal}>Cancel</button>
        //         </form>
        //     </div>
        // </div>
        //     )}
        // </React.Fragment>
    );
}

export default TestM;