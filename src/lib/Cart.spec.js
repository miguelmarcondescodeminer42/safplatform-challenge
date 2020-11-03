import Cart from './Cart'

describe('Cart', () => {
  let cart

  beforeEach(() => {
    cart = new Cart()
  })

  describe('calcTaxes', () => {
    it('should calc taxes of 10% on a CD', () => {
      const music_cd = ['1 music CD at 14.99']

      cart.addGoods(music_cd)

      expect(cart.calcTaxes()).toStrictEqual([
        '1 music CD: 16.49',
        'Sales Taxes: 1.50',
        'Total: 16.49',
      ])
    })

    it('should not calc taxes on a book', () => {
      const book = ['2 book at 12.49']

      cart.addGoods(book)

      expect(cart.calcTaxes()).toStrictEqual([
        '2 book: 24.98',
        'Sales Taxes: 0.00',
        'Total: 24.98',
      ])
    })

    it('should not calc taxes on a chocolate bar', () => {
      const book = ['1 chocolate bar at 0.85']

      cart.addGoods(book)

      expect(cart.calcTaxes()).toStrictEqual([
        '1 chocolate bar: 0.85',
        'Sales Taxes: 0.00',
        'Total: 0.85',
      ])
    })
  })
})
