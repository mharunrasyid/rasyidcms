import { readData, createData,searchData } from "../../api";

// initial state
const state = () => ({
    all: [],
    btnAddToggle: false
})

// getters
const getters = {}

// actions
const actions = {
    getData({ commit }) {
        readData(localStorage.getItem("token"))
            .then((res) => {
                commit('setData', res.data)
            })
            .catch((err) => {
                return console.log(err);
            });
    },
    addData({ commit, state }, { letter, frequency }) {
        createData(localStorage.getItem("token"), letter, frequency).then(() => {
            commit('setData', [...state.all, { letter, frequency }])
        })
    },
    searchingData({ commit }, { letter, frequency }) {
        searchData(localStorage.getItem("token"), letter, frequency).then((res) => {
            commit('setData', res.data)
        })
    },
    changeBtnAddToggle({ commit }, toggle) {
        commit('setBtnAddToggle', toggle)
    },
}

// mutations
const mutations = {
    setData(state, data) {
        state.all = data
    },
    setBtnAddToggle(state, toggle) {
        state.btnAddToggle = toggle
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}