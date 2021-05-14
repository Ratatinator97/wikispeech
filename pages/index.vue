<template>
	<div class="container">
		<section>
			<b-field label="Search for any Wikipedia article">
				<b-autocomplete
					:data="data"
					placeholder="e.g. Alexander the Great"
					field="title"
					:loading="isFetching"
					@typing="getAsyncData"
					keep-first
					@select="(option) => (selected = option)"
				></b-autocomplete>
			</b-field>

			<b-button
				type="is-primary"
				icon-right="volume-high"
				@click="toListen(selected)"
			>
				Listen
			</b-button>
		</section>
	</div>
</template>

<script>
import debounce from 'lodash/debounce'
import wiki from 'wikijs'

export default {
	data() {
		return {
			data: [],
			selected: null,
			isFetching: false,
		}
	},
	methods: {
		toListen(selected) {
			this.$nuxt.$options.router.push('listen/' + selected)
		},
		getAsyncData: debounce(function (name) {
			if (!name.length) {
				this.data = []
				return
			}
			this.isFetching = true
			wiki({
				apiUrl: 'https://fr.wikipedia.org/w/api.php',
			})
				.search(name)
				.then((query) => {
					this.data = []
					console.log(query)
					query.results.forEach((article) => this.data.push(article))
				})
				.catch((error) => {
					this.data = []
					throw error
				})
				.finally(() => {
					this.isFetching = false
				})
		}, 500),
	},
}
</script>