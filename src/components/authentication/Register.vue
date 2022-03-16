<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Registrar</h1>
          <v-divider class="mb-3" />
          <div v-if="errors">
            <Errors :errors="errors" />
          </div>
          <v-text-field label="Nome" v-model="user.name" />
          <v-text-field label="E-mail" v-model="user.email" />
          <v-text-field label="Senha" v-model="user.password" type="password" />
          <v-btn color="primary" class="ml-0 mt-3" @click="register">
            Registrar
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
            <v-text-field label="profiles" readonly :value="profiles" />
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
    profiles() {
      return (
        this.data &&
        this.data.profiles &&
        this.data.profiles.map((p) => p.name).join(",")
      );
    },
  },
  methods: {
    async register() {
      try {
        const { data } = await this.registerAsync();
        this.setReponseUserCreated(data.registerUser);
      } catch (error) {
        this.setStateErrors(error);
      }
    },

    async registerAsync() {
      return this.$api.mutate({
        mutation: gql`
          mutation ($name: String!, $email: String!, $password: String!) {
            registerUser(
              data: { name: $name, email: $email, password: $password }
            ) {
              id
              name
              email
              profiles {
                name
              }
            }
          }
        `,
        variables: {
          name: this.user.name,
          email:this.user.email,
          password: String(this.user.password),
        },
      });
    },

    setStateErrors(state) {
      this.errors = state;
    },

    setReponseUserCreated(user) {
      this.data = user;
    },
  },
};
</script>

<style></style>
