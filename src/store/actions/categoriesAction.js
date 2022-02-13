import {
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    ADD_CATEGORY_STARTED,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_FAILURE,
    EDIT_CATEGORY_STARTED,
    GET_CATEGORIES_STARTED,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_STARTED, DELETE_CATEGORY_FAILURE
} from './types';

import axios from 'axios';

export const addCategory = (category) => {
    return dispatch => {
        dispatch(addCategoryStarted());
        axios.post("https://interview-helper-api.herokuapp.com/api/categories/add", category)
            .then(res => {
                dispatch(addCategorySuccess(res.data.result));
            })
            .catch(err => {
                dispatch(addCategoryFailure(err.message));
            });
    };
};

export const editCategory = (category) => {
    return dispatch => {
        dispatch(editCategoryStarted());
        axios.patch("https://interview-helper-api.herokuapp.com/api/categories/edit", category)
            .then(res => {
                dispatch(editCategorySuccess(res.data.result));
            })
            .catch(err => {
                dispatch(editCategoryFailure(err.message));
            });
    };
};

export const deleteCategory = (id) => {
    return dispatch => {
        dispatch(deleteCategoryStarted());
        axios.delete(`https://interview-helper-api.herokuapp.com/api/categories/${id}`)
            .then(res => {
                dispatch(deleteCategorySuccess(res.data.result));
            })
            .catch(err => {
                dispatch(deleteCategoryFailure(err.message));
            });
    };
};

export const getCategories = () => {
    return dispatch => {
        dispatch(getCategoriesStarted());
        axios.get("https://interview-helper-api.herokuapp.com/api/categories")
            .then(res => {
                console.log('RES', res.data.result)
                dispatch(getCategoriesSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(getCategoriesFailure(err.message));
            });
    };
};

const addCategorySuccess = category => ({
    type: ADD_CATEGORY_SUCCESS,
    payload: {
        ...category
    }
});

const addCategoryStarted = () => ({
    type: ADD_CATEGORY_STARTED
});

const addCategoryFailure = error => ({
    type: ADD_CATEGORY_FAILURE,
    payload: {
        error
    }
});

const editCategorySuccess = category => ({
    type: EDIT_CATEGORY_SUCCESS,
    payload: {
        ...category
    }
});

const editCategoryStarted = () => ({
    type: EDIT_CATEGORY_STARTED
});

const editCategoryFailure = error => ({
    type: EDIT_CATEGORY_FAILURE,
    payload: {
        error
    }
});

const deleteCategorySuccess = category => ({
    type: DELETE_CATEGORY_SUCCESS,
    payload: {
        ...category
    }
});

const deleteCategoryStarted = () => ({
    type: DELETE_CATEGORY_STARTED
});

const deleteCategoryFailure = error => ({
    type: DELETE_CATEGORY_FAILURE,
    payload: {
        error
    }
});

const getCategoriesSuccess = categories => ({
    type: GET_CATEGORIES_SUCCESS,
    payload: [
        ...categories
    ]
});

const getCategoriesStarted = () => ({
    type: GET_CATEGORIES_STARTED
});

const getCategoriesFailure = error => ({
    type: GET_CATEGORIES_FAILURE,
    payload: {
        error
    }
});
