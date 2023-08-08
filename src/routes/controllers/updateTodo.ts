import { env } from '$env/dynamic/private';
import type { Fetch } from '../../types';

type UpdateTodoProps = {
	todoId: string;
	title: string;
	description: string;
	completed: boolean;
	fetchParam?: Fetch;
};

export async function updateTodo({
	todoId,
	title,
	description,
	completed,
	fetchParam = fetch
}: UpdateTodoProps) {
	const res = await fetchParam(`${env.BACKEND_URL}/todos/${todoId}`, {
		method: 'PATCH',
		body: JSON.stringify({
			title,
			description,
			completed: !completed
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return res;
}
