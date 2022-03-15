<template>
	<v-layout column>
		<v-flex>
			<UserLoggedIn />
		</v-flex>
		<v-flex>
			<v-tabs centered  dark icons-and-text>
				<v-tabs-slider color="white"></v-tabs-slider>

				<v-tab>
					Autenticação
					<v-icon>fingerprint</v-icon>
				</v-tab>

				<v-tab>
					Usuários
					<v-icon>people</v-icon>
				</v-tab>

				<v-tab>
					Perfis
					<v-icon>how_to_reg</v-icon>
				</v-tab>

				<v-tab-item>
					<AuthenticationTab />
				</v-tab-item>

				<v-tab-item>
					<UserTab />
				</v-tab-item>

				<v-tab-item>
					<ProfileTab />
				</v-tab-item>
			</v-tabs>
		</v-flex>
	</v-layout>
</template>

<script>
import AuthenticationTab from './authentication/Tab.vue'
import UserLoggedIn from './authentication/User.vue'
import UserTab from './user/Tab.vue'
import ProfileTab from './profile/Tab.vue'

export default {
	components: {
		AuthenticationTab,
		UserLoggedIn,
		UserTab,
		ProfileTab,
	},
}
</script>

<style>

</style>
