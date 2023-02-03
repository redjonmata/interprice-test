<template>
  <div class="container">
    <div class="row mb-4 text-left">
      <div class="col-md-3">
        <button class="btn btn-default"
                @click="$store.dispatch('updateCurrency','USD')"
                v-bind:class="{'active': filters.currency === 'USD'}"
        >
          USD
        </button>
        <button class="btn btn-default"
                @click="$store.dispatch('updateCurrency','EUR')"
                v-bind:class="{'active': filters.currency === 'EUR'}"
        >
          EUR
        </button>
        <button class="btn btn-default"
                @click="$store.dispatch('updateCurrency','CAD')"
                v-bind:class="{'active': filters.currency === 'CAD'}"
        >
          CAD
        </button>
      </div>
      <div class="col-md-3">
        <button class="btn btn-default"
                @click="addYears(5)"
                v-bind:class="{'active': filters.years.includes(5)}"
        >
          5 YRS
        </button>
        <button class="btn btn-default"
                @click="addYears(10)"
                v-bind:class="{'active': filters.years.includes(10)}"
        >
          10 YRS
        </button>
        <button class="btn btn-default"
                @click="addYears(40)"
                v-bind:class="{'active': filters.years.includes(40)}"
        >
          40 YRS
        </button>
      </div>
      <div class="col-md-3">
        <button class="btn btn-default"
                @click="toggleDisplay('Spread')"
                v-bind:class="{'active': filters.display === 'Spread'}"
        >
          Spread
        </button>
        <button class="btn btn-default"
                @click="toggleDisplay('Yield')"
                v-bind:class="{'active': filters.display === 'Yield'}"
        >
          Yield
        </button>
        <button class="btn btn-default"
                @click="toggleDisplay('3MLSpread')"
                v-bind:class="{'active': filters.display === '3MLSpread'}"
        >
          3MLSpread
        </button>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-md-4">
        <input class="form-control" v-model="filters.company" id="company" placeholder="Filter by company name..."/>
      </div>
    </div>

    <div class="row">
      <table class="table">
        <thead>
        <tr>
          <th class="order" @click="toggleDateOrder">
            Date Sent
            <i v-if="filters.date_order === 'desc'" class="bi bi-caret-down-fill"></i>
            <i v-else-if="filters.date_order === 'asc'" class="bi bi-caret-up-fill"></i>
            <i v-else class="bi bi-caret-up-fill text-black-50"></i>
          </th>
          <th class="order" @click="toggleCompanyOrder">
            Company
            <i v-if="filters.company_order === 'desc'" class="bi bi-caret-down-fill"></i>
            <i v-else-if="filters.company_order === 'asc'" class="bi bi-caret-up-fill"></i>
            <i v-else class="bi bi-caret-up-fill text-black-50"></i>
          </th>
          <th v-if="filters.years.includes(5)">
            5 YRS
            <hr/>
            <div class="row">
              <div class="col-md-3"></div>
              <span class="col-md-3 font-weight-light">FIX</span>
              <span class="col-md-3 font-weight-light">FRN</span>
              <div class="col-md-3"></div>
            </div>
          </th>
          <th v-if="filters.years.includes(10)">
            10 YRS
            <hr/>
            <div class="row">
              <div class="col-md-3"></div>
              <span class="col-md-3 font-weight-light">FIX</span>
              <span class="col-md-3 font-weight-light">FRN</span>
              <div class="col-md-3"></div>
            </div>
          </th>
          <th v-if="filters.years.includes(40)">
            40 YRS
            <hr/>
            <div class="row">
              <div class="col-md-3"></div>
              <span class="col-md-3 font-weight-light">FIX</span>
              <span class="col-md-3 font-weight-light">FRN</span>
              <div class="col-md-3"></div>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, index) in rows" v-if="row.show === true">
          <td v-if="row.Quote !== null">
            <i v-if="row.show === true && row.primary === true"
               class="bi font-weight-bold"
               v-bind:class="{'bi-chevron-right': rows[index + 1].show === false, 'bi-chevron-down': rows[index + 1].show === true}"
               @click="toggleRows(row.Company)">
            </i>
            <span v-bind:class="{'ml-4': row.primary === false}">{{ formatDate(row.DateSent) }}</span>
          </td>
          <td v-else></td>
          <td
            v-bind:class="{'font-weight-bold': row.Quote !== null && row.primary === true, 'font-weight-bold text-black-50': row.Quote === null}">
            {{ row.primary === true ? row.Company : row.display }}
          </td>
          <td v-if="filters.years.includes(5)">
            <div class="row">
              <div class="col-md-3"></div>
              <span class="col-md-3 values" v-bind:class="{'highlight': checkHighlight(index,5, 'FIX')}">
                    {{ row.primary === true ? getQuote(index, 5, "FIX") : getSecondaryQuote(index, 5, "FIX", row.display) }}
                  </span>
              <span class="col-md-3 values" v-bind:class="{'highlight': checkHighlight(index,5, 'FRN')}">
                    {{ row.primary === true ? getQuote(index, 5, "FRN") : getSecondaryQuote(index, 5, "FRN", row.display) }}
                  </span>
              <div class="col-md-3"></div>
            </div>
          </td>
          <td v-if="filters.years.includes(10)">
            <div class="row">
              <div class="col-md-3"></div>
              <span class="col-md-3 values" v-bind:class="{'highlight': checkHighlight(index,10, 'FIX')}">
                    {{ row.primary === true ? getQuote(index, 10, "FIX") : getSecondaryQuote(index, 10, "FIX", row.display) }}
                  </span>
              <span class="col-md-3 values" v-bind:class="{'highlight': checkHighlight(index,10, 'FRN')}">
                    {{ row.primary === true ? getQuote(index, 10, "FRN") : getSecondaryQuote(index, 10, "FRN", row.display) }}
                  </span>
              <div class="col-md-3 values"></div>
            </div>
          </td>
          <td v-if="filters.years.includes(40)">
            <div class="row">
              <div class="col-md-3"></div>
              <span class="col-md-3 values" v-bind:class="{'highlight': checkHighlight(index,40, 'FIX')}">
                    {{ row.primary === true ? getQuote(index, 40, "FIX") : getSecondaryQuote(index, 40, "FIX", row.display) }}
                  </span>
              <span class="col-md-3 values" v-bind:class="{'highlight': checkHighlight(index,40, 'FRN')}">
                    {{ row.primary === true ? getQuote(index, 40, "FRN") : getSecondaryQuote(index, 40, "FRN", row.display) }}
                  </span>
              <div class="col-md-3"></div>
            </div>
          </td>
        </tr>
        <tr class="border">
          <td></td>
          <td>Average by {{ filters.display }}</td>
          <td v-if="filters.years.includes(5)">
            <div class="row">
              <div class="col-md-3"></div>
              <span class="col-md-3">{{ getAverage(5, "FIX") }}</span>
              <span class="col-md-3">{{ getAverage(5, "FRN") }}</span>
              <div class="col-md-3"></div>
            </div>
          </td>
          <td v-if="filters.years.includes(10)">
            <div class="row">
              <div class="col-md-3"></div>
              <span class="col-md-3">{{ getAverage(10, "FIX") }}</span>
              <span class="col-md-3">{{ getAverage(10, "FRN") }}</span>
              <div class="col-md-3"></div>
            </div>
          </td>
          <td v-if="filters.years.includes(40)">
            <div class="row">
              <div class="col-md-3"></div>
              <span class="col-md-3">{{ getAverage(40, "FIX") }}</span>
              <span class="col-md-3">{{ getAverage(40, "FRN") }}</span>
              <div class="col-md-3"></div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
Array.prototype.insert = function (index, items) {
  this.splice.apply(this, [index, 0].concat(items));
}

export default {
  name: "Table",

  data() {
    return {}
  },

  methods: {
    toggleDateOrder() {
      if (this.filters.date_order === null) {
        this.$store.dispatch('updateDateOrder', 'desc')
      } else if (this.filters.date_order === 'desc') {
        this.$store.dispatch('updateDateOrder', 'asc')
      } else {
        this.$store.dispatch('updateDateOrder', null)
      }
    },

    toggleCompanyOrder() {
      if (this.filters.company_order === null) {
        this.$store.dispatch('updateCompanyOrder', 'desc')
      } else if (this.filters.company_order === 'desc') {
        this.$store.dispatch('updateCompanyOrder', 'asc')
      } else {
        this.$store.dispatch('updateCompanyOrder', null)
      }
    },

    formatDate(date) {
      if (date) {
        return moment(date).format('DD-MMM-YY')
      }

      return ''
    },

    addYears(year) {
      this.$store.dispatch('updateYears', year)
    },

    getQuote(index, years, couponType, highlight = null) {
      let row = this.rows[index]

      if (row && row['Quote'] !== null) {
        let quote = row['Quote'].find(item => {
          return item.Years === years && item.CouponType === couponType && item.Currency === this.filters.currency
        })

        if (quote !== undefined) {
          if (quote[this.filters.display] === null) {
            return ''
          }

          switch (this.filters.display) {
            case 'Yield':
              if (highlight) {
                return quote
              }
              return quote[this.filters.display] + '%'
              break

            default:
              if (highlight) {
                return quote
              }
              return '+' + quote[this.filters.display] + 'bp'
          }
        }
      }

      return ''
    },

    getSecondaryQuote(index, years, couponType) {
      let row = this.rows[index]

      if (row && row['Quote'] !== null) {
        let quote = row['Quote'].find(item => {
          return item.Years === years && item.CouponType === couponType && item.Currency === this.filters.currency
        })

        if (quote !== undefined) {
          if (quote[row.display] === null) {
            return ''
          }

          switch (row.display) {
            case 'Yield':
              return quote[row.display] + '%'
              break

            default:
              return '+' + quote[row.display] + 'bp'
          }
        }
      }

      return ''
    },

    getAverage(years, couponType) {
      let quotes = []
      this.rows.forEach(item => {
        if (item.Quote !== null && item.primary === true) {
          item.Quote.forEach(quote => {
            if (quote[this.filters.display] !== null) {
              if (quote.Years === years && quote.CouponType === couponType && quote.Currency === this.filters.currency) {
                quotes.push(quote)
              }
            }
          })
        }
      })

      if (quotes.length > 0) {
        let average
        switch (this.filters.display) {
          case 'Yield':
            average = quotes.reduce((total, quote) => total + quote.Yield, 0) / quotes.length
            average = Number.isInteger(average) ? average : average.toFixed(2)

            return average + '%'
            break

          default:
            average = quotes.reduce((total, quote) => total + quote[this.filters.display], 0) / quotes.length
            average = Number.isInteger(average) ? average : average.toFixed(2)

            return '+' + average + 'bp'
        }
      }
    },

    checkHighlight(index, years, couponType) {
      let currentQuote = this.getQuote(index, years, couponType, true)

      if (currentQuote === '') {
        return false
      }

      let quotes = []
      this.rows.forEach(item => {
        if (item.Quote !== null && item.primary === true) {
          item.Quote.forEach(quote => {
            if (quote[this.filters.display] !== null) {
              if (quote.Years === years && quote.CouponType === couponType && quote.Currency === this.filters.currency) {
                quotes.push(quote)
              }
            }
          })
        }
      })

      if (quotes.length > 0) {
        let minimum
        switch (this.filters.display) {
          case 'Yield':
            minimum = quotes.reduce((prev, curr) => {
              return prev.Yield < curr.Yield ? prev : curr
            })
            break

          default:
            minimum = quotes.reduce((prev, curr) => {
              return prev[this.filters.display] < curr[this.filters.display] ? prev : curr
            })
        }

        if (currentQuote === minimum) {
          return true
        }
      }

      return false
    },

    sort(newVal, type) {
      let v = this
      if (newVal === null) {
        return
      }

      let clonedRows = _.cloneDeep(v.rows)

      if (newVal === 'desc') {
        let sortedRows = clonedRows.sort(function (a, b) {
          if (a.Quote === null) {
            return 1;
          }
          if (b.Quote === null) {
            return -1;
          }

          if (type === 'company') {
            return b.Company.localeCompare(a.Company)
          }

          return moment(b.DateSent) - moment(a.DateSent)
        })

        this.$store.dispatch('updateRows', sortedRows)
      } else if (newVal === 'asc') {
        let sortedRows = clonedRows.sort(function (a, b) {
          if (a.Quote === null) {
            return 1;
          }
          if (b.Quote === null) {
            return -1;
          }

          if (type === 'company') {
            return a.Company.localeCompare(b.Company)
          }

          return moment(a.DateSent) - moment(b.DateSent)
        })

        this.$store.dispatch('updateRows', sortedRows)
      }
    },

    toggleRows(company) {
      let rows = _.cloneDeep(this.rows)

      rows.forEach(function (row) {
        if (row.Company === company && row.primary === false) {
          row.show = !row.show
        }
      })

      this.$store.dispatch('updateRows', rows)
    },

    toggleDisplay(display) {
      this.$store.dispatch('updateDisplay', display)

      this.adjustDisplay(true)
    },

    adjustDisplay(display = false) {
      let clonedRows = _.cloneDeep(this.rows)

      let displays = ['Spread', 'Yield', '3MLSpread']
      let inactiveDisplays = displays.filter(item => {
        return item !== this.filters.display
      })

      let toAdd = []
      clonedRows.filter(item => item.primary === true).forEach((row, index) => {
        if (row.Quote !== null) {
          let row1 = _.cloneDeep(row)
          let row2 = _.cloneDeep(row)

          row1.display = inactiveDisplays[0]
          row1.show = false
          row1.primary = false

          row2.display = inactiveDisplays[1]
          row2.show = false
          row2.primary = false
          toAdd[index] = [row1, row2]
        }
      })

      let insertIndex = 1
      toAdd.forEach((add, index) => {
        if (display) {
          clonedRows.splice(insertIndex, 2)
        }
        clonedRows.insert(insertIndex, add)
        insertIndex += 3
      })

      this.$store.dispatch('updateRows', clonedRows)
    }
  },

  watch: {
    'filters.company': function (newVal, oldVal) {
      let v = this

      this.$store.dispatch('getTableRows')
      this.adjustDisplay()

      let clonedRows = _.cloneDeep(v.rows)

      let lowerNewVal = newVal.toLowerCase()

      if (lowerNewVal !== oldVal) {
        let rows = clonedRows.filter(item => {
          return item.Company.toLowerCase().includes(lowerNewVal)
        })

        this.$store.dispatch('updateRows', rows)
      }
    },

    'filters.date_order': function (newVal, oldVal) {
      this.sort(newVal,'date');
    },

    'filters.company_order': function (newVal, oldVal) {
      this.sort(newVal,'company')
    }
  },

  created() {
    this.$store.dispatch('getTableRows')

    this.adjustDisplay()
  },

  computed: {
    ...mapGetters({
      rows: types.ROWS,
      filters: types.FILTERS,
    }),

    'filters.company': {
      get () {
        return this.$store.state.filters.company
      },
      set (value) {
        this.$store.dispatch('updateCompany', value)
      }
    },
  }
}
</script>

<style scoped>
.btn {
  border: 1px solid #527094;
}

.btn-default {
  background-color: #ffff;
  color: #527094;
}

.btn-default.active {
  background-color: #527094;
  color: #ffff;
}

.highlight {
  background-color: #f5f5ab;
}

span.values {
  padding: 3px;
}

.table th, .table td {
  padding: 0.5rem;
}

.bi {
  cursor: pointer;
  -webkit-text-stroke: 1px;
}

th.order {
  cursor: pointer;
}
</style>
