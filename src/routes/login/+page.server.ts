import { BACKEND_URL } from '$env/static/private';
import { fail } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, fetch, cookies }) => {
		const formData = Object.fromEntries(await request.formData()) as {
			username: string;
			password: string;
		};

		const response = await fetch(`${BACKEND_URL}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({
				username: formData.username,
				password: formData.password
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});

		if (!response.ok) {
			return fail(400, {
				message: 'Something went wrong when trying to log in'
			});
		}

		const authorizationHeader = response.headers.get('authorization') ?? '';
		cookies.set('sessionId', authorizationHeader.split('Bearer ')[1] ?? '', {
			path: '/',
			expires: new Date(new Date().getTime() + 1000 * 60 * 30),
			maxAge: new Date().getTime() + 1000 * 60 * 10,
			httpOnly: true
		});

		const data = await response.json();

		return {
			message: 'Successfully logged in',
			data
		};
	}
};
