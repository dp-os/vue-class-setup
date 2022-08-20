import Vue from 'vue'
import './style.css'
import App from './App.vue'

const app = new Vue({
    render(h) {
        return h(App);
    }
})
app.$mount('#app')
