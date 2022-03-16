<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Novo Usuário</h1>
          <v-divider class="mb-3" />
          <div v-if="errors">
            <Errors :errors="errors" />
          </div>
          <v-text-field label="Nome" v-model="user.name" />
          <v-text-field label="E-mail" v-model="user.email" />
          <v-text-field label="Senha" v-model="user.password" type="password" />
          <v-select
            label="Perfis"
            v-model="user.profiles"
            :items="profiles"
            item-value="id"
            item-text="label"
            attach
            multiple
            chips
            deletable-chips
          />
          <v-btn class="ml-0 mt-3" @click="getProfiles"> Obter Perfis </v-btn>
          <v-btn color="primary" class="ml-0 mt-3" @click="newUser">
            Novo Usuário
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
            <v-text-field label="Email" readonly v-model="data.email" />
            <v-text-field label="Perfis" readonly :value="profilesLabels" />
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Errors from "../common/Errors.vue";
import getProfiles from "../../mixins/getProfiles"

export default {
  components: { Errors },
  mixins: [getProfiles],
  data() {
    return {
      user: {},
      data: null,
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
    profilesSelecionados() {
      if (this.user.profiles) {
        return this.user.profiles.map((id) => ({ id }));
      } else {
        return null;
      }
    },
  },
  methods: {
    newUser() {
      // implementar
    },
   
  },
};
</script>

<style></style>
