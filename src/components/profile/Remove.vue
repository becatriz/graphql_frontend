<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Excluir Perfil</h1>
                    <v-divider class="mb-3" />
                    <div v-if="errors">
                        <Errors :errors="errors" />
                    </div>
                    <v-text-field label="ID"
                        v-model.number="filter.id" />
                    <v-text-field label="Nome"
                        v-model="filter.name" />

                    <v-btn color="error" class="ml-0 mt-3"
                        @click="removeProfle">
                        Excluir Perfil
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
import Errors from '../common/Errors.vue'

export default {
    components: { Errors },
    data() {
        return {
            filter: {},
            data: null,
            errors: null
        }
    },
    methods: {
        removeProfle() {
            // implementar
        }
    }
}
</script>

<style>

</style>
