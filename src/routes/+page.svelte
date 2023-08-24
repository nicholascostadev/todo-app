<script lang="ts">
	import { enhance } from '$app/forms';
	import TodoContent from '$lib/components/TodoContent.svelte';
	import { flip } from 'svelte/animate';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade, fade, fly } from 'svelte/transition';

	const [send, receive] = crossfade({
		easing: cubicInOut,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		fallback: (node) => {
			const leftSide = node.attributes.getNamedItem('data-side')?.value === 'left';
			console.log(node.attributes.getNamedItem('data-side'));
			return fly(node, { x: leftSide ? -150 : 150, y: 0, easing: cubicInOut });
		}
	});

	export let data;
	export let form:
		| {
				ok: boolean;
				message: string;
				title: string;
		  }
		| undefined;

	$: form?.ok === false && alert(form.message);

	$: completed = data.todos.filter((todo) => todo.completed);
	$: uncompleted = data.todos.filter((todo) => !todo.completed);
	$: sections = [
		{
			title: 'Not completed',
			status: 'incomplete',
			todos: uncompleted
		},
		{
			title: 'Completed',
			status: 'completed',
			todos: completed
		}
	];
</script>

<main class="mx-auto container px-8">
	<div class="py-4 flex flex-col gap-4 justify-center items-center mx-auto w-[768px] max-w-full">
		<div class="w-full flex flex-col gap-4">
			<h2 class="text-xl text-center">Create new Todo</h2>
			<form
				action="?/addTodo"
				method="POST"
				class="w-full flex gap-2 justify-center items-center"
				use:enhance
			>
				<input
					type="text"
					name="title"
					placeholder="Add new Todo"
					value={form?.title ?? ''}
					class="border p-2 border-slate-100 rounded-md hover:bg-slate-50 transition-colors focus-visible:bg-slate-50 w-full"
				/>
				<button class="p-2 border border-slate-100 rounded-md transition-colors hover:bg-slate-50">
					Create
				</button>
			</form>
		</div>

		<div class="grid grid-cols-2 w-full gap-4">
			{#each sections as section (section.title)}
				<div class="w-full" transition:fly>
					<h2 class="text-xl leading-loose flex justify-between items-center">
						{section.title}
						<form action="?/clearAll" method="POST" use:enhance>
							<input type="hidden" name="status" value={section.status} />
							<button
								class="text-sm enabled:hover:text-red-500 transition-colors disabled:cursor-not-allowed"
								disabled={section.todos.length <= 0}>Clear all</button
							>
						</form>
					</h2>
					<div class="flex flex-col gap-2 justify-start items-start transition-all relative">
						{#if section.todos.length === 0}
							<p class="absolute top-0 left-0 text-center text-slate-700 text-sm" in:fade>
								{#if !data.ok}
									There was an error when trying to retrieve your Todos.
								{:else if section.status === 'completed'}
									No completed Todos yet.
								{:else}
									No Todos remaining, keep going!
								{/if}
							</p>
						{/if}
						{#each section.todos as todo (todo.id)}
							<div
								class="flex flex-col gap-1 w-full border border-slate-100 rounded-md p-2"
								animate:flip
								in:receive={{ key: todo.id }}
								out:send={{ key: todo.id }}
								data-side={section.status === 'completed' ? 'right' : 'left'}
							>
								<TodoContent {todo} />
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
