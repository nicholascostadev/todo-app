<script lang="ts">
	import { enhance } from '$app/forms';
	import { cn } from '$lib/utils';
	import { Trash } from 'lucide-svelte';
	import type { Todo } from '../../types';

	export let todo: Todo;
</script>

<div class="flex justify-between items-center w-full">
	<h4 class={cn('text-lg', todo.completed && 'line-through text-slate-600')}>
		{todo.title}
	</h4>
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
