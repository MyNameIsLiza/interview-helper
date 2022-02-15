import './Categories.css';
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {addCategory, deleteCategory, editCategory} from "./store/actions/categoriesAction";

const CategoriesContext = createContext({category: {}});

function Categories() {
    const categories = useSelector((store) => store.categoriesReducer.categories);
    const [category, setCategory] = useState({})

    useEffect(() => {
        console.log('categories', categories);
    }, [categories])

    return (
        <div className="Categories">
            <CategoriesContext.Provider value={{category, setCategory}}>
                <CategoryForm/>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((item, index) => <CategoryTr key={item.id} {...{item, index}}/>)}
                    </tbody>
                </table>
            </CategoriesContext.Provider>
        </div>
    );
}

function CategoryForm() {
    const {category, setCategory} = useContext(CategoriesContext)
    const dispatch = useDispatch();

    const submitForm = useCallback(async (e) => {
        e.preventDefault();
        if (category.id) {
            dispatch(editCategory(category));
        } else {
            dispatch(addCategory(category));
        }
        setCategory({title: ''});
    }, [category, setCategory, dispatch]);

    return (<form className="CategoryForm" onSubmit={submitForm}>
        <input placeholder="Title" type="text" value={category.title}
               onChange={(e) => {
                   setCategory({...category, title: e.target.value})
               }}/>
        <input type="submit" value={category.id ? 'Edit' : 'Add'}/>
        <input type="reset" value='Reset' onClick={() => {
            setCategory({title: ''});
        }}/>
    </form>);
}

function CategoryTr({item, index}) {
    const {setCategory} = useContext(CategoriesContext)
    const dispatch = useDispatch();

    const deleteCategoryClick = useCallback((e) => {
        dispatch(deleteCategory(e.id));
    }, [dispatch])

    return (<tr data-id={item.id}>
        <td>{index + 1}</td>
        <td>{item.title}</td>
        <td><FontAwesomeIcon icon={faPencilAlt} onClick={() => {
            setCategory({...item})
        }}/></td>
        <td><FontAwesomeIcon icon={faTrash} onClick={() => {
            deleteCategoryClick({...item})
        }}/></td>
    </tr>);
}

export default Categories;
