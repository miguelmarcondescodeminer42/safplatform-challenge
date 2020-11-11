import Product from './Product.js'

export default class Cart {
  productsList = []

  addGoods(items_list) {
    items_list.forEach((item) => this.productsList.push(new Product(item)))
  }

  calcSalesTaxesTotal() {
    return this.productsList.reduce((acc, product) => {
      return acc + (product.quantity * product.taxes)
    }, 0.0).toFixed(2)
  }

  calcTotalValue() {
    return this.productsList.reduce((acc, product) => {
      return acc + product.total
    }, 0.0).toFixed(2)
  }

  formattedSummary() {
    const products = this.productsList.map(
      (item) => `${item.quantity} ${item.name}: ${item.total.toFixed(2)}`
    )

    return [
      ...products,
      `Sales Taxes: ${this.calcSalesTaxesTotal()}`,
      `Total: ${this.calcTotalValue()}`
    ]
  }
}
