import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    login: "",
    password: "",
    auth: false
}


// const initialState = {
//     count: 1
// }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            console.log(action)
            state.login = action.payload.login
            state.password = action.payload.password
            state.auth = action.payload.auth
        }
        // addCount(state) {
        //     state.count = 2
        // }
    }
})

export default authSlice.reducer
// export const {} = authSlice.action