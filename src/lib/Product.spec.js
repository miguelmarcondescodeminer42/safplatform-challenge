import Product from './Product'

describe('Product', () => {
  describe('when the product is exempt of basic sale tax and non-imported', () => {
    let product = new Product('book', 2, 12.49, true, false)

    it('should calc NO taxes', () => {
      expect(product.taxes).toBe(0)
    })
    it('should calc value without summing any taxes', () => {
      expect(product.total).toBe(24.98)
    })
  })

  describe('when the product is exempt of basic sale tax and imported', () => {
    let product = new Product(
      'imported boxes of chocolates',
      3,
      11.25,
      true,
      true,
    )

    it('should calc 5% of taxes', () => {
      expect(product.taxes).toBe(0.6)
    })
    it('should calc value without summing any taxes', () => {
      expect(product.total).toBe(35.55)
    })
  })

  describe('when the product is not exempt of basic sale tax and non-imported', () => {
    let product = new Product('music CD', 1, 14.99, false, false)

    it('should calc 10% of taxes', () => {
      expect(product.taxes).toBe(1.5)
    })
    it('should calc value without summing any taxes', () => {
      expect(product.total).toBe(16.49)
    })
  })

  describe('when the product is not exempt of basic sale tax and imported', () => {
    let product = new Product(
      'imported bottle of perfume',
      1,
      47.5,
      false,
      true,
    )
    it('should calc 15% of taxes', () => {
      expect(product.taxes).toBe(7.15)
    })
    it('should calc value without summing any taxes', () => {
      expect(product.total).toBe(54.65)
    })
  })
})

// taxes: 0.6,
// total: 35.55
