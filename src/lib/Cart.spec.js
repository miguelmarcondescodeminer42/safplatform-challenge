import Cart from './Cart'

describe('Cart', () => {
  let cart

  beforeEach(() => {
    cart = new Cart()
  })

  describe('formattedSummary', () => {
    describe('when sale has non-imported products', () => {
      it('should calc taxes of 10% on a CD', () => {
        const music_cd = ['1 music CD at 14.99']

        cart.addGoods(music_cd)

        expect(cart.formattedSummary()).toStrictEqual([
          '1 music CD: 16.49',
          'Sales Taxes: 1.50',
          'Total: 16.49',
        ])
      })

      describe('and the product is exempt of basic sale tax', () => {
        it('should not calc taxes on a book', () => {
          const book = ['2 book at 12.49']

          cart.addGoods(book)

          expect(cart.formattedSummary()).toStrictEqual([
            '2 book: 24.98',
            'Sales Taxes: 0.00',
            'Total: 24.98',
          ])
        })

        it('should not calc taxes on a chocolate bar', () => {
          const book = ['1 chocolate bar at 0.85']

          cart.addGoods(book)

          expect(cart.formattedSummary()).toStrictEqual([
            '1 chocolate bar: 0.85',
            'Sales Taxes: 0.00',
            'Total: 0.85',
          ])
        })
      })

      it('should calc taxes on exempt of basic taxes and non-exempt', () => {
        const goods_list = [
          '2 book at 12.49',
          '1 music CD at 14.99',
          '1 chocolate bar at 0.85',
        ]

        cart.addGoods(goods_list)

        expect(cart.formattedSummary()).toStrictEqual([
          '2 book: 24.98',
          '1 music CD: 16.49',
          '1 chocolate bar: 0.85',
          'Sales Taxes: 1.50',
          'Total: 42.32',
        ])
      })
    })

    describe('when sale has imported products', () => {
      it('should calc taxes on a goods list with imported items', () => {
        const imported_goods = [
          '1 imported box of chocolates at 10.00',
          '1 imported bottle of perfume at 47.50',
        ]

        cart.addGoods(imported_goods)

        expect(cart.formattedSummary()).toStrictEqual([
          '1 imported box of chocolates: 10.50',
          '1 imported bottle of perfume: 54.65',
          'Sales Taxes: 7.65',
          'Total: 65.15',
        ])
      })

      it('should calc taxes on a goods list with both imported and not imported items', () => {
        const mixed_goods = [
          '1 imported bottle of perfume at 27.99',
          '1 bottle of perfume at 18.99',
          '1 packet of headache pills at 9.75',
          '3 imported boxes of chocolates at 11.25',
        ]

        cart.addGoods(mixed_goods)

        expect(cart.formattedSummary()).toStrictEqual([
          '1 imported bottle of perfume: 32.19',
          '1 bottle of perfume: 20.89',
          '1 packet of headache pills: 9.75',
          '3 imported boxes of chocolates: 35.55',
          'Sales Taxes: 7.90',
          'Total: 98.38',
        ])
      })
    })
  })
})
