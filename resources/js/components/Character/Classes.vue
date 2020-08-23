<template>
    <div id="classes" class="row">
        <div class="col d-flex flex-row justify-content-end">
            <div class="card ml-3">
                <div class="card-body p-2">
                    <h5 class="mb-0 d-flex flex-row align-items-center">
                        <i class="class-icon sorcerer mr-2" />
                        Sorcerer
                        <span class="badge badge-dark position-static ml-2">4</span>
                    </h5>
                </div>
            </div>
            <div class="card ml-3">
                <div class="card-body p-2">
                    <h5 class="mb-0 d-flex flex-row align-items-center">
                        <i class="class-icon warlock mr-2" />
                        Warlock
                        <span class="badge badge-dark position-static ml-2">4</span>
                    </h5>
                </div>
            </div>
            <div class="dropdown ml-3">
                <button id="classes-level-up" class="btn btn-dark dropdown-toggle h-100" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    +
                </button>
                <div id="available-classes" class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <button v-for="(playerClass, index) in availableClasses" :key="`${index}_${playerClass}`" class="dropdown-item d-flex flex-row align-items-center justify-content-start px-3" type="button">
                        <i class="class-icon mr-2" :class="playerClass.toLowerCase()" /> {{ playerClass }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
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
export default {
    name: "Classes",
    data () {
        return {
            availableClasses: [ 'Artificer', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard' ]
        }
    }
}
</script>