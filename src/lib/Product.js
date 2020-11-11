const BASIC_TAX_RATE = 10,
  IMPORTED_TAX_RATE = 5,
  APPROXIMATION_RATE = 0.05

export default class Product {
  constructor({name, quantity, price, exempt, imported}) {
    this.name = name
    this.quantity = quantity
    this.price = price
    this.exempt = exempt
    this.imported = imported
    this.taxes = this.calcTaxes()
    this.total = this.calcTotal()
  }

  calcTotal() {
    return this.quantity * (this.price + this.taxes).toFixed(2)
  }

  calcTaxes() {
    let importedTaxes = this.imported ? IMPORTED_TAX_RATE : 0.0

    if (this.exempt) {
      return parseFloat(this.applyRoundingRule(importedTaxes))
    } else {
      return parseFloat(
        this.applyRoundingRule(importedTaxes + BASIC_TAX_RATE, this.price),
      )
    }
  }

  applyRoundingRule(tax_rate, item_price = this.price) {
    let taxValue = (tax_rate * item_price) / 100
    const itemPriceWithTax = (taxValue + item_price).toFixed(1),
      diff = taxValue + item_price - itemPriceWithTax

    if (diff > 0 && diff < APPROXIMATION_RATE) {
      taxValue = parseFloat(itemPriceWithTax) + APPROXIMATION_RATE
      taxValue = taxValue - item_price
    }

    return taxValue.toFixed(2)
  }
}
