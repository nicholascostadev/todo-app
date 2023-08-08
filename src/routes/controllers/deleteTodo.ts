import { env } from '$env/dynamic/private';
import type { Fetch } from '../../types';

type UpdateTodoProps = {
	todoId: string;
	fetchParam?: Fetch;
};

export async function deleteTodo({ todoId, fetchParam = fetch }: UpdateTodoProps) {
	const res = await fetchParam(`${env.BACKEND_URL}/todos/${todoId}`, {
		method: 'DELETE'
	});

	return res;
}
