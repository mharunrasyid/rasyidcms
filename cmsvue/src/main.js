import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookmark, faSignal, faChartPie, faChartBar, faGlobeAmericas, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'

library.add(faBookmark, faSignal, faChartPie, faChartBar, faGlobeAmericas, faUser)

createApp(App)
    .component('fa', FontAwesomeIcon)
    .mount('#app')
