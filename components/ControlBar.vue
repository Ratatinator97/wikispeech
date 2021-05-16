<template>
	<div class="notification columns is-mobile">
		<div class="column is-narrow">
			<b-button
				type="is-primary"
				icon-right="play"
				@click="play()"
				alt="$t('PlayTheEntire')"
			/>
		</div>
		<div class="column is-narrow">
			<b-button
				type="is-light"
				icon-right="pause"
				@click="pause()"
				:alt="$t('PlayTheEntire')"
			/>
		</div>
		<div class="column is-narrow">
			<b-button
				type="is-warining"
				icon-right="skip-next"
				@click="next()"
				alt="$t('PlayTheEntire')"
			/>
		</div>
		<div class="column is-narrow">
			<b-button
				type="is-danger"
				icon-right="cancel"
				@click="cancel()"
				alt="$t('PlayTheEntire')"
			/>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		isSingleSection: {
			type: Boolean,
			required: true,
		},
	},
	methods: {
		wait(timeout) {
			return new Promise((resolve) => {
				setTimeout(resolve, timeout)
			})
		},
		play() {
			window.speechSynthesis.resume()
		},
		pause() {
			window.speechSynthesis.pause()
		},
		next() {
			window.speechSynthesis.cancel()
			this.$bus.$emit('finish')
		},
		async cancel() {
			if (this.isSingleSection) {
				window.speechSynthesis.cancel()
				this.$bus.$emit('finish')
			} else {
				let completed = false
				this.$bus.$on('completed', () => {
					completed = true
				})
				while (!completed) {
					window.speechSynthesis.cancel()
					this.$bus.$emit('finish')
					await this.wait(200)
				}
			}
		},
	},
}
</script>
<style scoped>
.content {
	display: flex;
	align-items: flex-start;
	justify-content: space-evenly;
}
.notification {
	background-color: #66a8ff;
	position: relative;
	overflow: auto;
	padding: 0.25rem;
}
.nopadding {
	padding: 0.25rem;
}
</style>