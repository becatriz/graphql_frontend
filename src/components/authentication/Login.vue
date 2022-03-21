<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Login</h1>
          <v-divider class="mb-3" />
          <div v-if="errors">
            <Errors :errors="errors" />
          </div>
          <v-text-field label="E-mail" v-model="user.email" />
          <v-text-field label="Senha" v-model="user.password" type="password" />
          <v-btn color="primary" class="ml-0 mt-3" @click="loginAsync">
            Logar
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Resultado</h1>
          <v-divider />
          <template v-if="data">
            <v-text-field label="ID" readonly v-model="data.id" />
            <v-text-field label="Nome" readonly v-model="data.name" />
            <v-text-field label="E-mail" readonly v-model="data.email" />
            <v-text-field label="Token" readonly v-model="data.token" />
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Errors from "../common/Errors.vue";
import gql from "graphql-tag";

export default {
  components: { Errors },
  data() {
    return {
      user: {},
      data: null,
      errors: null,
    };
  },
  computed: {
    profile() {
      return (
        this.data &&
        this.data.profiles &&
        this.data.profiles.map((p) => p.label).join(",")
      );
    },
  },
  methods: {
    ...mapActions(["setUser"]),
    async loginAsync() {
      try {
        const { data } = await this.getLogin();

        this.setData(data.login);
        this.setStateForm();
        this.setStateError(null);

        this.setUser(this.data);
      } catch (error) {
        this.setStateError(error);
      }
    },

    getLogin() {
      return this.$api.query({
        query: gql`
          query ($email: String!, $password: String!) {
            login(data: { email: $email, password: $password }) {
              id
              name
              email
              token
              profiles {
                name
                label
              }
            }
          }
        `,
        variables: {
          email: this.user.email,
          password: this.user.password,
        },
      });
    },

    setData(data) {
      this.data = data;
    },
    setStateForm() {
      this.user = {};
    },
    setStateError(state) {
      this.errors = state;
    },
  },
};
</script>

<style></style>
