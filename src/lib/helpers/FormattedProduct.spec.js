import FormattedProduct from './FormattedProduct'

describe('FormattedProduct', () => {
  describe('when passing a string as an attribute', () => {
    let formattedProduct = new FormattedProduct('1 music CD at 14.99')

    it('has a formatted name', () => {
      expect(formattedProduct.formattedAttributes.name).toBe('music CD')
    })

    it('has name as a string', () => {
      expect(typeof formattedProduct.formattedAttributes.name).toBe('string')
    })

    it('has a formatted quantity', () => {
      expect(formattedProduct.formattedAttributes.quantity).toBe(1)
    })

    it('has quantity as a number', () => {
      expect(typeof formattedProduct.formattedAttributes.quantity).toBe('number')
    })

    it('has a formatted price', () => {
      expect(formattedProduct.formattedAttributes.price).toBe(14.99)
    })

    it('has price as a number', () => {
      expect(typeof formattedProduct.formattedAttributes.price).toBe('number')
    })

    it('has a formatted exempt flag', () => {
      expect(formattedProduct.formattedAttributes.exempt).toBe(false)
    })

    it('has exempt as a boolean', () => {
      expect(typeof formattedProduct.formattedAttributes.exempt).toBe('boolean')
    })

    it('has a formatted imported flag', () => {
      expect(formattedProduct.formattedAttributes.imported).toBe(false)
    })

    it('has imported as a boolean', () => {
      expect(typeof formattedProduct.formattedAttributes.imported).toBe('boolean')
    })
  })
});
