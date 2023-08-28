import { BACKEND_URL } from '$env/static/private';

export async function GET({ fetch, request }) {
	return await fetch(`${BACKEND_URL}/auth/me`, {
		credentials: 'include',
		headers: request.headers
	});
}
