/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import store from './api/store';

Vue.use(VueAxios, axios);

import Character from './components/Character.vue';

const app = new Vue({
    el: '#app',
    store,
    components: {
        Character
    }
});
