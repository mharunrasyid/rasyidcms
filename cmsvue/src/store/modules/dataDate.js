import { readDataDate, createDataDate, searchDataDate, editDataDate, deleteDataDate } from "../../api";

// initial state
const state = () => ({
    all: [],
    deleteDataDateItem: {},
    alertDataDate: {},
    btnAddToggle: false,
    popUpCheck: false,
    alertCheck: false,
})

// getters
const getters = {}

// actions
const actions = {
    getDataDate({ commit }) {
        readDataDate(localStorage.getItem("token"))
            .then((res) => {
                commit('setDataDate', res.data)
            })
            .catch((err) => {
                return console.log(err);
            });
    },
    addDataDate({ commit, state }, { letter, frequency }) {
        createDataDate(localStorage.getItem("token"), letter, frequency).then((res) => {
            commit('setDataDate', [...state.all, { _id: res.data.data._id, letter, frequency }])
        })
    },
    editDataDateFunc({ commit }, { idDataDate, letter, frequency }) {
        editDataDate(localStorage.getItem("token"), idDataDate, letter, frequency).then((res) => {
            commit('setDataDate', res.data)
        })
    },
    deleteDataDateFunc({ commit }, idDataDate ) {
        deleteDataDate(localStorage.getItem("token"), idDataDate).then((res) => {
            commit('setDataDate', res.data)
        })
    },
    searchingDataDate({ commit }, { letter, frequency }) {
        searchDataDate(localStorage.getItem("token"), letter, frequency).then((res) => {
            commit('setDataDate', res.data)
        })
    },
    alertDataDateFunc({ commit }, data) {
        commit('setAlertDataDate', data)
    },
    changeDeleteDataDateItem({ commit }, data) {
        commit('setDeleteDataDateItem', data)
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
    setDataDate(state, data) {
        state.all = data
    },
    setAlertDataDate(state, data) {
        state.alertDataDate = data
    },
    setDeleteDataDateItem(state, data) {
        state.deleteDataDateItem = data
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