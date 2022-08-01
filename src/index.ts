import Vue from 'vue';
import App from './app.vue';


const app = new Vue({
    render (h) {
        return h(App);
    }
});

app.$mount('#app');

