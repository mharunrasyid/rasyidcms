import { readMap, createMap, searchMap, editMap, deleteMap } from "../../api";

// initial state
const state = () => ({
    all: [],
    deleteMapItem: {},
    alertMap: {},
    btnAddToggle: false,
    popUpCheck: false,
    alertCheck: false,
})

// getters
const getters = {}

// actions
const actions = {
    getMap({ commit }) {
        readMap(localStorage.getItem("token"))
            .then((res) => {
                commit('setMap', res.data)
            })
            .catch((err) => {
                return console.log(err);
            });
    },
    addMap({ commit, state }, { title, lat, lng }) {
        createMap(localStorage.getItem("token"), title, lat, lng).then((res) => {
            commit('setMap', [...state.all, { _id: res.data.data._id, title, lat, lng }])
        })
    },
    editMapFunc({ commit }, { idMap, title, lat, lng }) {
        editMap(localStorage.getItem("token"), idMap, title, lat, lng).then((res) => {
            commit('setMap', res.data)
        })
    },
    deleteMapFunc({ commit }, idMap ) {
        deleteMap(localStorage.getItem("token"), idMap).then((res) => {
            commit('setMap', res.data)
        })
    },
    searchingMap({ commit }, title ) {
        searchMap(localStorage.getItem("token"), title).then((res) => {
            commit('setMap', res.data)
        })
    },
    alertMapFunc({ commit }, data) {
        commit('setAlertMap', data)
    },
    changeDeleteMapItem({ commit }, data) {
        commit('setDeleteMapItem', data)
    },
    changeBtnAddToggle({ commit }, toggle) {
        commit('setBtnAddToggle', toggle)
    },
    changePopUpCheck({ commit }, toggle) {
        commit('setPopUpCheck', toggle)
    },
    changeAlertCheck({ commit }, toggle) {
        commit('setAlertCheck', toggle)
    }
}

// mutations
const mutations = {
    setMap(state, data) {
        state.all = data
    },
    setAlertMap(state, data) {
        state.alertMap = data
    },
    setDeleteMapItem(state, data) {
        state.deleteMapItem = data
    },
    setBtnAddToggle(state, toggle) {
        state.btnAddToggle = toggle
    },
    setPopUpCheck(state, toggle) {
        state.popUpCheck = toggle
    },
    setAlertCheck(state, toggle) {
        state.alertCheck = toggle
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}