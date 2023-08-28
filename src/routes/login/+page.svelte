<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
</script>

<main class="h-[calc(100vh_-_48px)] flex justify-center items-center">
	<form
		action="?/login"
		method="POST"
		use:enhance
		class="flex flex-col gap-4 w-96 border border-border rounded-md p-2"
	>
		<h1 class="text-3xl">Login</h1>
		<div>
			<Label for="username">Username</Label>
			<Input placeholder="Username" name="username" id="username" />
		</div>
		<div>
			<Label for="password">Password</Label>
			<Input placeholder="password" name="password" id="password" />
		</div>

		<Button size="sm">Submit</Button>
	</form>
</main>
