<script lang="ts">
	import { enhance } from '$app/forms';
	import { cn } from '$lib/utils.js';
	import { Trash } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';

	export let data;
	export let form:
		| {
				ok: boolean;
				message: string;
				title: string;
		  }
		| undefined;
	function todoStateClass(completed: boolean) {
		return completed ? 'bg-green-500' : 'bg-red-500';
	}

	$: form?.ok === false && alert(form.message);
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

		{#if data.todos.length === 0}
			{#if !data.ok}
				<p class="text-center text-lg" in:fade>
					There was an error when trying to retrieve your Todos.
				</p>
			{/if}
			<p class="text-center text-lg" in:fade>No Todos yet.</p>
		{/if}

		{#each data.todos as todo (todo.id)}
			<div
				class="flex flex-col gap-1 w-full border border-slate-100 rounded-md p-2"
				transition:fly={{ x: '100px', y: 'auto' }}
				animate:flip
			>
				<div class="flex justify-between items-center w-full">
					<h4 class={cn('text-lg', todo.completed && 'line-through')}>{todo.title}</h4>
					<div class="flex gap-1 items-center">
						<form method="POST" class="inline-flex items-center gap-1" use:enhance>
							<button
								class={cn('h-5 w-5 rounded-md bg-yellow-400', todo.completed && 'bg-green-400')}
								formaction="?/toggleComplete"
							/>
							<input type="hidden" name="title" value={todo.title} />
							<input type="hidden" name="description" value={todo.description} />
							<input type="hidden" name="completed" value={todo.completed} />
							<input type="hidden" name="todoId" value={todo.id} />
							<button type="submit" formaction="?/deleteTodo">
								<Trash size={20} class="text-red-500" />
							</button>
						</form>
					</div>
				</div>
				<p class="text-sm">{todo.description}</p>
			</div>
		{/each}
	</div>
</main>
