const BASIC_TAX_RATE = 10,
  IMPORTED_TAX_RATE = 5,
  APPROXIMATION_RATE = 0.05

export default class Product {
  constructor(name, quantity, price, exempt, imported) {
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
    let imported_taxes = this.imported ? IMPORTED_TAX_RATE : 0.0

    if (this.exempt) {
      return parseFloat(this.applyRoundingRule(imported_taxes))
    } else {
      return parseFloat(
        this.applyRoundingRule(imported_taxes + BASIC_TAX_RATE, this.price),
      )
    }
  }

  applyRoundingRule(tax_rate, item_price = this.price) {
    var tax_value = (tax_rate * item_price) / 100
    const item_price_with_tax = (tax_value + item_price).toFixed(1),
      diff = tax_value + item_price - item_price_with_tax

    if (diff > 0 && diff < APPROXIMATION_RATE) {
      tax_value = parseFloat(item_price_with_tax) + APPROXIMATION_RATE
      tax_value = tax_value - item_price
    }

    return tax_value.toFixed(2)
  }
}
