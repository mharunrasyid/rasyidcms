import { createStore } from 'vuex'
import data from './modules/data'

const store = createStore({
    modules: {
        data
    }
})

export default store;