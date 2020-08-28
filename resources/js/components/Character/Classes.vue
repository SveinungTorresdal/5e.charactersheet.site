<template>
    <div id="classes" class="row mb-3">
        <div class="col d-flex flex-row justify-content-end">
            <div class="card flex-grow-1 blank d-none d-md-flex">

            </div>
            <div v-for="level in levels" :key="`${level.class}-${level.level}`" class="card ml-3">
                <div class="card-body p-2">
                    <h5 class="mb-0 d-flex flex-row align-items-center">
                        <i class="class-icon mr-2" :class="level.class.toLowerCase()" />
                        {{ level.class }}
                        <span class="badge badge-dark position-static ml-2"><span v-if="level.class === startingClass">★</span> {{ level.level }}</span>
                    </h5>
                </div>
            </div>

            <div class="dropdown ml-3" v-if="editing">
                <button id="classes-level-up" class="btn btn-dark dropdown-toggle h-100" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    +
                </button>
                <div id="available-classes" class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <button v-for="(playerClass, index) in availableClasses" :key="`${index}_${playerClass}`" @click="addClass" :name="playerClass" class="dropdown-item d-flex flex-row align-items-center justify-content-start px-3" type="button">
                        <i class="class-icon mr-2" :class="playerClass.toLowerCase()" /> {{ playerClass }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .blank {
        border-style: dotted;
        background: none;
        opacity: .5;
    }
    #classes-level-up {
        width: 2.5rem;
    }
    #classes-level-up:after {
        content: none;
    }
    #available-classes {
        border-top-right-radius: 0;
    }
</style>
<script>
import { mapGetters, mapState } from 'vuex';

export default {
    name: "Classes",
    data () {
        return {
            availableClasses: [ 'Artificer', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard' ]
        }
    },
    computed: {
        ...mapGetters({
            character: 'character',
            levels: 'levels',
            startingClass: 'startingClass'
        }),
        ...mapState({
            editing: state => state.unlocked.levels
        })
    },
    methods: {
        addClass(e) {
            this.$store.commit('addCharacterClass', e.target.name);
            e.stopPropagation();
        }
    }
}
</script>