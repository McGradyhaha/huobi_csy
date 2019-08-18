import React from 'react';
import {Launcher} from 'react-chat-window';
import {postMessage} from '../../fetch/Message/message.js'
import {hashHistory} from 'react-router'

class Dialog extends React.Component {
	constructor() {
		super();
		this.state = {
		  messageList: [],
		  isOpen:true,
		  data:[]
		};
	  }
	
	// handle message conversation
	messageHandler(message) {
		/*
		// store input message into message history list
		this.setState({
			messageList: [...this.state.messageList, message]
		})

		// post message to the Endpoint API　（rebot api）
		const result = postMessage(message.data)
		result.then(res => {
			return res.json()
		}).then(json => {
			console.log(json)

			// store coming message into message history list
			this.setState({
				messageList:[...this.state.messageList, {
					author: 'them',
					type: 'text',
					data: { text:json.message}
				}],
				data:json.data

			})
			
		})
		*/
	}
	  
	// more info please check https://www.npmjs.com/package/react-chat-window
	render() {
	return (<div>
		
		<Launcher
		style={{height:100}}
		agentProfile={{
			teamName: 'csy_Robot',
			imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
		}}
		onMessageWasSent={this.messageHandler.bind(this)}
		messageList={this.state.messageList}
		showEmoji
		/>
	</div>)
	}
}

export default Dialog


