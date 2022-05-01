import React from 'react';
import { IncomingMsg } from './IncomingMsg';
import { OutGoingMsg } from './OutGoingMsg';
import { SendMessage } from './SendMessage';

export const Messages = () => {
	const msgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<div className='mesgs'>
			<div className='msg_history'>
				{/* <IncomingMsg />
				<OutGoingMsg /> */}

				{msgs.map((msg) =>
					msg % 2 === 0 ? <IncomingMsg key={msg} /> : <OutGoingMsg key={msg} />
				)}
			</div>

			<SendMessage />
		</div>
	);
};
