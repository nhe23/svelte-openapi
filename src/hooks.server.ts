import type { Handle, HandleServerError, RequestEvent } from '@sveltejs/kit';

export const handleError: HandleServerError = ({ error }) => {
	console.error(error);
};
