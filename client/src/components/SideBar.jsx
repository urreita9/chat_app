import React, { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';
import { SideBarChatItem } from './SideBarChatItem';

export const SideBar = () => {
	const { chatState } = useContext(ChatContext);
	const { auth } = useContext(AuthContext);

	return (
		<div className='inbox_chat'>
			{chatState.users
				.filter((user) => user.uid !== auth.uid)
				.map((user) => (
					<SideBarChatItem key={user.uid} user={user} />
				))}
			<div className='extra_space'></div>
		</div>
	);
};
