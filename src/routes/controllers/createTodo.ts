import { env } from '$env/dynamic/private';
import type { Fetch } from '../../types';

type UpdateTodoProps = {
	title: string;
	fetchParam?: Fetch;
};

export async function createTodo({ title, fetchParam = fetch }: UpdateTodoProps) {
	const res = await fetchParam(`${env.BACKEND_URL}/todos`, {
		method: 'POST',
		body: JSON.stringify({
			title,
			description: '',
			completed: false
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return res;
}
