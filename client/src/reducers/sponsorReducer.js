import {FETCH_SPONSORS} from '../actions/types';

export default function(state = null, action){
    switch(action.type){
        case FETCH_SPONSORS:
            return action.payload || false;
        default:
            return state; 
    }
}