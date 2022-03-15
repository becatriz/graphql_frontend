<template>
    <v-container fluid>
        <v-tabs color="grey lighten-3"
            slider-color="blue">
            <v-tab ripple>
                List
            </v-tab>
            
            <v-tab ripple>
                Query
            </v-tab>

            <v-tab ripple>
                Create
            </v-tab>

            <v-tab ripple>
                Update
            </v-tab>

            <v-tab ripple>
                Remove.vue
            </v-tab>

            <v-tab-item>
                <List />
            </v-tab-item>

            <v-tab-item>
                <Query />
            </v-tab-item>

            <v-tab-item>
                <Create />
            </v-tab-item>
            
            <v-tab-item>
                <Update />
            </v-tab-item>
            
            <v-tab-item>
                <Remove />
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import List from './List.vue'
import Query from './Query.vue'
import Create from './Create.vue'
import Update from './Update.vue'
import Remove from './Remove.vue'

export default {
    components: { List, Query, Create, Update, Remove }
}
</script>

<style>

</style>
