<script>
	import { Button } from '$lib/components/ui/button';
	import '../app.postcss';
</script>

<header class="container mx-auto flex justify-between items-center px-8 h-20">
	<h1 class="text-3xl">
		<a href="/">Todo</a>
	</h1>

	<Button href="/login">Login</Button>
</header>
<slot />
