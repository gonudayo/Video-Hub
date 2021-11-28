import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {
	
	const videoId = props.match.params.videoId;
	const variable = { videoId: videoId };
	
	const [VideoDetail, setVideoDetail] = useState([]);
	const [CommentLists, setCommentLists] = useState([])
	
	useEffect(() => {
		Axios.post('/api/video/getVideoDetail', variable)
			.then(response => {
			if(response.data.success) {
				setVideoDetail(response.data.videoDetail);
			} else {
				alert('비디오 정보를 가져오는데 실패했습니다.')
			}
		})
		Axios.post('/api/comment/getComments', variable)
			.then(response => {
			if(response.data.success) {
				setCommentLists(response.data.comments);
			} else {
				alert('코멘트 정보를 가져오는 것을 실패했습니다.')
			}
		})
	}, [])
	
	const refreshFunction = (newComment) => {
		setCommentLists(CommentLists.concat(newComment));
	}
	
	if(VideoDetail.writer) {
		
		let SubscribeButton = (localStorage.getItem('userId') === null || VideoDetail.writer._id !== localStorage.getItem('userId')) && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />;
		
		return (
			<Row>
				<Col lg={18} xs={24}>
					<div style={{ width: '100%', padding: '3rem 4rem' }}>
						<video style={{ width: '100%' }} src={`https://localhost-temp.run.goorm.io/${VideoDetail.filePath}`} controls />
						<List.Item
							actions={[ SubscribeButton ]}
						>
							<List.Item.Meta
								avatar={<Avatar src={VideoDetail.writer.image} />}
								title={VideoDetail.writer.name}
								description={VideoDetail.description}
							/>
						</List.Item>
						{/* Comments */}
						<Comment refreshFunction={refreshFunction} CommentLists={CommentLists} videoId={videoId} />
					</div>
				</Col>
				<Col lg={6} xs={24}>
					<SideVideo />
				</Col>
			</Row>
		)
	} else {
		return (
			<div></div>
		)
	}
	
}

export default VideoDetailPage;