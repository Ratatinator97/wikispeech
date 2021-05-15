<template>
	<div class="container">
		<p class="title">{{ $route.params.articleName }}</p>
		<br />
		<b-button
			type="is-primary"
			icon-right="volume-high"
			@click="listenAll()"
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
				:languages="languages"
			/>
		</section>
	</div>
</template>
<script>
import wiki from 'wikijs'
import card from '@/components/Card'
export default {
	created() {
		const allVoicesObtained = new Promise(function (resolve, reject) {
			let voices = window.speechSynthesis.getVoices()
			if (voices.length !== 0) {
				resolve(voices)
			} else {
				window.speechSynthesis.addEventListener(
					'voiceschanged',
					function () {
						voices = window.speechSynthesis.getVoices()
						resolve(voices)
					}
				)
			}
		})
		allVoicesObtained.then((voices) => (this.languages = voices))
	},
	data() {
		return {
			sections: [],
			languages: [],
		}
	},
	async fetch() {
		let article = await wiki({
			apiUrl: 'https://fr.wikipedia.org/w/api.php',
		}).page(this.$route.params.articleName)
		let sections = await article.content()
		sections.forEach((section) => {
			this.sections.push(section)
		})
	},
	methods: {
		wait(timeout) {
			return new Promise((resolve) => {
				setTimeout(resolve, timeout)
			})
		},
		async listenAll() {
			for (const section of this.sections) {
				this.$bus.$emit(section.title)
				console.log('Evt emmited')
				await this.wait(1000)
			}
		},
	},
	components: {
		card,
	},
}
</script>