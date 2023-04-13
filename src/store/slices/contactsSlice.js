import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    contacts: []
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        initContacts(state, action) {
            state.contacts = action.payload
        },
        add(state, action) {
            state.contacts.push(action.payload)
        },
        delete(state, action) {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload)
        },
        change(state, action) {
            const index = state.contacts.findIndex(contact => contact.id === action.payload.id)
            state.contacts[index] = action.payload
        }
    }
})

export default contactsSlice.reducer
