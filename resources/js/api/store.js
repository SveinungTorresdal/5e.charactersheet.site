import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import * as Races from '../data/races/';

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
        levels: [],
        levelChanges: {},
        skills: {
        },
        skillChanges: {},
        unlocked: {
            basics: false,
            scores: false,
            levels: false,
            wealth: false
        },
        loading: {
            character: true,
            updating: false
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
            const {levels} = state;

            const sorted = {};
            Object.keys(levels).sort().forEach(key => sorted[key] = levels[key]);
            
            return sorted;
        },
        modifiers: (state, getters) => {
            const modifier = input => Math.floor(input/2-5);
            const scores = getters.scores;

            const modifiers = {};
            Object.keys(scores).forEach(score => {
                modifiers[score] = modifier(scores[score]);
            });

            return modifiers;
        },
        proficiencyBonus: (state, getters) => {
            return Math.floor(1.75+(getters.totalLevel/4));
        },
        scores: state => {
            const {strength, dexterity, constitution, intelligence, wisdom, charisma} = state.character;
            return {strength, dexterity, constitution, intelligence, wisdom, charisma};
        },
        skills: state => state.skills,
        startingClass: state => {
            return state.character.class;
        },
        totalLevel: state => {
            if(!state.levels) {
                return 0;
            }

            let sum = 0;
            Object.values(state.levels).forEach(item => sum += item.level);

            return sum;
        },
        wealth: state => {
            return {copper, silver, electrum, gold, platinum} = state.character;
        }
    },
    mutations: {
        addCharacterChange (state, data) {
            try {
                state.characterChanges = {...state.characterChanges, ...data};
            } catch(exception) {
                console.error(exception);
            }
        },
        addCharacterClass (state, data) {
            if (!state.character.class) {
                state.character.class = data;
            }

            const existing = state.levels[data];
            const newClass = {
                id: null,
                character_id: state.character.id,
                class: data,
                level: 0,
                ...existing
            };
            newClass.level++;
            delete newClass.created_at;
            delete newClass.updated_at;

            
            console.log(newClass);

            state.levels = {
                ...state.levels,
                [data]: newClass
            };
            state.levelChanges = {
                ...state.levelChanges,
                [data]: newClass
            };
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
        setCharacter (state, data) {
            state.character = data;
        },
        setLevels (state, data) {
            const arrayToObject = (array, keyField) =>
                array.reduce((obj, item) => {
                    obj[item[keyField]] = item
                    return obj
                }, {})

            state.levels = arrayToObject(data, 'class');
        },
        setLoading (state, { key, value }) {
            state.loading[key] = value;
        },
        toggleLock (state, data) {
            state.unlocked[data] != state.unlocked[data];
        }
    },
    actions: {
        getCharacter ({commit, state}) {
            commit('setLoading', { key: 'character', value: true });

            api.get(window.location.pathname)
            .then(({data}) => {
                if(!data) {
                    throw("Character not found");
                }
                console.log(data);
                const {character, levels} = data;
                commit('setCharacter', character);
                commit('setLevels', levels);
            })
            .catch(exception => console.error(exception))
            .finally(() => {
                commit('setLoading', { key: 'character', value: false });
            });
        },
        saveCharacter ({commit, state}) {
            commit('setLoading', { key: 'updating', value: true });
            
            api.patch(window.location.pathname + '/update', {
                character: state.characterChanges,
                levels: Object.values(state.levelChanges)
            })
            .then(({data}) => {
                console.log(data);
            })
            .catch(exception => console.error(exception))
            .finally(() => {
                commit('setLoading', { key: 'updating', value: false });
            });
        }
    }
});

export default store;