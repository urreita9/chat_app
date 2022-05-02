import {
	GET_USERS,
	LOAD_MESSAGES,
	SELECT_CHAT,
	SET_MESSAGE,
} from '../../types/types';

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

		case SET_MESSAGE:
			if (
				state.activeChat === payload.from ||
				state.activeChat === payload.to
			) {
				return { ...state, messages: [...state.messages, payload] };
			} else {
				return state;
			}
		case LOAD_MESSAGES:
			return { ...state, messages: [...payload] };

		default:
			return state;
	}
};
