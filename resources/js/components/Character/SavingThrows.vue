<template>
    <div id="saving-throws" class="card mb-3">
        <div class="card-body py-1">
            <h5 class="mt-3 text-center"><b>Saving throws</b></h5>
            <div v-for="(data, modifier) in savingThrows" :key="`${modifier}-${data.value}-${data.multiplier}`" class="dropdown">
                <button :id="`${modifier}-saving-throw-dropdown`" :disabled="!editing" class="py-0 mb-1 btn dropdown-toggle h-100 w-100 text-left d-flex flex-row align-items-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="mr-3 w-125 text-left">
                        +{{ data.value + data.multiplier * proficiencyBonus }}
                    </span>
                    <small class="mr-3 w-125 text-left">
                        <span v-if="data.multiplier > 0" class="text-success">
                            ✔
                        </span>
                        <span v-else class="text-muted">
                            ✖
                        </span>
                    </small>
                    <span class="flex-grow-1">
                        {{ capitalize(modifier) }}
                    </span>
                </button>
                <div :id="`saving-throw-level-${modifier}`" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button 
                        class="dropdown-item d-flex flex-row align-items-center justify-content-start px-3" 
                        type="button" 
                        :name="`unlearn-${modifier}`"
                        @click="setProficiency"
                        @keyup.enter.prevent="setProficiency"
                    >
                        <span class="flex-grow-1">No bonus</span> <span v-if="data.multiplier === 0" class="ml-2">✔</span>
                    </button>
                    <button 
                        class="dropdown-item d-flex flex-row align-items-center justify-content-start px-3" 
                        type="button" 
                        :name="`proficient-${modifier}`"
                        @click="setProficiency"
                        @keyup.enter.prevent="setProficiency"
                    >
                        <span class="flex-grow-1">Proficient</span> <span v-if="data.multiplier === 1" class="ml-2">✔</span>
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
    .dropdown-item span {
        pointer-events: none;
    }
</style>
<script>
import { mapGetters, mapState } from 'vuex';

export default {
    name: "SavingThrows",
    computed: {
        ...mapGetters({
            modifiers: 'modifiers',
            proficiencies: 'savingThrows',
            proficiencyBonus: 'proficiencyBonus',
        }),
        ...mapState({
            editing: state => state.unlocked.skills
        }),
        savingThrows () {
            const savingThrows = { ...this.modifiers };

            Object.keys(savingThrows).forEach(key => {
                savingThrows[key] = {
                    value: savingThrows[key],
                    multiplier: 0
                }
            });
            this.proficiencies.forEach(key => savingThrows[key].multiplier = 1);

            return savingThrows;
        }
    },
    methods: {
        capitalize (item) {
            return item.charAt(0).toUpperCase() + item.slice(1);
        },
        setProficiency (e) {
            const [action, name] = e.target.name.split('-');

            if (action === 'proficient') {
                this.$store.commit('addSavingThrow', name);
            } else {
                this.$store.commit('removeSavingThrow', name);
            }
        }
    }
}
</script>