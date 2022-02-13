import {
    ADD_TOPIC_SUCCESS,
    ADD_TOPIC_FAILURE,
    ADD_TOPIC_STARTED,
    EDIT_TOPIC_SUCCESS,
    EDIT_TOPIC_FAILURE,
    EDIT_TOPIC_STARTED,
    GET_TOPICS_FAILURE,
    GET_TOPICS_STARTED,
    GET_TOPICS_SUCCESS,
    DELETE_TOPIC_STARTED,
    DELETE_TOPIC_SUCCESS,
    DELETE_TOPIC_FAILURE
} from '../actions/types';

const initialState = {
    loading: false,
    topics: [],
    error: null
};

export default function topicsReducer(state = initialState, action) {
    console.log('action.payload', action.payload);
    switch (action.type) {
        case GET_TOPICS_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_TOPICS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                topics: [...action.payload]
            };
        case GET_TOPICS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case ADD_TOPIC_STARTED:
            return {
                ...state,
                loading: true
            };
        case ADD_TOPIC_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                topics: [...state.topics, action.payload]
            };
        case ADD_TOPIC_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case EDIT_TOPIC_STARTED:
            return {
                ...state,
                loading: true
            };
        case EDIT_TOPIC_SUCCESS:
            const index = state.topics.findIndex((el) => el.id === action.payload.id);
            state.topics[index] = {...state.topics[index], ...action.payload};
            return {
                ...state,
                loading: false,
                error: null,
                topics: [...state.topics]
            };
        case EDIT_TOPIC_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case DELETE_TOPIC_STARTED:
            return {
                ...state,
                loading: true
            };
        case DELETE_TOPIC_SUCCESS:
            const index2 = state.topics.findIndex((el) => el.id === action.payload.id);
            const temp = [...state.topics];
            temp.splice(index2, 1);
            return {
                ...state,
                loading: false,
                error: null,
                topics: [...temp]
            };
        case DELETE_TOPIC_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
