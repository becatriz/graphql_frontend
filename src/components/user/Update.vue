<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Filtrar Usuário</h1>
          <v-divider class="mb-3" />
          <div v-if="errors">
            <Errors :errors="errors" />
          </div>
          <v-text-field label="ID" v-model.number="filter.id" />
          <v-text-field label="E-mail" v-model="filter.email" />

          <h1 class="mt-4 headline">Alterar Usuário</h1>
          <v-divider class="mb-3" />
          <v-text-field label="Nome" v-model="user.name" />
          <v-text-field label="E-mail" v-model="user.email" />
          <v-text-field label="Senha" v-model="user.password" type="password" />
          <v-select
            label="profiles"
            v-model="user.profiles"
            :items="profiles"
            item-value="id"
            item-text="label"
            attach
            multiple
            chips
            deletable-chips
          />
          <v-btn class="ml-0 mt-3" @click="getProfiles"> Obter profiles </v-btn>
          <v-btn color="primary" class="ml-0 mt-3" @click="updateUserAsync">
            Alterar Usuário
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
import getProfiles from "../../mixins/getProfiles";
import gql from "graphql-tag";

export default {
  components: { Errors },
  mixins: [getProfiles],
  data() {
    return {
      filter: {},
      user: {},
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
    profilesSelecteds() {
      if (this.user.profiles) {
        return this.user.profiles.map((id) => ({ id }));
      } else {
        return null;
      }
    },
  },
  methods: {
    async updateUserAsync() {

      try {
        
        const { data } = await this.updateUser();
        this.setData(data.updateUser)
        this.setStateError(null);

      } catch (error) {
        this.setStateErrors(error)
      }

    },

    updateUser() {
      return this.$api.mutate({
        mutation: gql`
          mutation (
            $id: Int
            $email_filter: String
            $name: String
            $password: String
            $email: String
            $profiles: [ProfileFilter]
          ) {
            updateUser(filter: { id: $id, email: $email_filter }, data: {
              name: $name
              email: $email
              password: $password
              profiles: $profiles
            }) {
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
        variables: {
          id: this.filter.id,
          email_filter: this.filter.email,
          password: this.user.password,
          name: this.user.name,
          email: this.user.email,
          profiles: this.profilesSelecteds
          
        },
      });
    },
    setData(data){
      this.data = data
    },

    setStateErrors(state){
      this.errors = state
    }
  },
};
</script>

<style></style>
