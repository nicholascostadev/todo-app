<script lang="ts">
	import type { Todo } from '../../types';

	export let todos: Todo[];

	$: console.log({ todos });
</script>
