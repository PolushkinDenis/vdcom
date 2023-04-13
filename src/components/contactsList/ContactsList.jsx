import React, { useEffect, useState } from "react";
import ContactItem from "../contactItem/ContactItem";
import './ContactsList.css'
import arrow_inc from '../../images/arrow_inc.png'
import arrow_dec from '../../images/arrow_dec.png'
import ChangeContact from "../changeContact/ChangeContact";
import arrow_next_pagination from '../../images/arrow_next_pagination.png'
import arrow_prev_pagination from '../../images/arrow_prev_pagination.png'
import { useSelector } from "react-redux";

const ContactsList = ({ contacts }) => {
    // const contacts = useSelector(state => state.contactsReducer.contacts)

    const [sortContacts, setSortContacts] = useState(contacts)
    const [idForChange, setIdForChange] = useState()
    const [isModal, setModal] = useState(false)
    const [contactForChange, setContactForChange] = useState()
    const onClose = () => setModal(false)

    const sortByAlphavit = (x, y) => {
        return x.name.localeCompare(y.name);
    }

    const sortByName = (e) => {
        console.log(sortContacts)
        let sorting = [...sortContacts].sort(sortByAlphavit);
        console.log(sorting)
        setSortContacts(sorting)
    }

    const compareNumericAscending = (key) => {
        console.log(key)
        return function (a, b) {
            if (a[key] > b[key]) return 1;
            if (a[key] == b[key]) return 0;
            if (a[key] < b[key]) return -1;
        }
    }

    const sortByNumberAscending = (type) => {
        const key = type
        const sorting = [...sortContacts].sort(compareNumericAscending(key));
        console.log(sorting)
        setSortContacts(sorting)
    }

    const compareNumericDescending = (key) => {
        console.log(key)
        return function (a, b) {
            if (a[key] > b[key]) return -1;
            if (a[key] == b[key]) return 0;
            if (a[key] < b[key]) return 1;
        }
    }

    const sortByNumberDescending = (type) => {
        const key = type
        const sorting = [...sortContacts].sort(compareNumericDescending(key));
        console.log(sorting)
        setSortContacts(sorting)
    }

    const compareDateAscending = (key) => {
        return function (a, b) {
            let aa = a[key].split('-').reverse().join()
            let bb = b[key].split('-').reverse().join();
            return aa < bb ? -1 : (aa > bb ? 1 : 0);
        }
    }

    const sortByDateAscending = (type) => {
        const key = type
        const sorting = [...sortContacts].sort(compareDateAscending(key));
        console.log(sorting)
        setSortContacts(sorting)
    }


    const compareDateDescending = (key) => {
        return function (a, b) {
            let aa = a[key].split('-').reverse().join()
            let bb = b[key].split('-').reverse().join();
            return aa > bb ? -1 : (aa == bb ? 0 : 1);
        }
    }

    const sortByDateDescending = (type) => {
        const key = type
        const sorting = [...sortContacts].sort(compareDateDescending(key));
        console.log(sorting)
        setSortContacts(sorting)
    }

    const changeClient = (id) => {
        // console.log(id)
        let currentContact = contacts.filter(contact => contact.id === id)[0]
        console.log(currentContact)
        setContactForChange(currentContact)
        setIdForChange(id)
        setModal(true)
    }

    useEffect(() => {
        setSortContacts(contacts)
    }, [contacts])


    const [pages, setPages] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [contactPagination, setContactPagination] = useState([])

    const paginate = (e) => {
        const start = (Number(e.currentTarget.id) - 1) * 9
        const end = Number(e.currentTarget.id) * 9
        setContactPagination(contacts.slice(start, end))
        setActivePage(Number(e.currentTarget.id))
    }

    const paginatePrevPage = () => {
        if (activePage > 1) {
            const start = ((activePage - 1) - 1) * 9
            const end = (activePage - 1) * 9
            setContactPagination(contacts.slice(start, end))
            setActivePage(activePage - 1)
        }
    }
    const paginateNextPage = () => {
        if (activePage < pages.length) {
            const start = ((activePage + 1) - 1) * 9
            const end = (activePage + 1) * 9
            setContactPagination(contacts.slice(start, end))
            setActivePage(activePage + 1)
            window.scrollTo(0, 100);
        }
    }

    useEffect(() => {
        const pagesCount = Math.ceil(sortContacts.length / 9)
        let pagesArr = []
        for (let i = 1; i <= pagesCount; i++) {
            pagesArr.push(i)
        }
        setPages(pagesArr)
        setActivePage(1)
        setContactPagination(sortContacts.slice(0, 9))
    }, [sortContacts, contacts])

    console.log(contacts)
    console.log(sortContacts)
    console.log(contactPagination)

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" />Client ID</th>
                        <th><div className="table__header">Client name <div className="buttons"><button onClick={e => sortByName("name")} className="sort_btn"><img src={arrow_inc} /></button> <button className="sort_btn"><img src={arrow_dec} /></button></div></div></th>
                        <th><div className="table__header">TRN <div className="buttons"><button onClick={e => sortByNumberAscending("TRN")} className="sort_btn"><img src={arrow_inc} /></button> <button onClick={e => sortByNumberDescending("TRN")} className="sort_btn"><img src={arrow_dec} /></button></div></div></th>
                        <th><div className="table__header">Year end <div className="buttons"><button onClick={e => sortByDateAscending("year")} className="sort_btn"><img src={arrow_inc} /></button> <button onClick={e => sortByDateDescending("year")} className="sort_btn"><img src={arrow_dec} /></button></div></div></th>
                        <th><div className="table__header">ARD <div className="buttons"><button onClick={e => sortByDateAscending("ARD")} className="sort_btn"><img src={arrow_inc} /></button> <button onClick={e => sortByDateDescending("ARD")} className="sort_btn"><img src={arrow_dec} /></button></div></div></th>
                        <th><div className="table__header">Company number <div className="buttons"><button onClick={e => sortByNumberAscending("company")} className="sort_btn"><img src={arrow_inc} /></button> <button onClick={e => sortByNumberDescending("company")} className="sort_btn"><img src={arrow_dec} /></button></div></div></th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Company address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contactPagination.length > 0 && contactPagination.map((contact) => (
                        <ContactItem contact={contact} key={contact.id} onClick={e => changeClient(contact.id)} />
                    ))}
                </tbody>
            </table>
            <div>
                <div className="pages">
                    {contactPagination.length > 0 && (
                        <button className="prev__pagination pagination" onClick={paginatePrevPage}><img src={arrow_prev_pagination} /></button>
                    )}
                    {pages.map((page) => (
                        <button disabled={activePage == page ? true : false} className={activePage == page ? 'pagination-btn page__active' : 'pagination-btn page'} id={page.toString()} onClick={e => paginate(e)} key={page}>{page}</button>
                    ))}
                    {contactPagination.length > 0 &&
                        <button className="next__pagination pagination" onClick={paginateNextPage}><img src={arrow_next_pagination} /></button>
                    }
                </div>
            </div>
            {contactForChange && (
                < ChangeContact
                    contact={contactForChange}
                    visible={isModal}
                    onClose={onClose}
                />
            )}

        </>
    )
}


export default ContactsList