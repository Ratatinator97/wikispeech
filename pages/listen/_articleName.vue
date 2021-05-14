<template>
	<div class="container">
		{{ $route.params.articleName }}

		<div class="box">
			<card
				v-for="section in sections"
				:key="section.title"
				:title="section.title"
				:content="section.content"
			/>
		</div>
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
	async asyncData(context) {
		let article = await wiki({
			apiUrl: 'https://fr.wikipedia.org/w/api.php',
		}).page(context.route.params.articleName)
		context.sections = await article.content()
		console.log(context.sections)
	},
	components: {
		card,
	},
}
</script>