import {
    ADD_QUESTION_SUCCESS,
    ADD_QUESTION_FAILURE,
    ADD_QUESTION_STARTED,
    EDIT_QUESTION_SUCCESS,
    EDIT_QUESTION_FAILURE,
    EDIT_QUESTION_STARTED,
    GET_QUESTIONS_STARTED,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAILURE,
    DELETE_QUESTION_SUCCESS,
    DELETE_QUESTION_STARTED,
    DELETE_QUESTION_FAILURE
} from './types';

import axios from 'axios';

export const addQuestion = (question) => {
    return dispatch => {
        dispatch(addQuestionStarted());
        axios.post("https://interview-helper-api.herokuapp.com/api/questions/add", question)
            .then(res => {
                dispatch(addQuestionSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(addQuestionFailure(err.message));
            });
    };
};

export const editQuestion = (question) => {
    return dispatch => {
        dispatch(editQuestionStarted());
        axios.patch("https://interview-helper-api.herokuapp.com/api/questions/edit", question)
            .then(res => {
                dispatch(editQuestionSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(editQuestionFailure(err.message));
            });
    };
};

export const deleteQuestion = (id) => {
    return dispatch => {
        dispatch(deleteQuestionStarted());
        axios.delete(`https://interview-helper-api.herokuapp.com/api/questions/${id}`)
            .then(res => {
                dispatch(deleteQuestionSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(deleteQuestionFailure(err.message));
            });
    };
};

export const getQuestions = () => {
    return dispatch => {
        dispatch(getQuestionsStarted());
        axios.get("https://interview-helper-api.herokuapp.com/api/questions")
            .then(res => {
                dispatch(getQuestionsSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(getQuestionsFailure(err.message));
            });
    };
};

const addQuestionSuccess = question => ({
    type: ADD_QUESTION_SUCCESS,
    payload: {
        ...question
    }
});

const addQuestionStarted = () => ({
    type: ADD_QUESTION_STARTED
});

const addQuestionFailure = error => ({
    type: ADD_QUESTION_FAILURE,
    payload: {
        error
    }
});

const editQuestionSuccess = question => ({
    type: EDIT_QUESTION_SUCCESS,
    payload: {
        ...question
    }
});

const editQuestionStarted = () => ({
    type: EDIT_QUESTION_STARTED
});

const editQuestionFailure = error => ({
    type: EDIT_QUESTION_FAILURE,
    payload: {
        error
    }
});

const deleteQuestionSuccess = question => ({
    type: DELETE_QUESTION_SUCCESS,
    payload: {
        ...question
    }
});

const deleteQuestionStarted = () => ({
    type: DELETE_QUESTION_STARTED
});

const deleteQuestionFailure = error => ({
    type: DELETE_QUESTION_FAILURE,
    payload: {
        error
    }
});

const getQuestionsSuccess = questions => ({
    type: GET_QUESTIONS_SUCCESS,
    payload: [
        ...questions
    ]
});

const getQuestionsStarted = () => ({
    type: GET_QUESTIONS_STARTED
});

const getQuestionsFailure = error => ({
    type: GET_QUESTIONS_FAILURE,
    payload: {
        error
    }
});
