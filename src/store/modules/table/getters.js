const getters = {
  /**
   * Rows getter
   */
  [types.ROWS] (state) {
    return state.rows
  },

  /**
   * Filters getter
   */
  [types.FILTERS] (state) {
    return state.filters
  },
}

export default getters
