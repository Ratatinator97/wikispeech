<template>
	<div class="container">
		<p class="title">{{ $route.params.articleName }}</p>
		<br />
		<b-button
			type="is-primary"
			icon-right="volume-high"
			@click="toListen(selected)"
		>
			Play the entire article
		</b-button>
		<section style="margin: 2vw">
			<card
				class="column"
				v-for="section in sections"
				:key="section.title"
				:title="section.title"
				:content="section.content"
			/>
		</section>
	</div>
</template>
<script>
import wiki from 'wikijs'
import card from '@/components/Card'
export default {
	data() {
		return {
			sections: [],
		}
	},
	async fetch() {
		let article = await wiki({
			apiUrl: 'https://fr.wikipedia.org/w/api.php',
		}).page(this.$route.params.articleName)
		let sections = await article.content()
		console.log(sections)
		sections.forEach((section) => {
			this.sections.push(section)
		})
	},
	components: {
		card,
	},
}
</script>