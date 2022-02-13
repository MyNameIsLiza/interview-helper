import './Topics.css';
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {addTopic, deleteTopic, editTopic} from "./store/actions/topicsAction";

const TopicsContext = createContext({topic: {}});

function Topics() {
    const topics = useSelector((store) => store.topicsReducer.topics);
    const categories = useSelector((store) => store.categoriesReducer.categories);
    const [topic, setTopic] = useState({})

    useEffect(() => {
        console.log('topics', topics);
        setTopic({categoryId:categories?.[0]?.id});
    }, [topics,categories, setTopic])

    return (
        <div className="Topics">
            <TopicsContext.Provider value={{topic, setTopic}}>
                <TopicForm/>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topics.map((item, index) => <TopicTr key={item.id} {...{item, index, category:categories.find((el)=>el.id===item.categoryId)}}/>)}
                    </tbody>
                </table>
            </TopicsContext.Provider>
        </div>
    );
}

function TopicForm() {
    const categories = useSelector((store) => store.categoriesReducer.categories);
    const {topic, setTopic} = useContext(TopicsContext);
    const dispatch = useDispatch();

    const submitForm = useCallback(async (e) => {
        e.preventDefault();
        if (topic.id) {
            dispatch(editTopic(topic));
        } else {
            dispatch(addTopic(topic));
        }
        setTopic({title: '', categoryId: categories[0].id});
        e.target.reset();
    }, [topic, setTopic]);

    return (<form className="TopicForm" onSubmit={submitForm}>
        <input type="text" defaultValue={topic.title}
               onChange={(e) => {
                   setTopic({...topic, title: e.target.value})
               }}/>
        <select value={topic.categoryId} onChange={(e) => {
            console.log(e.target.value)
            setTopic({...topic, categoryId: e.target.value})
        }}>{categories.map((el) => (
            <option key={el.id} value={el.id}>{el.title}</option>))}</select>
        <input type="submit" value={topic.id ? 'Edit' : 'Add'}/>
        <input type="reset" value='Reset' onClick={() => {
            setTopic({title: '', categoryId: categories[0].id});
        }}/>
    </form>);
}

function TopicTr({item, index, category}) {
    const {setTopic} = useContext(TopicsContext);
    const dispatch = useDispatch();

    const deleteTopicClick = useCallback((e) => {
        dispatch(deleteTopic(e.id));
    }, [dispatch])

    return (<tr data-id={item.id}>
        <td>{index + 1}</td>
        <td>{item.title}</td>
        <td>{category.title}</td>
        <td><FontAwesomeIcon icon={faPencilAlt} onClick={() => {
            console.log(item)
            setTopic({...item})
        }}/></td>
        <td><FontAwesomeIcon icon={faTrash} onClick={() => {
            deleteTopicClick({...item})
        }}/></td>
    </tr>);
}

export default Topics;
