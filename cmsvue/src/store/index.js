import { createStore } from 'vuex'
import data from './modules/data'
import dataDate from './modules/dataDate'

const store = createStore({
    modules: {
        data, dataDate
    }
})

export default store;