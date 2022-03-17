import React, {useState} from 'react';
import {FaTrash, FaEdit} from "react-icons/fa";

const Announcement = ({
                          item,
                          editAnnouncement,
                          deleteAnnouncement,
                          edit,
                          setEdit,
                          newTitle,
                          setNewTitle,
                          newDescription,
                          setNewDescription
                      }) => {
    const [showDescription, setShowDescription] = useState(false);
    return (
        <div className="announcement" onClick={() => setShowDescription(!showDescription)}>
            {edit === item.id ? (
                <div className="">
                    <input className="announcement__input" type="text" onChange={(e) => {
                        setNewTitle(e.target.value)
                    }}
                           value={newTitle}/>
                    <input className="announcement__input" type="text"
                           onChange={(e) => setNewDescription(e.target.value)}
                           value={newDescription}/>
                </div>) : (
                <div className="">
                    <div className="announcement__title">{item.title}</div>
                    {showDescription ? (<div
                        className="announcement__description">{item.description}</div>) : (<div
                        className="announcement__description">Click on Card to Show Description</div>)}
                </div>)}
            <div className="announcement__date">{item.date}</div>
            <div className="announcement__btns">
                <button className="announcement__btn" onClick={() => deleteAnnouncement(item.id)}><FaTrash/></button>
                {edit === item.id ? (
                    <button className="announcement__btn" onClick={() => editAnnouncement(item.id)}>Submit</button>) : (
                    <button className="announcement__btn" onClick={() => setEdit(item.id)}><FaEdit/></button>)}
            </div>
        </div>
    )
}

export default Announcement;