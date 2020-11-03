const SALES_TAX_EXEMPT = ['book', 'food', 'medical', 'chocolate', 'pill']
const NAME_REGEX = /(?<=[0-9] )(.*)(?= at )/
const BASIC_TAX_RATE = 10
const IMPORTED_TAX_RATE = 5

export default class Cart {
  goods_list = []
  sales_taxes = 0.0
  total = 0.0
  formatted_response = []

  addGoods(items_list) {
    items_list.map((item, index) => {
      const splitted_item = item.split(' ')

      let obj_item = {
        id: index + 1,
        name: new RegExp(NAME_REGEX).exec(item)[0],
        quantity: parseInt(splitted_item[0]),
        price: parseFloat(splitted_item[splitted_item.length - 1]),
        exempt: new RegExp(SALES_TAX_EXEMPT.join('|')).test(item),
      }

      this.goods_list.push(obj_item)
    })
  }

  calcTaxes() {
    this.goods_list.map((goods) => {
      this.applySalesTaxes(goods)
    })

    console.log(this.goods_list)

    return this.formattedSummary()
  }

  applySalesTaxes(goods) {
    if (typeof goods !== 'object') {
      throw new Error('Can not apply taxes, product format not compatible.')
    }

    let item = this.goods_list.find((item) => item.id === goods.id)

    if (item.exempt) {
      item.taxes = 0.0
    } else {
      item.taxes = this.roundingRule(BASIC_TAX_RATE, item.price)
    }
    item.total =
      (parseFloat(item.price) + parseFloat(item.taxes)).toFixed(2) *
      item.quantity

    this.updateSalesTaxes(item.taxes, item.quantity)
    this.updateTotal(item.total)
  }

  roundingRule(tax_rate, item_price) {
    const rouding_rule = (tax_rate * item_price) / 100
    // console.log('rounding rule', rouding_rule)

    return rouding_rule.toFixed(2)
  }

  updateSalesTaxes(item_taxes, item_quantity) {
    this.sales_taxes += item_taxes * item_quantity
    this.sales_taxes = this.sales_taxes.toFixed(2)
  }

  updateTotal(item_total) {
    this.total += item_total
  }

  formattedSummary() {
    this.goods_list.map((item) => {
      this.formatted_response.push(
        `${item.quantity} ${item.name}: ${item.total}`,
      )
    })

    this.formatted_response.push(`Sales Taxes: ${this.sales_taxes}`)
    this.formatted_response.push(`Total: ${this.total}`)

    console.log('formatted response', this.formatted_response)
    return this.formatted_response
  }
}
