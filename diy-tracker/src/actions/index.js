import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const FETCHING_USER_START = "FETCHING_USER_START";
export const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS";
export const FETCHING_USER_FAILURE = "FETCHING_USER_FAILURE";

export const POST_PROJECT_SUCCESS = "POST_PROJECT_SUCCESS";
export const EDIT_PROJECT_SUCCESS = "EDIT_PROJECT_SUCCESS";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS"


export const getUserAC = (index) => dispatch => {
    dispatch({ type: FETCHING_USER_START });
    axios
        .get(`BACKEND USER DATABASE`)
        .then(res => {
            dispatch({ type: FETCHING_USER_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FETCHING_USER_FAILURE, payload: err });
        });
};

export const postProjectAC = (index) => dispatch => {
    dispatch({ type: FETCHING_USER_START });
    axiosWithAuth()
        .post(`BACKEND USER DATABASE`)
        .then(res => {
            dispatch({ type: POST_PROJECT_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FETCHING_USER_FAILURE, payload: err });
        });
};

export const editProjectAC = (index) => dispatch => {
    dispatch({ type: FETCHING_USER_START });
    axiosWithAuth()
        .put(`BACKEND USER DATABASE`)
        .then(res => {
            dispatch({ type: EDIT_PROJECT_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FETCHING_USER_FAILURE, payload: err });
        });
};

export const deleteProjectAC = (index) => dispatch => {
    dispatch({ type: FETCHING_USER_START });
    axiosWithAuth()
        .put(`BACKEND USER DATABASE`)
        .then(res => {
            dispatch({ type: DELETE_PROJECT_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FETCHING_USER_FAILURE, payload: err });
        });
};