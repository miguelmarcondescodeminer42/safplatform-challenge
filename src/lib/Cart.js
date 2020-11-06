import Product from './Product'

const SALES_TAX_EXEMPT = ['book', 'food', 'medical', 'chocolate', 'pill'],
  NAME_REGEX = /(?<=[0-9] )(.*)(?= at )/

export default class Cart {
  products_list = []
  sales_taxes = 0.0
  total = 0.0
  formatted_response = []

  addGoods(items_list) {
    items_list.forEach((item, index) => {
      const splitted_item = item.split(' ')

      let product = new Product(
        new RegExp(NAME_REGEX).exec(item)[0],
        parseInt(splitted_item[0]),
        parseFloat(splitted_item[splitted_item.length - 1]),
        new RegExp(SALES_TAX_EXEMPT.join('|')).test(item),
        item.includes('imported'),
      )

      this.updateSalesTaxes(product.taxes, product.quantity)
      this.updateTotal(product.total)

      this.products_list.push(product)
    })
  }

  updateSalesTaxes(item_taxes, item_quantity) {
    this.sales_taxes =
      parseFloat(this.sales_taxes) + parseFloat(item_taxes * item_quantity)
    this.sales_taxes = this.sales_taxes.toFixed(2)
  }

  updateTotal(item_total) {
    this.total += parseFloat(item_total.toFixed(2))
  }

  formattedSummary() {
    this.products_list.forEach((item) => {
      this.formatted_response.push(
        `${item.quantity} ${item.name}: ${item.total.toFixed(2)}`,
      )
    })

    this.formatted_response.push(`Sales Taxes: ${this.sales_taxes}`)
    this.formatted_response.push(`Total: ${this.total}`)

    return this.formatted_response
  }
}
