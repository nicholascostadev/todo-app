import { BACKEND_URL } from '$env/static/private';
import { error, redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import jwtDecode from 'jwt-decode';
import { z } from 'zod';

const authResponseSchema = z.object({
	id: z.number().int().positive().min(0),
	userId: z.number().int().positive().min(0),
	token: z.string().min(1)
});

const sessionSchema = z.object({
	sessionId: z.number().int().positive().min(0),
	userId: z.number().int().positive().min(0),
	username: z.string().min(1)
});

export type Session = z.infer<typeof sessionSchema>;

const notLoggedPaths = ['/login', '/register'];

export const sessionHandler: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('sessionId');
	const hasSessionId = sessionId && sessionId !== '';

	if (!hasSessionId) return await resolve(event);

	const res = await event.fetch(`${BACKEND_URL}/auth/me`, {
		credentials: 'include',
		headers: event.request.headers
	});

	const parsedAuth = authResponseSchema.safeParse(await res.json());

	if (!parsedAuth.success) {
		throw error(400, {
			message: 'There was an error retrieving your session info(Invalid API Return)'
		});
	}

	if (!res.ok) {
		throw error(400, {
			message: 'There was an error retrieving your session info'
		});
	}

	const data = parsedAuth.data;
	const parsedSession = sessionSchema.safeParse(jwtDecode(data.token));

	if (!parsedSession.success) {
		event.cookies.delete('sessionId');
		throw error(400, {
			message: 'Session in invalid form.'
		});
	}

	event.locals.session = parsedSession.data;

	if (notLoggedPaths.includes(event.url.pathname)) {
		throw redirect(302, '/');
	}

	return await resolve(event);
};

export const handle: Handle = sequence(sessionHandler);
