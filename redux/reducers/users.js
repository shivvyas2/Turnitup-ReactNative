const initialState = {
    currentUser : null
}
export const users = ( state = initialState, action) => {
    return {
        ...state,
        currentUser: action.currentUser
    }
}