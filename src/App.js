import './App.css';
import {useEffect} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Categories from "./Categories";
import {getCategories} from "./store/actions/categoriesAction";
import {useDispatch} from "react-redux";
import {getTopics} from "./store/actions/topicsAction";
import Topics from "./Topics";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
        dispatch(getTopics());
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
                    <Route path='/categories' element={<Categories/>}/>
                    <Route path="/topics" element={<Topics/>}/>
                    <Route path="/">

                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
