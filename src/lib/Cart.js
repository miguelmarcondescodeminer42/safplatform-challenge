import Product from './Product'

const SALES_TAX_EXEMPT = ['book', 'food', 'medical', 'chocolate', 'pill'],
  NAME_REGEX = /(?<=[0-9] )(.*)(?= at )/

export default class Cart {
  productsList = []
  salesTaxes = 0.0
  total = 0.0

  addGoods(items_list) {
    items_list.forEach((item) => {
      const splittedItem = item.split(' ')

      let attributes = {
        name: new RegExp(NAME_REGEX).exec(item)[0],
        quantity: parseInt(splittedItem[0]),
        price: parseFloat(splittedItem[splittedItem.length - 1]),
        exempt: new RegExp(SALES_TAX_EXEMPT.join('|')).test(item),
        imported: item.includes('imported')
      }
      let product = new Product(attributes)

      this.updateSalesTaxes(product.taxes, product.quantity)
      this.updateTotal(product.total)

      this.productsList.push(product)
    })
  }

  updateSalesTaxes(item_taxes, item_quantity) {
    this.salesTaxes =
      parseFloat(this.salesTaxes) + parseFloat(item_taxes * item_quantity)
    this.salesTaxes = this.salesTaxes.toFixed(2)
  }

  updateTotal(item_total) {
    this.total += parseFloat(item_total.toFixed(2))
  }

  formattedSummary() {
    const products = this.productsList.map(
      (item) => `${item.quantity} ${item.name}: ${item.total.toFixed(2)}`
    )

    return [
      ...products,
      `Sales Taxes: ${this.salesTaxes}`,
      `Total: ${this.total}`
    ]
  }
}
