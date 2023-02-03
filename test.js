Array.prototype.insert = function (index, items) {
  this.splice.apply(this, [index, 0].concat(items));
}
//
let array = [
  {Items: [1, 2, 3]},
  {Items: [4, 5, 6]},
  {Items: [7, 8, 9]},
  {Items: [10, 11, 12]}
]

array.splice(1, 2)
console.log(array)
//
// array.insert(1, [
//   {Items: [55, 66, 77]},
//   {Items: [88, 99]},
// ])
//
// console.log(array)

// let displays = ['Spread', 'Yield', '3MLSpread']
// let inactive = displays.filter(item => {
//   return item !== 'Spread'
// })
//
// console.log(inactive)
