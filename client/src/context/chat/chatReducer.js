import { GET_USERS } from '../../types/types';

export const chatReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_USERS:
			return {
				...state,
				users: [...payload],
			};

		default:
			return state;
	}
};
