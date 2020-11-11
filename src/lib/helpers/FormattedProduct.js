const SALES_TAX_EXEMPT = ['book', 'food', 'medical', 'chocolate', 'pill'],
  NAME_REGEX = /(?<=[0-9] )(.*)(?= at )/

export default class FormattedProduct {
  constructor(product) {
    this.formattedAttributes = this.formatAtt(product)
  }

  formatAtt(product) {
    let splittedProduct = product.split(' ')

    return {
      name: new RegExp(NAME_REGEX).exec(product)[0],
      quantity: parseInt(splittedProduct[0]),
      price: parseFloat(splittedProduct[splittedProduct.length - 1]),
      exempt: new RegExp(SALES_TAX_EXEMPT.join('|')).test(product),
      imported: product.includes('imported')
    }
  }
}
