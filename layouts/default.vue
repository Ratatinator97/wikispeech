<template>
	<div>
		<nav
			class="navbar header is-white"
			role="navigation"
			aria-label="main navigation"
		>
			<div class="navbar-brand">
				<a class="navbar-item" href="/">
					<img
						src="~assets/logo.png"
						alt="Buefy"
						height="45px"
						width="150px"
					/>
				</a>
			</div>
		</nav>
		<nuxt />
		<CookieControl :locale="getLocale()" />
	</div>
</template>
<script>
export default {
	head() {
		return this.$nuxtI18nHead({ addSeoAttributes: true })
	},
	methods: {
		getLocale() {
			return this.$cookies.get('i18n_redirected')
		},
	},
}
</script>