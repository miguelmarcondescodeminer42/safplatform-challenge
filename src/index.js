import { goods_list } from './data/goods_list.js'
import Cart from './lib/Cart.js'

let cart = new Cart()
cart.addGoods(goods_list)
let output = cart.formattedSummary()
alert(output)

var wrapper = document.getElementById('wrapper')

output.map((el) => {
  wrapper.insertAdjacentHTML('beforeend', `<p>${el}</p>`)
})
