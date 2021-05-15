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
		languages: {
			type: Array,
			required: true,
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
		async listen() {
			await this.read(this.title, 0.7, 0.8)
			await this.read(this.content)
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
						(voice) => voice.lang == 'fr-FR' //TODO dynamic
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
