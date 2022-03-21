<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Excluir Usuário</h1>
          <v-divider class="mb-3" />
          <div v-if="errors">
            <Errors :errors="errors" />
          </div>
          <v-text-field label="ID" v-model.number="filter.id" />
          <v-text-field label="E-mail" v-model="filter.email" />

          <v-btn color="error" class="ml-0 mt-3" @click="removeUserAsync">
            Excluir Usuário
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
      filter: {},
      data: null,
      errors: null,
    };
  },
  methods: {
    async removeUserAsync() {
      console.log("Remove");
      try {
        const { data } = await this.removeUser();

        this.setData(data.removeUser);
        this.setFilter();
        
        this.setStateErrors(null);
      } catch (error) {
          console.log(error);
        this.setStateErrors(error);
      }
    },

    removeUser() {
      return this.$api.mutate({
        mutation: gql`
          mutation ($id: Int $email: String) {
            removeUser(filter: { id: $id email: $email }) {
              id
              name
              email
            }
          }
        `,
        variables: {
          id: this.filter.id,
          email: this.filter.email,
        },
      });
    },

    setStateErrors(state) {
      this.errors = state;
    },

    setData(data) {
      this.data = data;
    },

    setFilter() {
      this.filter = {};
    },
  },
};
</script>

<style></style>
