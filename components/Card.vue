<template>
	<div class="column">
		<div class="card">
			<header class="card-header">
				<p class="card-header-title">
					{{ title }}
				</p>
				<b-button
					type="is-primary"
					icon-right="volume-high"
					@click="toListen(selected)"
				>
					Play section
				</b-button>
			</header>
			<div class="card-content">
				<div class="content has-text-centered">
					<p class="has-text-grey">
						{{ content }}
					</p>
				</div>
			</div>
			<footer class="card-footer">
				<div class="card-footer-item">
					<span> </span>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
}
</script>
