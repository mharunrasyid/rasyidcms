import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookmark, faSignal, faChartPie, faChartBar, faGlobeAmericas, faUser, faPlus, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'

library.add(faBookmark, faSignal, faChartPie, faChartBar, faGlobeAmericas, faUser, faPlus, faPen, faTrashAlt )

createApp(App).use(router).use(store)
    .component('fa', FontAwesomeIcon)
    .mount('#app')
