import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';

const { TextArea } = Input;

function SingleComment(props) {
	const user = useSelector(state => state.user);
	const [OpenReply, setOpenReply] = useState(false)
	const [CommentValue, setCommentValue] = useState("")
	
	const onClickReplyOpen = () => {
		setOpenReply(!OpenReply)
	}
	const onHandleChange = (event) => {
		setCommentValue(event.currentTarget.value)
	}
	const onSubmit = (event) => {
		event.preventDefault();
		
		const variables = {
			content: CommentValue,
			writer: user.userData._id,
			videoId: props.videoId,
			responseTo: props.comment._id
		}
		
		Axios.post('/api/comment/saveComment', variables)
			.then(response => {
			if(response.data.success) {
				setCommentValue("")
				setOpenReply(false)
				props.refreshFunction(response.data.result)
			} else {
				alert('코멘트를 저장하지 못했습니다.')
			}
		})
	}
	
	const actions = [
		<LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} />
		,<span onClick={onClickReplyOpen} key="cmment-basic-reply-to">Reply to</span>
	]
	
	return (
		<div>
			<Comment 
				actions={actions}
				author={props.comment.writer.name}
				avatar={<Avatar src={props.comment.writer.image} alt="image" />}
				content={<p> {props.comment.content}</p>}
			/>
			{OpenReply &&
				<form style={{ display: 'flex', marginLeft: '40px' }} onSubmit={onSubmit} >
					<TextArea 
						autoSize={{ minRows: 2, maxRows: 6 }}
						style={{ width: '100%', borderRadius: '5px' }}
						onChange={onHandleChange}
						value={CommentValue}
						placeholder="코멘트를 작성해 주세요"
					/>
					<br />
					<Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
				</form>
			}
		</div>
	)
}

export default SingleComment