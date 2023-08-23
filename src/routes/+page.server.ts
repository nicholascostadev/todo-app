import type { Todo } from '../types';
import { getTodos, createTodo, updateTodo, deleteTodo } from './controllers';
import { clearTodos } from './controllers/clearTodos';

export async function load({ fetch }) {
	try {
		const res = await getTodos({ fetchParam: fetch });

		if (!res.ok) {
			return {
				ok: false,
				message: 'Could not load todos',
				error: await res.json(),
				todos: [] as Todo[]
			};
		}

		const todos = (await res.json()) as Todo[];

		return { todos, ok: true };
	} catch (err) {
		return { todos: [] as Todo[], ok: true };
	}
}

export const actions = {
	addTodo: async ({ request, fetch }) => {
		const form = await request.formData();
		const { title } = Object.fromEntries(form) as {
			title: string;
		};

		try {
			const res = await createTodo({
				title,
				fetchParam: fetch
			});

			if (!res.ok) {
				return {
					ok: false,
					message: 'There was an error when adding the todo.',
					title
				};
			}
			return {
				ok: true,
				message: 'Todo Added'
			};
		} catch (err) {
			console.log('Error', err);

			return {
				ok: false,
				message: 'There was an error when adding the todo.',
				title
			};
		}
	},
	deleteTodo: async ({ request, fetch }) => {
		const form = await request.formData();
		const { todoId } = Object.fromEntries(form) as {
			todoId: string;
		};

		try {
			const res = await deleteTodo({
				todoId,
				fetchParam: fetch
			});

			if (!res.ok) {
				return {
					ok: false,
					message: 'Todo Not Deleted',
					todoId,
					todos: []
				};
			}
			return {
				ok: true,
				message: 'Todo Deleted'
			};
		} catch (err) {
			return {
				ok: false,
				message: 'Todo Not Deleted',
				todoId
			};
		}
	},
	toggleComplete: async ({ request, fetch }) => {
		const form = await request.formData();
		const formData = Object.fromEntries(form) as {
			todoId: string;
			completed: string;
			title: string;
			description: string;
		};

		const completed = formData.completed === 'true';
		const { title, description, todoId } = formData;

		try {
			console.log({
				sent: {
					todoId,
					title,
					description,
					completed
				}
			});
			const res = await updateTodo({
				todoId,
				title,
				description,
				completed,
				fetchParam: fetch
			});

			if (!res.ok) {
				return {
					ok: false,
					message: 'There was an error when updating the todo.',
					error: await res.json(),
					todoId
				};
			}
			console.log('Success', await res.json());
			return {
				ok: true,
				message: 'Todo Updated'
			};
		} catch (err) {
			return {
				ok: false,
				message: 'There was an error when updating the todo.',
				error: err,
				todoId
			};
		}
	},
	clearAll: async ({ fetch, request }) => {
		const status = String((await request.formData()).get('status'));
		try {
			const res = await clearTodos({ fetchParam: fetch, status });
			if (!res.ok) {
				return {
					ok: false,
					message: 'There was an error when clearing all todos.',
					error: await res.json()
				};
			}

			return {
				ok: true,
				message: 'Todos Cleared'
			};
		} catch (err) {
			return {
				ok: false,
				message: 'There was an error when clearing all todos.',
				error: err
			};
		}
	}
};
