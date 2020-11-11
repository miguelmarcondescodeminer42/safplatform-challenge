import Product from './Product'

describe('Product', () => {
  describe('when the product is exempt of basic sale tax and non-imported', () => {
    let product = new Product('2 book at 12.49')

    it('should calc NO taxes', () => {
      expect(product.taxes).toBe(0)
    })
    it('should calc value without summing any taxes', () => {
      expect(product.total).toBe(24.98)
    })
  })

  describe('when the product is exempt of basic sale tax and imported', () => {
    let product = new Product('3 imported boxes of chocolates at 11.25')

    it('should calc 5% of taxes', () => {
      expect(product.taxes).toBe(0.6)
    })
    it('should calc value without summing any taxes', () => {
      expect(product.total).toBe(35.55)
    })
  })

  describe('when the product is not exempt of basic sale tax and non-imported', () => {
    let product = new Product('1 music CD at 14.99')

    it('should calc 10% of taxes', () => {
      expect(product.taxes).toBe(1.5)
    })
    it('should calc value without summing any taxes', () => {
      expect(product.total).toBe(16.49)
    })
  })

  describe('when the product is not exempt of basic sale tax and imported', () => {
    let product = new Product('1 imported bottle of pergume at 47.5')

    it('should calc 15% of taxes', () => {
      expect(product.taxes).toBe(7.15)
    })
    it('should calc value without summing any taxes', () => {
      expect(product.total).toBe(54.65)
    })
  })
})
