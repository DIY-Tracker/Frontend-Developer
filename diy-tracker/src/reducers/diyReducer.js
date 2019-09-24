import {
    FETCHING_USER_START,
    FETCHING_USER_SUCCESS,
    FETCHING_USER_FAILURE
} from '../actions';

const initialState = {
    project:{},
    isFetching: false,
    error:""
};

export const diyReducer = (state=initialState, action)=>{
    switch(action.type) {
        default:
            return state;
    }
}