<template>
    <div id="scores" class="row">
        <div class="col-md-12">
            <div class="card text-center mb-3">
                <div class="card-body p-2 d-flex flex-row flex-wrap justify-content-between">
                    <div class="w-100 mb-1">
                        <small>Proficiency</small>
                    </div>
                    <div class="flex-grow-1 mb-0">
                        <h5 class="card-title mb-0">
                            +{{ proficiencyBonus }}
                        </h5>
                        <small class="card-subtitle">Mod</small>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="(score, key) in modifiedScores" :key="key" class="col-6 col-md-12">
            <div class="card text-center mb-3">
                <div class="card-body p-2 d-flex flex-row flex-wrap justify-content-between">
                    <div class="w-100 mb-1">
                        <small>{{ titleKey(key) }}</small>
                    </div>
                    <div class="flex-grow-1 border-right mb-0">
                        <h5 class="card-title mb-0">
                            {{ score }}
                        </h5>
                        <small class="card-subtitle">Score</small>
                    </div>
                    <div class="flex-grow-1 mb-0">
                        <h5 class="card-title mb-0">
                            {{ modifier(score) }}
                        </h5>
                        <small class="card-subtitle">Mod</small>
                    </div>
                </div>
                <div v-if="editing" class="card-footer btn-group w-100 p-0 overflow-hidden" role="group">
                    <button class="btn btn-sm btn-dark rounded-0" type="button" @click="scoreChange(key,-1)">-</button>
                    <button class="btn btn-sm btn-dark rounded-0" type="button" @click="scoreChange(key,1)">+</button>
                </div>
            </div>
        </div>
        <div v-if="editing" class="col-md-12">
            <div class="card text-center mb-3">
                <div class="card-body p-2 d-flex flex-row flex-wrap justify-content-between">
                    <div class="w-100 mb-1">
                        <small>Point buy</small>
                    </div>
                    <div class="flex-grow-1 border-right mb-0">
                        <h5 class="card-title mb-0">
                            {{ totalPointBuyCost }}
                        </h5>
                        <small class="card-subtitle">Used</small>
                    </div>
                    <div class="flex-grow-1 mb-0">
                        <h5 class="card-title mb-0">
                            27
                        </h5>
                        <small class="card-subtitle">Max</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
    name: "Scores",
    computed: {
        ...mapGetters({
            scores: 'scores',
            level: 'totalLevel'
        }),
        ...mapState({
            editing: state => state.unlocked.scores
        }),
        modifiedScores () {
            if (!this.bonuses) {
                return this.scores;
            }

            const modified = Object.assign({}, this.scores);
            const keys = Object.keys(this.bonuses);
            
            keys.forEach(key => 
                modified[key] += this.bonuses[key]
            );

            return modified;
        },
        proficiencyBonus () {
            return Math.floor(1.75+(this.level/4));
        },
        totalPointBuyCost () {
            let tally = 0;
            Object.keys(this.scores).forEach(key => {
                tally += this.pointBuyCost(this.scores[key])
            })

            return tally;
        }
    },
    methods: {
        modifier (input) {
            const output = Math.floor(input/2-5);
            if(output < 0) {
                return `${output}`;
            } else {
                return `+${output}`;
            }
        },
        pointBuyCost (input) {
            if (input > 13) {
                return input-6;
            } else {
                return input-8;
            }
        },
        scoreChange (input, value) {
            this.$store.commit('modifyScore', {stat: input, change: value});
        },
        titleKey (input) {
            return input.replace(/^./, input[0].toUpperCase());
        }
    }
}
</script>