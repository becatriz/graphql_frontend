<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Novo profile</h1>
                    <v-divider class="mb-3" />
                        <div v-if="errors">
                            <Errors :errors="errors" />
                        </div>
                        <v-text-field label="Nome"
                            v-model="profile.name" />
                        <v-text-field label="Rótulo"
                            v-model="profile.label" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            @click="newProfile">
                            Novo Perfil
                        </v-btn>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Resultado</h1>
                    <v-divider />
                    <template v-if="data">
                        <v-text-field label="ID" readonly
                            v-model="data.id" />
                        <v-text-field label="Nome" readonly
                            v-model="data.name" />
                        <v-text-field label="Rótulo" readonly
                            v-model="data.label" />
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Errors from '../common//Errors.vue'

export default {
    components: { Errors },
    data() {
        return {
            profile: {},
            data: null,
            errors: null
        }
    },
    methods: {
        newProfile() {
            // implementar
        }
    }
}
</script>

<style>

</style>
