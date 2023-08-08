export type Fetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export type Todo = {
	id: number;
	title: string;
	description: string;
	completed: boolean;
};
