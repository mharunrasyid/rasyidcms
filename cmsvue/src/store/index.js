import { createStore } from 'vuex'
import data from './modules/data'
import dataDate from './modules/dataDate'
import map from './modules/map'

const store = createStore({
    modules: {
        data,
        dataDate,
        map
    }
})

export default store;