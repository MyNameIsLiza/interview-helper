import './Questions.css';
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {addQuestion, deleteQuestion, editQuestion} from "./store/actions/questionsAction";

const QuestionsContext = createContext({});

function Questions() {
    const questions = useSelector((store) => store.questionsReducer.questions);
    const topics = useSelector((store) => store.topicsReducer.topics);
    const [question, setQuestion] = useState({title: '', answer: ''})

    useEffect(() => {
        console.log('questions', questions);
        setQuestion({title: '', answer: ''});
    }, [questions, topics, setQuestion])

    return (
        <div className="Questions">
            <QuestionsContext.Provider value={{question, setQuestion}}>
                <QuestionForm/>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Topic</th>
                        <th>Answer</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions.map((item, index) => <QuestionTr key={item.id} {...{
                        item,
                        index,
                        topic: topics.find((el) => el.id === item.topicId)
                    }}/>)}
                    </tbody>
                </table>
            </QuestionsContext.Provider>
        </div>
    );
}

function QuestionForm() {
    const topics = useSelector((store) => store.topicsReducer.topics);
    const {question, setQuestion} = useContext(QuestionsContext);
    const dispatch = useDispatch();

    const submitForm = useCallback(async (e) => {
        e.preventDefault();
        if (question.id) {
            dispatch(editQuestion(question));
        } else {
            dispatch(addQuestion(question));
        }
        setQuestion({title: '', topicId: topics[0].id, answer: ''});
    }, [question, setQuestion, topics, dispatch]);

    return (<form className="QuestionForm" onSubmit={submitForm}>
        <input placeholder="Title" type="text" value={question.title}
               onChange={(e) => {
                   setQuestion({...question, title: e.target.value})
               }}/>
        <select value={question.topicId} onChange={(e) => {
            setQuestion({...question, topicId: e.target.value})
        }}>{topics.map((el) => (
            <option key={el.id} value={el.id}>{el.title}</option>))}</select>

        <textarea placeholder="Answer" onChange={(e) => {
            setQuestion({...question, answer: e.target.value})
        }} value={question?.answer}/>
        <div dangerouslySetInnerHTML={{__html: htmlDecode(question?.answer)}}/>

        <input type="submit" value={question.id ? 'Edit' : 'Add'}/>
        <input type="reset" value='Reset' onClick={() => {
            setQuestion({title: '', topicId: topics[0].id, answer: ''});
        }}/>
    </form>);
}

function htmlDecode(input = '') {
    const e = document.createElement('div');
    input = input.replace('<', '&lt;');
    input = input.replace('>', '&gt;');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function QuestionTr({item, index, topic}) {
    const {setQuestion} = useContext(QuestionsContext);
    const dispatch = useDispatch();

    const deleteQuestionClick = useCallback((e) => {
        dispatch(deleteQuestion(e.id));
    }, [dispatch])

    return (<tr data-id={item.id}>
        <td>{index + 1}</td>
        <td>{item.title}</td>
        <td>{topic.title}</td>
        <td dangerouslySetInnerHTML={{__html: htmlDecode(item?.answer)}}/>
        <td><FontAwesomeIcon icon={faPencilAlt} onClick={() => {
            setQuestion({...item})
        }}/></td>
        <td><FontAwesomeIcon icon={faTrash} onClick={() => {
            deleteQuestionClick({...item})
        }}/></td>
    </tr>);
}

export default Questions;
