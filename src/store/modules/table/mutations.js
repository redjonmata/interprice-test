const mutations = {
  setRows(state, payload) {
    state.rows = payload
  },

  setYears(state, payload) {
    if (!state.filters.years.includes(payload)) {
      state.filters.years.push(payload)
    } else {
      state.filters.years.splice(state.filters.years.indexOf(payload), 1)
    }
  },

  setCompany(state, payload) {
    state.filters.company = payload
  },

  setCurrency(state, payload) {
    state.filters.currency = payload
  },

  setDisplay(state, payload) {
    state.filters.display = payload
  },

  setDateOrder(state, payload) {
    state.filters.date_order = payload
  },

  setCompanyOrder(state, payload) {
    state.filters.company_order = payload
  }
}

export default mutations
