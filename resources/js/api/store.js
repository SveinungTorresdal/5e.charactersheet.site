import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

const api = axios.create({
    baseURL: window.location.origin,
    headers: {
        accept: 'application/json'
    }
});

const store = new Vuex.Store({
    state: {
        character: {
            alignment: null,
            background: null,
            charisma: null,
            class: null,
            constitution: null,
            copper: null,
            created_at: null,
            description: null,
            dexterity: null,
            electrum: null,
            external_id: null,
            gold: null,
            id: null,
            intelligence: null,
            name: null,
            platinum: null,
            player: null,
            race: null,
            sex: null,
            silver: null,
            strength: null,
            updated_at: null,
            user_id: null,
            wisdom: null,
        },
        characterChanges: {},
        unlocked: {
            basics: false,
            scores: false,
            wealth: false
        }
    },
    getters: {
        character: state => {
            return state.character;
        },
        basics: state => {
            const {name, sex, race, player, alignment, background} = state.character;
            return {name, sex, race, player, alignment, background};
        },
        getLocks: state => state.unlocked,
        levels: state => {
            const {levels} = state.character;
            return {levels};
        },
        scores: state => {
            const {strength, dexterity, constitution, intelligence, wisdom, charisma} = state.character;
            return {strength, dexterity, constitution, intelligence, wisdom, charisma};
        },
        totalLevel: state => {
            if(!state.character.levels) {
                return 0;
            }

            let sum = 0;
            this.levels.forEach(item => sum += item.level);

            return sum;
        },
        wealth: state => {
            return {copper, silver, electrum, gold, platinum} = state.character;
        }
    },
    mutations: {
        setCharacter (state, data) {
            state.character = data;
        },
        addCharacterChange (state, data) {
            try {
                state.characterChanges = {...state.characterChanges, ...data};
            } catch(exception) {
                console.error(exception);
            }
        },
        modifyScore (state, data) {
            const {stat, change} = data;
            try {
                state.character[stat] += change;

                const obj = {};
                obj[stat] = state.character[stat];
                state.characterChanges = {...state.characterChanges, ...obj};
            } catch(exception) {
                console.error(exception);
            }
        },
        toggleLock (state, data) {
            state.unlocked[data] != state.unlocked[data];
        }
    },
    actions: {
        getCharacter ({commit, state}) {
            api.get(window.location.pathname)
            .then(({data}) => {
                if(!data) {
                    throw("Character not found");
                }
                const {character} = data;
                commit('setCharacter', character);
            })
            .catch(exception => console.error(exception));
        },
        saveCharacter ({commit, state}) {
            console.log(state.characterChanges);
            api.patch(window.location.pathname + '/update', {character: state.characterChanges})
            .then(({data}) => {
                console.log(data);
            })
            .catch(exception => console.error(exception));
        }
    }
});

export default store;