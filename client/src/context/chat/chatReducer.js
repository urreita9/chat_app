import { GET_USERS, SELECT_CHAT } from '../../types/types';

// const initialState = {
// 	uid: '',
// 	activeChat: null, // uid of user that will recieve my messages
// 	users: [], // all users
// 	messages: [], //selected chat
// };
export const chatReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_USERS:
			return {
				...state,
				users: [...payload],
			};
		case SELECT_CHAT:
			if (state.activeChat === payload) return state;
			return { ...state, activeChat: payload, messages: [] };

		default:
			return state;
	}
};
