import './App.css';
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Categories from "./Categories";
import {getCategories} from "./store/actions/categoriesAction";
import {useDispatch} from "react-redux";

async function addCategory(category) {
    const response = await axios.post("https://interview-helper-api.herokuapp.com/api/categories/add", {
        "title": category.title
    });
    return response.data;
}

async function getAllCategories() {
    const response = await axios.get("https://interview-helper-api.herokuapp.com/api/categories");
    return response.data;
}

async function getAllTopics() {
    const response = await axios.get("https://interview-helper-api.herokuapp.com/api/topics");
    return response.data;
}

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className="App">
            <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/categories">Categories</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
            </nav>
                <Routes>
                    <Route path='/categories' element={<Categories/>} />
                    <Route path="/topics">

                    </Route>
                    <Route path="/">

                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
