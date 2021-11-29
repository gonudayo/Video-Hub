import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {
	
	const [Likes, setLikes] = useState(0);
	const [Dislikes, setDislikes] = useState(0);
	const [LikeAction, setLikeAction] = useState(null);
	const [DislikeAction, setDislikeAction] = useState(null);
	
	let variables = {}
	if(props.video) {
		variables = { videoId: props.videoId, userId: props.userId}
	} else {
		variables = { commentId: props.commentId , userId: props.userId}
	}
	
	useEffect(() => {
		Axios.post('/api/like/getLikes', variables)
		.then(response => {
			if(response.data.success) {
				
				// 얼마나 좋아요를 받았는지
				setLikes(response.data.like.length)
				
				// 내가 이미 좋아요를 눌렀는지
				response.data.like.map(like => {
					if(like.userId === props.userId) {
						setLikeAction('liked')
					}
				})
			} else {
				alert('Likes에 정보를 가져오지 못했습니다.')
			}
		})
		
		Axios.post('/api/like/getDislikes', variables)
		.then(response => {
			if(response.data.success) {
				
				// 얼마나 싫어요를 받았는지
				setDislikes(response.data.dislike.length)
				
				// 내가 이미 싫어요를 눌렀는지
				response.data.dislike.map(dislike => {
					if(dislike.userId === props.userId) {
						setDislikeAction('disliked')
					}
				})
			} else {
				alert('Dislikes에 정보를 가져오지 못했습니다.')
			}
		})
	}, [])
	
	return(
		<div>
			<span key="comment-basic-like">
				<Tooltip title="Like">
					<Icon type="like"
						theme={LikeAction === 'liked' ? 'filled' : 'outlined' }
						onClick
						
						/>
				</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto'}}> {Likes} </span>
			</span>
			
			<span key="comment-basic-dislike">
				<Tooltip title="Dislike">
					<Icon type="dislike"
						theme={DislikeAction === 'disliked' ? 'filled' : 'outlined' }
						onClick
						
						/>
				</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto'}}> {Dislikes} </span>
			</span>
		</div>
	)
	
}

export default LikeDislikes