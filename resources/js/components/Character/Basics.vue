<template>
    <div v-if="basics" id="basics" class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-4 mb-2">
                            <label class="mb-0" for="basics-name">
                                <small>Name</small>
                            </label>
                            <input id="basics-name" :class="{'form-control': editing, 'form-control-plaintext': !editing}" type="text" v-model="basics.name" @change="onChange" :readonly="!editing" />
                        </div>
                        <div class="col-md-4 mb-2">
                            <label class="mb-0" for="basics-owner">
                                <small>Player</small>
                            </label>
                            <input id="basics-player" :class="{'form-control': editing, 'form-control-plaintext': !editing}" type="text" v-model="basics.player" @change="onChange" :readonly="!editing" />
                        </div>
                        <div class="col-md-4 mb-2">
                            <label class="mb-0" for="basics-alignment">
                                <small>Alignment</small>
                            </label>
                            <input id="basics-alignment" list="available-alignments" :class="{'form-control': editing, 'form-control-plaintext': !editing}" type="text" v-model="basics.alignment" @change="onChange" :readonly="!editing" autocomplete="off" />
                            <datalist id="available-alignments">
                                <option value="Lawful Good" />
                                <option value="Good" />
                                <option value="Chaotic Good" />
                                <option value="Lawful" />
                                <option value="Neutral" />
                                <option value="Chaotic" />
                                <option value="Lawful Evil" />
                                <option value="Evil" />
                                <option value="Chaotic Evil" />
                            </datalist>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mb-2">
                            <label for="basics-race" class="mb-0">
                                <small>Race</small>
                            </label>
                            <input type="text" id="basics-race" list="available-races" :class="{'form-control': editing, 'form-control-plaintext': !editing}" v-model="basics.race" @change="onChange" :readonly="!editing" autocomplete="off" />
                            <datalist id="available-races">
                                <option v-for="(race, key) in Races" :key="key" :value="race.name" />
                            </datalist>
                        </div>
                        <div class="col-md-4 mb-2">
                            <label for="basics-sex" class="mb-0">
                                <small>Gender</small>
                            </label>
                            <input type="text" id="basics-sex" list="available-sexes" :class="{'form-control': editing, 'form-control-plaintext': !editing}" v-model="basics.sex" @change="onChange" :readonly="!editing" />
                            <datalist id="available-sexes">
                                <option value="Male" />
                                <option value="Female" />
                                <option value="Hermaphrodite" />
                                <option value="Intersex" />
                                <option value="Nonbinary" />
                            </datalist>
                        </div>
                        <div class="col-md-4 mb-2">
                            <label for="basics-race" class="mb-0">
                                <small>Background</small>
                            </label>
                            <input type="text" id="basics-background" list="available-backgrounds" :class="{'form-control': editing, 'form-control-plaintext': !editing}" v-model="basics.background" @change="onChange" :readonly="!editing" autocomplete="off" />
                            <datalist id="available-backgrounds">
                                <option value="Sage" />
                                <option value="Sailor" />
                                <option value="Soldier" />
                                <option value="Urchin" />
                            </datalist>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 d-flex flex-column">
                    <div class="row flex-grow-1">
                        <div class="col d-flex flex-column mb-2">
                            <label class="mb-0" for="basics-description">
                                <small>Description</small>
                            </label>
                            <textarea name="" :class="{'form-control': editing, 'form-control-plaintext': !editing}" id="basics-description" cols="30" rows="10" :readonly="!editing"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    textarea {
        min-height: 0;
        height: 6rem;
        max-height: 100vh;
        flex-grow: 1;
        resize: none;
    }
</style>
<script>
import { mapGetters, mapState } from 'vuex';
import * as Races from '../../data/races/';

export default {
    name: "Basics",
    data () {
        return {
            Races
        }
    },
    computed: {
        ...mapGetters({
            basics: 'basics'
        }),
        ...mapState({
            editing: state => state.unlocked.basics
        })
    },
    methods: {
        onChange ({ target: { id, value } }) {
            const obj = {};
            obj[id.split("-")[1]] = value;

            this.$store.commit('addCharacterChange', obj)
        }
    }
}
</script>