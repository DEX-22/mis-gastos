import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import VueSweetAlert2 from 'vue-sweetalert2'

import './assets/main.css'


import 'sweetalert2/dist/sweetalert2.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App)
    .use(createPinia())
    .use(VueSweetAlert2)
    .mount('#app')
