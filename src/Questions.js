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
    const [topic, setTopic] = useState({id:topics?.[0]?.id})
    const [displayQuestions, setDisplayQuestions] = useState(questions.filter((el)=>el.topicId===topic.id))
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('questions', questions);
        setQuestion({title: '', answer: '', topicId: topics?.[0]?.id});
        setDisplayQuestions(questions.filter((el)=>el.topicId===topic.id));
    }, [questions, topics, setQuestion, topic]);

    const deleteQuestionClick = useCallback((e) => {
        dispatch(deleteQuestion(e.id));
    }, [dispatch])

    return (
        <div className="Questions">
            <QuestionsContext.Provider value={{question, setQuestion}}>
                <QuestionForm/>
                <select value={topic.id} onChange={(e) => {
                    setTopic({...topic, id: e.target.value})
                }}>{topics.map((el) => (
                    <option key={el.id} value={el.id}>{el.title}</option>))}</select>
                <div className="cards">
                    {displayQuestions.map((item, index) =>
                        <div className="card" key={item.id}>
                            <div className="card-row">
                                <h3>{index + 1} {item.title}</h3>
                            </div>
                            <div className="card-row"><span>{topics.find((el) => el.id === item.topicId).title}</span>
                            </div>
                            <div className="card-row">
                                <div
                                    dangerouslySetInnerHTML={{__html: htmlDecode(item?.answer)}}/>
                            </div>
                            <div className="card-row">
                                <FontAwesomeIcon icon={faPencilAlt} onClick={() => {
                                    setQuestion({...item})
                                }}/>
                                <FontAwesomeIcon icon={faTrash} onClick={() => {
                                    deleteQuestionClick({...item})
                                }}/>
                            </div>
                        </div>
                    )}

                </div>
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
    input = input.replaceAll('<', '&lt;');
    input = input.replaceAll('>', '&gt;');
    console.log('RESULT', input);
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function QuestionTr({item, index, topic}) {
    const {setQuestion} = useContext(QuestionsContext);
    const dispatch = useDispatch();

    const deleteQuestionClick = useCallback((e) => {
        dispatch(deleteQuestion(e.id));
    }, [dispatch]);

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
