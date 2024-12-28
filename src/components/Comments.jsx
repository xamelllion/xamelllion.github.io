import React, {useEffect, useState} from "react";
import './comments.css';
import '../data/styles.css'

const CommentSection = (isAuthorized) => {
    console.log('weger')
    console.log(isAuthorized.isAuthorized)

    const [input, setInput] = useState('')
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch('https://site.xmllln.ru/comments', {
            method: 'GET',
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            let arr = []
            data.comments.forEach(comment => {
                arr.push(comment)
            })
            setComments(arr)
        })
    }, [])

    const saveNewComment = (obj) => {
        fetch('https://site.xmllln.ru/comment', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
        }).then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }

    const handleSendClick = () => {
        console.log(input)
        if (input === '') {
            return
        }

        let user = JSON.parse(localStorage.getItem('user'))
        let comment_obj = {
            name: user.name,
            text: input
        }

        setComments([...comments, comment_obj])
        setInput('')
        saveNewComment(comment_obj)
    }

	return (
		<>
            <div className="comment_wrapper">
                <div className="comment_header">Комментарии</div>
                <div style={{display: isAuthorized.isAuthorized ? 'none' : 'block' }} className="comment_about">Чтобы оставить комментарий авторизуйтесь через социальную сеть!</div>
                <div style={{display: isAuthorized.isAuthorized ? 'flex' : 'none' }} className="add_comment">
                    <input maxLength={1024} className="comments_input" type="text" placeholder="Введите текст" value={input} onChange={(e) => {setInput(e.target.value)}}/>
                    <input className="comments_send" type="button" value="Отправить" onClick={handleSendClick} />
                </div>
                <div className="comment_list">
                    {comments.map((item, index) => (
                        <div className="comment_item" key={index.toString()}>
                            <div className="comment_author">
                                {item.name}
                            </div>
                            <div className="comment_text">{item.text}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
	);
};

export default CommentSection;
