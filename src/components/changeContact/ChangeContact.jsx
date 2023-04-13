import React, { useEffect, useState } from "react";
import './ChangeContact.css'
import { useDispatch, useSelector } from "react-redux";
import { contactsSlice } from "../../store/slices/contactsSlice";

const ChangeContact = ({ visible = false, onClose, contact }) => {
    const contacts = useSelector(state => state.contactsReducer.contacts)
    const dispatch = useDispatch()
    const [error, setError] = useState(false)

    const [form, setForm] = useState({
        id: contact?.id || "", name: contact?.name || "", TRN: contact?.TRN || "", year: contact?.year.split('-').reverse().join('-') || "", ARD: contact?.ARD.split('-').reverse().join('-') || "", company: contact?.company || "", email: contact?.email || "", phone: contact?.phone || "", address: contact?.address || ""
    })

    const changeContact = (e) => {
        if (e.target.name === "id" || e.target.name === "TRN" || e.target.name === "company" || e.target.name === "phone") {
            if(e.target.value === "") {
                setForm({ ...form, [e.target.name]: e.target.value })
            }
            if (Number(e.target.value)) {
                setForm({ ...form, [e.target.name]: e.target.value })
            }
        }
        else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }
    }

    const addContact = () => {
        if (form.name !== "" && form.email !== "" && form.ARD !== "" && form.TRN !== "" && form.address !== "" && form.company !== "" && form.phone !== "" && form.year !== "") {
            dispatch(contactsSlice.actions.change(form))
            onClose()
        }
        else {
            setError(true)
        }

    }

    const onKeydown = ({ key }) => {
        switch (key) {
            case 'Escape':
                onClose()
                break
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setError(false)
        }, 2000)
    }, [error])

    useEffect(() => {
        const newContact = { id: contact.id, name: contact.name, TRN: contact.TRN, year: contact.year.split('-').reverse().join('-'), ARD: contact.ARD.split('-').reverse().join('-'), company: contact.company, email: contact.email, phone: contact.phone, address: contact.address }
        setForm(newContact)
    }, [contact])

    useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })


    if (!visible) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-dialog-order" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <span className="modal-close" onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className="modal-body-order">
                    <div className="modal-body_main">Добавление</div>
                    {contact && (
                        <div className="form">
                            <div className="form__item">
                                <span>Id</span>
                                <input name="id" type="text" disabled onChange={e => changeContact(e)} value={form.id} />
                            </div>
                            <div className="form__item">
                                <span>Name</span>
                                <input name="name" type="text" placeholder="" value={form.name} onChange={e => changeContact(e)} />
                            </div>
                            <div className="form__item">
                                <span>TRN</span>
                                <input name="TRN" type="text" placeholder="" value={form.TRN} onChange={e => changeContact(e)} />
                            </div>
                            <div className="form__item">
                                <span>Year end</span>
                                <input name="year" type="date" placeholder="" value={form.year} onChange={e => changeContact(e)} />
                            </div>
                            <div className="form__item">
                                <span>ARD</span>
                                <input name="ARD" type="date" placeholder="" value={form.ARD} onChange={e => changeContact(e)} />
                            </div>
                            <div className="form__item">
                                <span>Company number</span>
                                <input name="company" type="text" placeholder="" value={form.company} onChange={e => changeContact(e)} />
                            </div>
                            <div className="form__item">
                                <span>Email</span>
                                <input name="email" type="email" placeholder="" value={form.email} onChange={e => changeContact(e)} />
                            </div>
                            <div className="form__item">
                                <span>Phone </span>
                                <input name="phone" type="text" placeholder="" value={form.phone} onChange={e => changeContact(e)} />
                            </div>
                            <div className="form__item">
                                <span>Company address</span>
                                <input name="address" type="text" placeholder="" value={form.address} onChange={e => changeContact(e)} />
                            </div>
                            <div className="btn-add"><button onClick={addContact}>Изменить</button></div>
                            <div className="error-box">
                                {error && (
                                    <div className="error">
                                        Заполните все поля
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChangeContact