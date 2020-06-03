import {combineReducers} from 'redux';
import {reducer as reduxForm } from 'redux-form';
import userReducer from './userReducer';
import coachReducer from './coachReducer';
import scheduleReducer from './scheduleReducer';
import sponsorReducer from './sponsorReducer';

export default combineReducers({
    user: userReducer,
    form: reduxForm,
    coaches: coachReducer,
    schedule: scheduleReducer,
    sponsors: sponsorReducer
})