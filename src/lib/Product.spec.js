import Product from './Product'

describe('Product', () => {
  describe('when the product is exempt of basic sale tax and non-imported', () => {
    let attributes = {
      name: 'book',
      quantity: 2,
      price: 12.49,
      exempt: true,
      imported: false
    }
    let product = new Product(attributes)

    it('should calc NO taxes', () => {
      expect(product.taxes).toBe(0)
    })
    it('should calc value without summing any taxes', () => {
      expect(product.total).toBe(24.98)
    })
  })

  describe('when the product is exempt of basic sale tax and imported', () => {
    let attributes = {
      name: 'imported boxes of chocolates',
      quantity: 3,
      price: 11.25,
      exempt: true,
      imported: true
    }
    let product = new Product(attributes)

    it('should calc 5% of taxes', () => {
      expect(product.taxes).toBe(0.6)
    })
    it('should calc value without summing any taxes', () => {
      expect(product.total).toBe(35.55)
    })
  })

  describe('when the product is not exempt of basic sale tax and non-imported', () => {
    let attributes = {
      name: 'music CD',
      quantity: 1,
      price: 14.99,
      exempt: false,
      imported: false
    }
    let product = new Product(attributes)

    it('should calc 10% of taxes', () => {
      expect(product.taxes).toBe(1.5)
    })
    it('should calc value without summing any taxes', () => {
      expect(product.total).toBe(16.49)
    })
  })

  describe('when the product is not exempt of basic sale tax and imported', () => {
    let attributes = {
      name: 'imported bottle of perfume',
      quantity: 1,
      price: 47.5,
      exempt: false,
      imported: true
    }
    let product = new Product(attributes)

    it('should calc 15% of taxes', () => {
      expect(product.taxes).toBe(7.15)
    })
    it('should calc value without summing any taxes', () => {
      expect(product.total).toBe(54.65)
    })
  })
})
