<template>
    <form id="character" class="container h-100" @submit.prevent="onSubmit">
        <div class="row">
            <div class="col mb-3">
                <div class="card">
                    <div class="card-body p-2">
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline p-2">
                                    <input class="form-check-input" type="checkbox" id="lock-basics" name="basics" v-model="unlocked.basics" @click="toggleLock" @keyup.prevent="toggleLock">
                                    <label class="form-check-label" for="lock-basics">Basic characteristics</label>
                                </div>
                                <div class="form-check form-check-inline p-2">
                                    <input class="form-check-input" type="checkbox" id="lock-scores" name="scores" v-model="unlocked.scores" @click="toggleLock" @keyup.prevent="toggleLock">
                                    <label class="form-check-label" for="lock-scores">Ability scores</label>
                                </div>
                            </div>
                            <div class="col-2 text-right">
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
                <classes />
            </div>
        </div>
    </form>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { Basics, Classes, Scores } from './Character/';

export default {
    name: "Character",
    components: {
        Basics,
        Classes,
        Scores
    },
    beforeCreate () {
        this.$store.dispatch('getCharacter');
    },
    computed: {
        ...mapGetters({
            unlocked: 'getLocks'
        })
    },
    mounted () {
        console.log(this.unlocked);
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