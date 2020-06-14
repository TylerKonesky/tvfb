import axios from 'axios';
import { FETCH_USER, FETCH_COACHES, FETCH_EVENTS, FETCH_SPONSORS } from './types';

export const fetchUser = () => async dispatch =>{
    const res = await axios.get('/api/current_user')
    dispatch({type: FETCH_USER, payload: res.data})
}

export const fetchCoaches = () => async dispatch =>{
    const res = await axios.get('/api/getCoaches')
    dispatch({type: FETCH_COACHES, payload: res.data})
}

export const fetchEvents = () => async dispatch =>{
    const res = await axios.get('/api/events/getAllEvents')
    dispatch({type: FETCH_EVENTS, payload: res.data})
}

export const fetchSponsors = () => async dispatch =>{
    const res = await axios.get('/api/sponsors/getAllSponsors')
    dispatch({type: FETCH_SPONSORS, payload: res.data})
}