import { readData, createData, searchData, editData, deleteData } from "../../api";

// initial state
const state = () => ({
    all: [],
    deleteDataItem: {},
    btnAddToggle: false,
    popUpCheck: false,
    alertCheck: false,
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
        createData(localStorage.getItem("token"), letter, frequency).then((res) => {
            commit('setData', [...state.all, { _id: res.data.data._id, letter, frequency }])
        })
    },
    editDataFunc({ commit }, { idData, letter, frequency }) {
        editData(localStorage.getItem("token"), idData, letter, frequency).then((res) => {
            commit('setData', res.data)
        })
    },
    deleteDataFunc({ commit }, idData ) {
        deleteData(localStorage.getItem("token"), idData).then((res) => {
            commit('setData', res.data)
        })
    },
    searchingData({ commit }, { letter, frequency }) {
        searchData(localStorage.getItem("token"), letter, frequency).then((res) => {
            commit('setData', res.data)
        })
    },
    changeDeleteDataItem({ commit }, data) {
        commit('setDeleteDataItem', data)
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
    setData(state, data) {
        state.all = data
    },
    setDeleteDataItem(state, data) {
        state.deleteDataItem = data
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