import { combineReducers } from "redux";
import {users} from './users'



const Reducers = combineReducers({
    usersState : users
})

export default Reducers