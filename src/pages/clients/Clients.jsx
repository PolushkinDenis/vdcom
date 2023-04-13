import React, { useEffect, useState } from "react";
import './Clients.css'
import user_avatar from '../../images/user.png'
import search_img from '../../images/search.png'
import clients_img from '../../images/clients.png'
import calendar_img from '../../images/calendar.png'
import report_img from '../../images/report.png'
import logo from '../../images/LOGO.png'
import logout_img from '../../images/logout.png'
import arrow_next_pagination from '../../images/arrow_next_pagination.png'
import arrow_prev_pagination from '../../images/arrow_prev_pagination.png'
import { useDispatch, useSelector } from "react-redux";
import ContactsList from "../../components/contactsList/ContactsList";
import NewContact from "../../components/newContact/NewContact";
import { useNavigate } from "react-router-dom";
import { authSlice } from "../../store/slices/authSlice";

const Clients = () => {
    const contacts = useSelector(state => state.contactsReducer.contacts)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [sortContacts, setSortContacts] = useState(contacts)
    const login = useSelector(state => state.authReducer)

    const [maxId, setMaxId] = useState("")

    console.log(contacts)

    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)

    const searchByName = (name) => {
        const searchContacts = contacts.filter(contact => contact.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
        setSortContacts(searchContacts)
    }
    const addNewContact = () => {
        setModal(true)
    }

    const logout = () => {
        const userData = {
            login: "",
            password: "",
            auth: false
        }
        dispatch(authSlice.actions.login(userData))
        navigate('/')
    }

    useEffect(() => {
        setSortContacts(contacts)
    }, [contacts])

    useEffect(() => {
        if (login.login === "") {
            navigate('/')
        }
        else {
            let max = contacts.reduce((acc, curr) => acc.id > curr.id ? acc : curr)
            setMaxId(max.id)
            console.log(max.id)
        }
    }, [])

    return (
        <div className="clients">
            <div className="clients__nemu">
                <div>
                    <img className="logo" src={logo} />
                    <div>
                        <div className="menu__clients menu__clients-active">
                            <img src={clients_img} /> <span>Total Contacts</span>
                        </div>
                        <div className="menu__clients">
                            <img src={calendar_img} /> <span>Calendar</span>
                        </div>
                        <div className="menu__clients">
                            <img src={report_img} /> <span>Project Report</span>
                        </div>
                    </div>
                </div>
                <div className="nemu__footer">
                    <hr></hr>
                    <div className="footer__btn">
                        <button onClick={logout}>
                            <img src={logout_img} />
                            <span>Log out</span>
                        </button>
                    </div>
                </div>

            </div>
            <div className="clients__content">
                <div className="content__header">
                    <div className="header__search">
                        <img src={search_img} />
                        <input type="text" onChange={e => searchByName(e.target.value)} placeholder="Search by name" />
                    </div>
                    <div className="header__user">
                        <img src={user_avatar} />
                        <div className="user__info">
                            <p className="user__name">Mr. Director</p>
                            <p className="user__post">Managing Director</p>
                        </div>
                    </div>
                </div>
                <div className="contacts__box">
                    <div className="contacts__header">
                        <h2>Total Contacts</h2>
                        <button onClick={addNewContact}>Add +</button>
                    </div>
                    <div>
                        <ContactsList contacts={sortContacts} />
                    </div>
                </div>
            </div>
            {maxId !== "" && (
                <NewContact
                    visible={isModal}
                    onClose={onClose}
                    maxId={maxId}
                />
            )}

        </div>
    )
}

export default Clients