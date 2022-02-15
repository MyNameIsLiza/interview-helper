import {
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    ADD_CATEGORY_STARTED,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_FAILURE,
    EDIT_CATEGORY_STARTED,
    GET_CATEGORIES_FAILURE,
    GET_CATEGORIES_STARTED,
    GET_CATEGORIES_SUCCESS, DELETE_CATEGORY_STARTED, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE
} from '../actions/types';

const initialState = {
    loading: false,
    categories: [],
    error: null
};

export default function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                categories: [...action.payload]
            };
        case GET_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case ADD_CATEGORY_STARTED:
            return {
                ...state,
                loading: true
            };
        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                categories: [...state.categories, action.payload]
            };
        case ADD_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case EDIT_CATEGORY_STARTED:
            return {
                ...state,
                loading: true
            };
        case EDIT_CATEGORY_SUCCESS:
            const index = state.categories.findIndex((el) => el.id === action.payload.id);
            state.categories[index] = {...state.categories[index], ...action.payload};
            return {
                ...state,
                loading: false,
                error: null,
                categories: [...state.categories]
            };
        case EDIT_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case DELETE_CATEGORY_STARTED:
            return {
                ...state,
                loading: true
            };
        case DELETE_CATEGORY_SUCCESS:
            const index2 = state.categories.findIndex((el) => el.id === action.payload.id);
            const temp = [...state.categories];
            temp.splice(index2, 1);
            return {
                ...state,
                loading: false,
                error: null,
                categories: [...temp]
            };
        case DELETE_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
