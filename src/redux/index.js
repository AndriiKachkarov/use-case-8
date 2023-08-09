const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
};

const SET_USER_DATA = 'SET_USER_DATA';

export const selectUserData = state => state;

export const setUserData = payload => ({
    type: SET_USER_DATA,
    payload,
});

export const reducer = (state = initialState, action) => {
    if (action.type === SET_USER_DATA) {
        return {
            ...state,
            ...action.payload,
        }
    } else {
        return state
    }
}