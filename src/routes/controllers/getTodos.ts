import { env } from '$env/dynamic/private';
import type { Fetch } from '../../types';

type UpdateTodoProps = {
	fetchParam?: Fetch;
};

export async function getTodos({ fetchParam = fetch }: UpdateTodoProps) {
	const res = await fetchParam(`${env.BACKEND_URL}/todos`);

	return res;
}
