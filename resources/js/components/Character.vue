<template>
    <form id="character" class="container h-100" @submit.prevent="onSubmit">
        <div v-if="loadingCharacter" class="container h-100 d-flex align-items-center justify-content-center">
            <h1 class="spinner-border spinner-border-giant" role="status">
                <span class="sr-only">Loading...</span>
            </h1>
        </div>
        <div v-else class="container h-100">
            <div class="row">
            <div class="col mb-3">
                <div class="card">
                    <div class="card-body p-2">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline p-2">
                                    <input class="form-check-input" type="checkbox" id="lock-basics" name="basics" v-model="unlocked.basics" @click="toggleLock" @keyup.prevent="toggleLock">
                                    <label class="form-check-label" for="lock-basics">About</label>
                                </div>
                                <div class="form-check form-check-inline p-2">
                                    <input class="form-check-input" type="checkbox" id="lock-scores" name="scores" v-model="unlocked.scores" @click="toggleLock" @keyup.prevent="toggleLock">
                                    <label class="form-check-label" for="lock-scores">Ability scores</label>
                                </div>
                                <div class="form-check form-check-inline p-2">
                                    <input class="form-check-input" type="checkbox" id="lock-levels" name="levels" v-model="unlocked.levels" @click="toggleLock" @keyup.prevent="toggleLock">
                                    <label class="form-check-label" for="lock-levels">Class</label>
                                </div>
                            </div>
                            <div class="col-2 text-right">
                                <div v-if="loading" class="spinner-border spinner-border-sm mr-2" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <button class="btn btn-success" type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <basics />
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-3 col-lg-2">
                <scores />
            </div>
            <div class="col-md-9 col-lg-10">
                <div class="row">
                    <div class="col">
                        <classes />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <skills />
                    </div>
                </div>
            </div>
        </div>
        </div>
    </form>
</template>
<style scoped>
    .spinner-border-giant {
        height: 8rem;
        width: 8rem;
        border-width: 1.25rem;
    }
</style>
<script>
import { mapState, mapGetters } from 'vuex';
import { Basics, Classes, Scores, Skills } from './Character/';

export default {
    name: "Character",
    components: {
        Basics,
        Classes,
        Scores,
        Skills
    },
    beforeCreate () {
        this.$store.dispatch('getCharacter');
    },
    computed: {
        ...mapGetters({
            unlocked: 'getLocks'
        }),
        ...mapState({
            loadingCharacter: state => state.loading.character,
            loadingUpdate: state => state.loading.updating
        }),
        loading () {
            return this.loadingCharacter || this.loadingUpdate;
        }
    },
    methods: {
        async onSubmit () {
            this.$store.dispatch('saveCharacter');
        },
        toggleLock ({target}) {
            this.$store.commit('toggleLock', target.name);
        }
    }
}
</script>