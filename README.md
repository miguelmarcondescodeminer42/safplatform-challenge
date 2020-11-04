# safplatform - challenge

Basic sales tax is applicable at a rate of 10% on all goods, except books, food, and medical products that are exempt. Import duty is an additional sales tax applicable on all imported goods at a rate of 5%, with no exemptions.

When I purchase items I receive a receipt which lists the name of all the items and their price (including tax), finishing with the total cost of the items, and the total amounts of sales taxes paid. The rounding rules for sales tax are that for a tax rate of n%, a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of sales tax.

### Installing

The file input named 'goods_list.js' is in src/data

After cloning the repository you need to run

```
yarn install
```

And you also need a development server as live-server

```
npm install -g live-server
cd safplatform-challenge/src
live-server .
```

The output we'll be displayed in an alert and as HTML in page

## Running the tests

Explain what these tests test and why

```
yarn test
```

## Built With

- [Jest](https://jestjs.io/) - Jest is a JavaScript Testing Framework.
