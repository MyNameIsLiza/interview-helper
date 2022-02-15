import {
    ADD_QUESTION_SUCCESS,
    ADD_QUESTION_FAILURE,
    ADD_QUESTION_STARTED,
    EDIT_QUESTION_SUCCESS,
    EDIT_QUESTION_FAILURE,
    EDIT_QUESTION_STARTED,
    GET_QUESTIONS_FAILURE,
    GET_QUESTIONS_STARTED,
    GET_QUESTIONS_SUCCESS,
    DELETE_QUESTION_STARTED,
    DELETE_QUESTION_SUCCESS,
    DELETE_QUESTION_FAILURE
} from '../actions/types';

const initialState = {
    loading: false,
    questions: [],
    error: null
};

export default function questionsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_QUESTIONS_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                questions: [...action.payload]
            };
        case GET_QUESTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case ADD_QUESTION_STARTED:
            return {
                ...state,
                loading: true
            };
        case ADD_QUESTION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                questions: [...state.questions, action.payload]
            };
        case ADD_QUESTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case EDIT_QUESTION_STARTED:
            return {
                ...state,
                loading: true
            };
        case EDIT_QUESTION_SUCCESS:
            const index = state.questions.findIndex((el) => el.id === action.payload.id);
            state.questions[index] = {...state.questions[index], ...action.payload};
            return {
                ...state,
                loading: false,
                error: null,
                questions: [...state.questions]
            };
        case EDIT_QUESTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case DELETE_QUESTION_STARTED:
            return {
                ...state,
                loading: true
            };
        case DELETE_QUESTION_SUCCESS:
            const index2 = state.questions.findIndex((el) => el.id === action.payload.id);
            const temp = [...state.questions];
            temp.splice(index2, 1);
            return {
                ...state,
                loading: false,
                error: null,
                questions: [...temp]
            };
        case DELETE_QUESTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
