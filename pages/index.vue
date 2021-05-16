<template>
	<div class="container is-fluid">
		<section>
			<b-field :label="$t('SearchForAny')">
				<b-autocomplete
					:data="data"
					:placeholder="$t('SearchForAnyExample')"
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
				:alt="$t('ListenTheArticle')"
			>
				{{ $t('ListenTheArticle') }}
			</b-button>
			<b-image
				lazy
				alt="Example of usage of wikispeech"
				:srcset="require('@/assets/index.png').srcSet"
			></b-image>
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
		getLocale() {
			return this.$cookies.get('i18n_redirected')
		},
		getAsyncData: debounce(function (name) {
			if (!name.length) {
				this.data = []
				return
			}
			this.isFetching = true
			wiki({
				apiUrl:
					'https://' + this.getLocale() + '.wikipedia.org/w/api.php',
			})
				.search(name)
				.then((query) => {
					this.data = []
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