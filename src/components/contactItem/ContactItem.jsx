import React, { useState } from "react";
import delete_img from '../../images/delete.png'
import change_img from '../../images/change.png'
import './ContactItem.css'
import { useDispatch } from "react-redux";
import { contactsSlice } from "../../store/slices/contactsSlice";

const ContactItem = ({ contact, onClick }) => {
    const dispatch = useDispatch()

    const deleteContact = () => {
        dispatch(contactsSlice.actions.delete(contact.id))
    }

    return (
        <tr>
            <td><input type="checkbox" />{contact.id}</td>
            <td>{contact.name}</td>
            <td>{contact.TRN}</td>
            <td>{contact.year}</td>
            <td>{contact.ARD}</td>
            <td>{contact.company}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
            <td>{contact.address}</td>
            <td className="actions">
                <button id={contact.id} onClick={e => onClick(e)}>
                    <img src={change_img} />
                </button>
                <button onClick={deleteContact}>
                    <img src={delete_img} />
                </button>
            </td>
        </tr>
    )
}


export default ContactItem