<template>
	<div>
		<div class="container is-fluid">
			<p class="title">{{ $route.params.articleName }}</p>
			<br />
			<b-button
				type="is-primary"
				icon-right="volume-high"
				@click="listenAll()"
				:alt="$t('PlayTheEntire')"
			>
				{{ $t('PlayTheEntire') }}
			</b-button>
			<section style="margin: 2vw">
				<card
					class="column"
					v-for="section in sections"
					:key="section.title"
					:title="section.title"
					:content="section.content"
					:items="section.items"
					:languages="languages"
				/>
			</section>
		</div>
		<div class="contenant">
			<controlBar class="controlBar" :isSingleSection="isSingleSection" />
		</div>
	</div>
</template>
<script>
import wiki from 'wikijs'
import card from '@/components/Card'
import controlBar from '@/components/ControlBar'
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
			isSingleSection: true,
		}
	},
	async fetch() {
		let article = await wiki({
			apiUrl: 'https://' + this.getLocale() + '.wikipedia.org/w/api.php',
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
		getLocale() {
			return this.$cookies.get('i18n_redirected')
		},
		async listenAll() {
			this.isSingleSection = false
			for (const section of this.sections) {
				this.$bus.$emit(section.title)
				let waitForFinish = true
				this.$bus.$on('finish', () => {
					waitForFinish = false
				})
				while (waitForFinish) {
					await this.wait(1000)
				}
			}
			this.$bus.$emit('completed')
			this.isSingleSection = true
		},
	},
	components: {
		card,
		controlBar,
	},
}
</script>
<style scoped>
.controlBar {
	bottom: 1vw;
	position: fixed;
}
.contenant {
	display: flex;
	justify-content: center;
}
</style>