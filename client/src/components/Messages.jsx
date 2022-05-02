import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { IncomingMsg } from './IncomingMsg';
import { OutGoingMsg } from './OutGoingMsg';
import { SendMessage } from './SendMessage';

export const Messages = () => {
	const { chatState } = useContext(ChatContext);
	const { auth } = useContext(AuthContext);

	return (
		<div className='mesgs'>
			<div className='msg_history'>
				{chatState.messages.map((msg) =>
					msg.to === auth.uid ? (
						<IncomingMsg key={msg._id} msg={msg} />
					) : (
						<OutGoingMsg key={msg._id} msg={msg} />
					)
				)}
			</div>

			<SendMessage />
		</div>
	);
};
