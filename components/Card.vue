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
					@click="listen()"
				>
					{{ $t('PlayTheSection') }}
				</b-button>
			</header>
			<div v-if="!items" class="card-content">
				<div class="content has-text-centered">
					<p class="has-text-grey">
						{{ content }}
					</p>
				</div>
			</div>
			<div v-else class="card-content">
				<card
					v-for="item in items"
					:key="item.title"
					:title="item.title"
					:content="item.content"
					:languages="languages"
					:items="item.items"
				/>
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
import card from '@/components/Card'
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
		languages: {
			type: Array,
			required: true,
		},
		items: {
			type: Array,
			required: false,
		},
	},
	created() {
		this.$bus.$on(this.title, () => {
			this.listen()
		})
	},
	beforeDestroy() {
		this.$bus.$off(this.title)
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
		async listen() {
			if (!this.items) {
				await this.read(this.title, 0.7, 0.8)
				await this.read(this.content)
				this.$bus.$emit('finish')
			} else {
				await this.read(this.title, 0.7, 0.8)
				for (const item of this.items) {
					this.$bus.$emit(item.title)
					let waitForFinish = true
					this.$bus.$on('finish', () => {
						waitForFinish = false
					})
					while (waitForFinish) {
						await this.wait(1000)
					}
				}
				this.$bus.$emit('finish')
			}
		},
		async read(message, pitch = 1, rate = 1) {
			return new Promise((resolve, error) => {
				if ('speechSynthesis' in window) {
					if (window.speechSynthesis.speaking) {
						window.speechSynthesis.cancel()
					}
					if (message == '') {
						resolve()
					}
					var msg = new SpeechSynthesisUtterance(message)
					let voice = this.languages.filter(
						(voice) => voice.lang.includes(this.getLocale()) //TODO dynamic
					)
					if (voice.length !== 0) {
						msg.voice = voice[0]
					}
					msg.pitch = pitch
					msg.rate = rate
					msg.onend = function () {
						clearTimeout(timeout)
						resolve()
					}
					msg.onerror = function () {
						error('Error during lecture')
					}
					var timeout
					function continueRun() {
						window.speechSynthesis.pause()
						window.speechSynthesis.resume()
						timeout = setTimeout(continueRun, 10000)
					}
					timeout = setTimeout(continueRun, 10000)
					window.speechSynthesis.speak(msg)
				}
			})
		},
	},
}
</script>
