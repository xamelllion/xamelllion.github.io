import React from "react";
import './comments.css';

const CommentSection = (props) => {

	return (
		<>
            <div className="comment_wrapper">
                <div className="comment_header">Комментарии</div>
                <div className="add_comment">
                    <input type="text" placeholder="Введите текст"/>
                    <input type="button" value="Отправить" />
                </div>
                <div className="comment_list">
                    <div className="comment_item">
                        <div className="comment_author">
                            <a href="#">Слава Сидоров</a>
                        </div>
                        <div className="comment_text">Ого, какой крутой сайт!</div>
                    </div>
                </div>
            </div>
        </>
	);
};

export default CommentSection;
