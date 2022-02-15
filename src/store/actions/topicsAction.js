import {
    ADD_TOPIC_SUCCESS,
    ADD_TOPIC_FAILURE,
    ADD_TOPIC_STARTED,
    EDIT_TOPIC_SUCCESS,
    EDIT_TOPIC_FAILURE,
    EDIT_TOPIC_STARTED,
    GET_TOPICS_STARTED,
    GET_TOPICS_SUCCESS,
    GET_TOPICS_FAILURE,
    DELETE_TOPIC_SUCCESS,
    DELETE_TOPIC_STARTED,
    DELETE_TOPIC_FAILURE
} from './types';

import axios from 'axios';
import {getQuestions} from "./questionsAction";

export const addTopic = (topic) => {
    return dispatch => {
        dispatch(addTopicStarted());
        axios.post("https://interview-helper-api.herokuapp.com/api/topics/add", topic)
            .then(res => {
                dispatch(addTopicSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(addTopicFailure(err.message));
            });
    };
};

export const editTopic = (topic) => {
    return dispatch => {
        dispatch(editTopicStarted());
        axios.patch("https://interview-helper-api.herokuapp.com/api/topics/edit", topic)
            .then(res => {
                dispatch(editTopicSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(editTopicFailure(err.message));
            });
    };
};

export const deleteTopic = (id) => {
    return dispatch => {
        dispatch(deleteTopicStarted());
        axios.delete(`https://interview-helper-api.herokuapp.com/api/topics/${id}`)
            .then(res => {
                dispatch(deleteTopicSuccess(res.data.result));
                dispatch(getQuestions());
            })
            .catch(err => {
                dispatch(deleteTopicFailure(err.message));
            });
    };
};

export const getTopics = () => {
    return dispatch => {
        dispatch(getTopicsStarted());
        axios.get("https://interview-helper-api.herokuapp.com/api/topics")
            .then(res => {
                dispatch(getTopicsSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(getTopicsFailure(err.message));
            });
    };
};

const addTopicSuccess = topic => ({
    type: ADD_TOPIC_SUCCESS,
    payload: {
        ...topic
    }
});

const addTopicStarted = () => ({
    type: ADD_TOPIC_STARTED
});

const addTopicFailure = error => ({
    type: ADD_TOPIC_FAILURE,
    payload: {
        error
    }
});

const editTopicSuccess = topic => ({
    type: EDIT_TOPIC_SUCCESS,
    payload: {
        ...topic
    }
});

const editTopicStarted = () => ({
    type: EDIT_TOPIC_STARTED
});

const editTopicFailure = error => ({
    type: EDIT_TOPIC_FAILURE,
    payload: {
        error
    }
});

const deleteTopicSuccess = topic => ({
    type: DELETE_TOPIC_SUCCESS,
    payload: {
        ...topic
    }
});

const deleteTopicStarted = () => ({
    type: DELETE_TOPIC_STARTED
});

const deleteTopicFailure = error => ({
    type: DELETE_TOPIC_FAILURE,
    payload: {
        error
    }
});

const getTopicsSuccess = topics => ({
    type: GET_TOPICS_SUCCESS,
    payload: [
        ...topics
    ]
});

const getTopicsStarted = () => ({
    type: GET_TOPICS_STARTED
});

const getTopicsFailure = error => ({
    type: GET_TOPICS_FAILURE,
    payload: {
        error
    }
});
