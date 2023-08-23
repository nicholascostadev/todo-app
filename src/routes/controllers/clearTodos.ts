import { env } from '$env/dynamic/private';
import type { Fetch } from '../../types';

type ClearTodosProps = {
	fetchParam?: Fetch;
	status: string;
};

export async function clearTodos({ fetchParam = fetch, status }: ClearTodosProps) {
	return await fetchParam(`${env.BACKEND_URL}/clear-todos?status=${status}`, {
		method: 'DELETE'
	});
}
