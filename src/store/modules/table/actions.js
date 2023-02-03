import rows from '../data/data.json'

const actions = {
  getTableRows({ commit }) {
    rows.Items.map(row => {
      row.show = true
      row.primary = true
    })

    commit('setRows', rows.Items)
  },

  updateRows({ commit }, payload) {
    commit('setRows', payload)
  },

  updateYears({ commit }, payload) {
    commit('setYears', payload)
  },

  updateCompany({ commit }, payload) {
    commit('setCompany', payload)
  },

  updateCurrency({ commit }, payload) {
    commit('setCurrency', payload)
  },

  updateDisplay({ commit }, payload) {

    commit('setDisplay', payload)
  },

  updateDateOrder({ commit }, payload) {
    commit('setDateOrder', payload)
  },

  updateCompanyOrder({ commit }, payload) {
    commit('setCompanyOrder', payload)
  }
}

export default actions
