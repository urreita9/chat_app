import React from 'react';

export const SideBarChatItem = () => {
	return (
		<div className='chat_list '>
			{/* active_chat */}

			<div className='chat_people'>
				<div className='chat_img'>
					<img
						src=' https://cdn-icons-png.flaticon.com/512/147/147144.png'
						alt='sunil'
					/>
				</div>
				<div className='chat_ib'>
					<h5>Some random name</h5>
					<span className='text-success'>Online</span>
					<span className='text-danger'>Offline</span>
				</div>
			</div>
		</div>
	);
};
