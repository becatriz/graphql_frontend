<template>
  <v-container fluid>
    <v-layout column>
      <v-flex>
        <v-btn color="primary" class="ml-0 mb-4" @click="getUsersAsync">
          Obter Usuários
        </v-btn>
      </v-flex>
      <v-flex>
        <div v-if="errors" class="mb-4">
          <Errors :errors="errors" />
        </div>
      </v-flex>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="users"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.profiles.map((p) => p.label).join(", ") }}</td>
          </template>
        </v-data-table>
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
      errors: null,
      users: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Nome", value: "name" },
        { text: "E-mail", value: "email" },
        { text: "Perfis", value: "profiles" },
      ],
    };
  },
  methods: {
    async getUsersAsync() {
      try {
        const { data } = await this.getUsers();

        this.setUsers(data.users);
        this.setStateErrors(null);

      } catch (error) {
        this.setUsers([]);
        this.setStateErrors(error);
      }
    },

    getUsers() {
      return this.$api.query({
        query: gql`
          query {
            users {
              id
              name
              email
              profiles {
                name
                label
              }
            }
          }
        `,
        fetchPolicy: "network-only" // Does not get the data from the cache, only from the network
      });
    },

    setUsers(users) {
      this.users = users;
    },

    setStateErrors(state) {
      this.errors = state;
    },
  },
};
</script>

<style></style>
