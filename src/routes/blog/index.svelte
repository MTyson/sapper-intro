<script context="module">
	export function preload() {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	export let posts;
	export let title, slug, html;
	function onAdd(title, slug, html){
		fetch(`blog.json`, {
			method:"POST",
			headers:{ 'Content-Type': 'application/json' },
			body: JSON.stringify({"title":title,"slug":slug,"html":html})
		}).then(r => {
  		r.json()
			.then(function(result) {
				posts = [...posts, result];
			})
		})
	}
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul>

<div class="add-blog">
	<h2>New Topic</h2>
	<div>Title<input bind:value={title} placeholder="Title"></div>
	<div>Slug<input bind:value={slug} placeholder="Slug"></div>
	<div>HTML<input bind:value={html} placeholder="<html>JS Injection Here</html>"></div>
	<button on:click={()=>{onAdd(title, slug, html)}}>Add It!</button>
</div>