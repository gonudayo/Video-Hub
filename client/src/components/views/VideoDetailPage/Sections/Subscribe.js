import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Subscribe(props) {
	
	const [SubscribeNumber, setSubscribeNumber] = useState(0)
	const [Subscribed, setSubscribed] = useState(false)
	
	useEffect(() => {
		let variable = { userTo: props.userTo }
		
		Axios.post('/api/subscribe/subscribeNumber', variable)
			.then(response => {
				if(response.data.success) {
					setSubscribeNumber(response.data.subscribeNumber)
				} else {
					alert('구독자 수 정보를 받아오지 못했습니다.')
				}
		})
		
		let subscribedVariable = { 
			userTo: props.userTo, 
			userFrom: localStorage.getItem('userId') 
		}
		
		Axios.post('/api/subscribe/subscribed', subscribedVariable)
			.then(response => {
			if(response.data.success) {
				setSubscribed(response.data.subscribed)
			} else {
				alert('정보를 받아오지 못했습니다.')
			}
		})
		
	}, [])
	
	const onSubscribe = () => {
		
		let subscribedVariable = {
			userTo: props.userTo,
			userFrom: props.userFrom
		}
		
		if(Subscribed) {
			Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
				.then(response => {
				if(response.data.success) {
					setSubscribed(!Subscribed)
					setSubscribeNumber(SubscribeNumber-1)
				} else {
					alert('구독취소 하는데 실패 했습니다.')
				}
			})
		} else {
			Axios.post('/api/subscribe/subscribe', subscribedVariable)
				.then(response => {
				if(response.data.success) {
					setSubscribed(!Subscribed)
					setSubscribeNumber(SubscribeNumber+1)
				} else {
					alert('구독 하는데 실패 했습니다.')
				}
			})
		}
	}
	
	return (
		<div>
			<button 
				style={{ 
					backgroundColor: `${Subscribed ? '#AAAAAA': '#CC0000'  }`, borderRadius: '4px',
					color: 'white', padding: '10px 16px',
					fontWeight: '500', fontSize: '1rem', 
					textTransform: 'uppercase'
				}}
				onClick={onSubscribe}
			>
				{SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
			</button>
		</div>
	)
}

export default Subscribe