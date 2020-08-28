<template>
    <div id="skills" class="card mb-3">
        <div class="card-body py-1">
            <h5 class="mt-3 text-center"><b>Skills</b></h5>

            <div v-for="(data, skill) in skills" :key="`${skill}-${data.value}-${data.multiplier}`" class="dropdown">
                <button :id="`${skill}-dropdown`" :disabled="!editing" class="py-0 mb-1 btn dropdown-toggle h-100 w-100 text-left d-flex flex-row align-items-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="mr-3 w-125 text-left">
                        +{{ data.baseVal + data.multiplier * proficiencyBonus }}
                        <small>
                            <b v-if="data.advantage">
                                x2
                            </b>
                        </small>
                    </span>
                    <small class="mr-3 w-125 text-left">
                        <b v-if="data.multiplier > 1" class="text-success">
                            ✔<sup>2</sup>
                        </b>
                        <span v-else-if="data.multiplier > 0" class="text-success">
                            ✔
                        </span>
                        <span v-else class="text-muted">
                            ✖
                        </span>
                    </small>
                    <span class="flex-grow-1">
                        {{ data.name }}
                    </span>
                </button>
                <div :id="`proficiency-level-${skill}`" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button class="dropdown-item d-flex flex-row align-items-center justify-content-start px-3" type="button" :name="`unlearn-${skill}`">
                        <span class="flex-grow-1">No bonus</span> <span v-if="data.multiplier === 0" class="ml-2">✔</span>
                    </button>
                    <button class="dropdown-item d-flex flex-row align-items-center justify-content-start px-3" type="button" :name="`proficient-${skill}`">
                        <span class="flex-grow-1">Proficient</span> <span v-if="data.multiplier === 1" class="ml-2">✔</span>
                    </button>
                    <button class="dropdown-item d-flex flex-row align-items-center justify-content-start px-3" type="button" :name="`expertise-${skill}`">
                        <span class="flex-grow-1">Expertise</span> <span v-if="data.multiplier === 2" class="ml-2">✔</span>
                    </button>
                </div>
            </div>
        </div>
  </div>
</template>
<style scoped>
    .w-125 {
        width: 12.5% !important;
    }
    .btn:disabled {
        opacity: 1;
        cursor: initial;
    }
    .btn:disabled::after {
        display: none;
    }
</style>
<script>
import { mapGetters, mapState } from 'vuex';

export default {
    name: "Skills",
    data: () => {
        return {
            skillCategories: {
                charisma: [ 'Deception', 'Intimidation', 'Performance', 'Persuasion' ],
                constitution: [],
                dexterity: [ 'Acrobatics', 'Sleight of Hand', 'Stealth' ],
                intelligence: [ 'Arcana', 'History', 'Investigation', 'Nature', 'Religion' ],
                strength: [ 'Athletics' ],
                wisdom: [ 'Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival' ],
            }
        };
    },
    computed: {
        ...mapGetters({
            modifiers: 'modifiers',
            knownSkills: 'skills',
            level: 'totalLevel',
            proficiencyBonus: 'proficiencyBonus'
        }),
        ...mapState({
            editing: state => state.unlocked.skills
        }),
        skills () {
            const skills = {};

            Object.keys(this.skillCategories).forEach(stat => {
                this.skillCategories[stat].forEach(skill => {
                    const noSpaceName = skill.replace(/ /g, '');
                    skills[noSpaceName] = {
                        name: skill,
                        stat,
                        advantage: false,
                        baseVal: this.modifiers[stat],
                        multiplier: 0,
                        ...this.knownSkills[noSpaceName]
                    };
                })
            });

            const sorted = {};
            Object.keys(skills).sort().forEach(key => sorted[key] = skills[key]);

            return sorted;
        }
    }
}
</script>