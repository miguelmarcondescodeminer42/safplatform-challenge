const SALES_TAX_EXEMPT = ['book', 'food', 'medical', 'chocolate', 'pill']
const NAME_REGEX = /(?<=[0-9] )(.*)(?= at )/
const BASIC_TAX_RATE = 10
const IMPORTED_TAX_RATE = 5
const ROUNDING_NUMBER = 0.05

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
        imported: item.includes('imported'),
      }

      this.goods_list.push(obj_item)
    })
  }

  calcTaxes() {
    this.goods_list.map((goods) => {
      this.applySalesTaxes(goods)
    })

    return this.formattedSummary()
  }

  applySalesTaxes(goods) {
    if (typeof goods !== 'object') {
      throw new Error('Can not apply taxes, product format not compatible.')
    }

    let item = this.goods_list.find((item) => item.id === goods.id)
    let impoted_taxes = item.imported ? IMPORTED_TAX_RATE : 0.0

    if (item.exempt) {
      item.taxes = this.roundingRule(impoted_taxes, item.price)
    } else {
      item.taxes = this.roundingRule(impoted_taxes + BASIC_TAX_RATE, item.price)
    }

    item.total =
      (parseFloat(item.price) + parseFloat(item.taxes)).toFixed(2) *
      item.quantity

    this.updateSalesTaxes(item.taxes, item.quantity)
    this.updateTotal(item.total)
  }

  roundingRule(tax_rate, item_price) {
    var rouding_rule = (tax_rate * item_price) / 100
    var item_price_with_tax = (rouding_rule + item_price).toFixed(1)
    var diff = rouding_rule + item_price - item_price_with_tax

    if (diff > 0 && diff < ROUNDING_NUMBER) {
      rouding_rule = parseFloat(item_price_with_tax) + ROUNDING_NUMBER
      rouding_rule = rouding_rule - item_price
    }

    return rouding_rule.toFixed(2)
  }

  updateSalesTaxes(item_taxes, item_quantity) {
    this.sales_taxes =
      parseFloat(this.sales_taxes) + parseFloat(item_taxes * item_quantity)
    this.sales_taxes = this.sales_taxes.toFixed(2)
  }

  updateTotal(item_total) {
    this.total += item_total
  }

  formattedSummary() {
    this.goods_list.map((item) => {
      this.formatted_response.push(
        `${item.quantity} ${item.name}: ${item.total.toFixed(2)}`,
      )
    })

    this.formatted_response.push(`Sales Taxes: ${this.sales_taxes}`)
    this.formatted_response.push(`Total: ${this.total}`)

    return this.formatted_response
  }
}
