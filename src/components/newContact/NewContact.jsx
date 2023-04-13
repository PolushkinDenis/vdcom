import React, { useEffect, useState } from "react";
import './NewContact.css'
import { contactsSlice } from "../../store/slices/contactsSlice";
import { useDispatch, useSelector } from "react-redux";

const NewContact = ({ visible = false, onClose }) => {
    const contacts = useSelector(state => state.contactsReducer.contacts)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        id: '', name: "", TRN: "", year: "", ARD: "", company: "", email: "", phone: "", address: ""
    })

    const changeContact = (e) => {
        if (e.target.name === "id" || e.target.name === "TRN" || e.target.name === "company" || e.target.name === "phone") {
            if (e.target.value === "") {
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
        const check = contacts.filter(contact => contact.id == form.id)
        if (check.length === 0) {
            if (form.name !== "" && form.email !== "" && form.ARD !== "" && form.TRN !== "" && form.address !== "" && form.company !== "" && form.phone !== "" && form.year !== "") {
                const formatForm = { ...form }
                formatForm.year = formatForm.year.split('-').reverse().join('-')
                formatForm.ARD = formatForm.ARD.split('-').reverse().join('-')
                dispatch(contactsSlice.actions.add(formatForm))
                onClose()
            }
        }
        else {
            setError(true)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setError(false)
        }, 2000)
    }, [error])

    const onKeydown = ({ key }) => {
        switch (key) {
            case 'Escape':
                onClose()
                break
        }
    }

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
                    <div className="form">
                        <div className="form__item">
                            <span>Id</span>
                            <input name="id" type="text" onChange={e => changeContact(e)} value={form.id} />
                        </div>
                        <div className="form__item">
                            <span>Name</span>
                            <input name="name" type="text" placeholder="" onChange={e => changeContact(e)} />
                        </div>
                        <div className="form__item">
                            <span>TRN</span>
                            <input name="TRN" type="text" placeholder="" value={form.TRN} onChange={e => changeContact(e)} />
                        </div>
                        <div className="form__item">
                            <span>Year end</span>
                            <input name="year" type="date" placeholder="" onChange={e => changeContact(e)} />
                        </div>
                        <div className="form__item">
                            <span>ARD</span>
                            <input name="ARD" type="date" placeholder="" onChange={e => changeContact(e)} />
                        </div>
                        <div className="form__item">
                            <span>Company number</span>
                            <input name="company" type="text" placeholder="" value={form.company} onChange={e => changeContact(e)} />
                        </div>
                        <div className="form__item">
                            <span>Email</span>
                            <input name="email" type="email" placeholder="" onChange={e => changeContact(e)} />
                        </div>
                        <div className="form__item">
                            <span>Phone </span>
                            <input name="phone" type="text" placeholder="" value={form.phone} onChange={e => changeContact(e)} />
                        </div>
                        <div className="form__item">
                            <span>Company address</span>
                            <input name="address" type="text" placeholder="" onChange={e => changeContact(e)} />
                        </div>

                        <div className="btn-add"><button onClick={addContact}>Добавить</button></div>
                    </div>
                    <div className="error-box">
                        {error && (
                            <div className="error">
                                Контакт с таким id уже существует
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NewContact