<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Consultar Usuário</h1>
          <v-divider class="mb-3" />
          <div v-if="errors">
            <Errors :errors="errors" />
          </div>
          <v-text-field label="ID" v-model.number="filter.id" />
          <v-text-field label="E-mail" v-model="filter.email" />
          <v-btn coor="primary" class="ml-0 mt-3" @click="getUserAsync">
            Consultar
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
            <v-text-field label="profiles" readonly :value="profilesLabels" />
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
      profiles: [],
      data: null,
      errors: null,
    };
  },
  computed: {
    profilesLabels() {
      return (
        this.data &&
        this.data.profiles &&
        this.data.profiles.map((p) => p.label).join(", ")
      );
    },
  },
  methods: {
    async getUserAsync() {
      try {
        const { data } = await this.getUser();

        this.setData(data.user);
        this.setStateErrors(null);

      } catch (error) {
        this.setFilter();
        this.setStateErrors(error);
      }
    },

    getUser() {
      return this.$api.query({
        query: gql`
          query ($id: Int, $email: String) {
            user(filter: { id: $id, email: $email }) {
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
          id: this.filter.id,
          emai: this.filter.email,
        },
        fetchPolicy: "network-only",
      });
    },

    setData(data) {
      this.data = data;
    },

    setFilter() {
      this.filter = {};
    },

    setStateErrors(state) {
      this.errors = state;
    },
  },
};
</script>

<style></style>
