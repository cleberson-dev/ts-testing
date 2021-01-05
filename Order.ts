import Product from "./Product"

export default class Order {
  private _orderProducts: OrderProduct[];

  constructor(orderProducts: OrderProduct[]) {
    if (orderProducts.some(product => product.amount <= 0)) throw Error('');
    this._orderProducts = orderProducts;
  }

  get products() {
    return this._orderProducts.map(orderProduct => orderProduct.product);
  }

  addProduct(product: Product, amount: number) {
    if (amount <= 0) throw Error('');
    this._orderProducts.push({ product, amount });
  }

  info() {
    this._orderProducts.forEach(orderProduct => {
      const { id, price } = orderProduct.product;
      const { amount } = orderProduct;
      console.log(`#${id} | ${amount} unidades | R$${price.toFixed(2)}`);
    });
    console.log('Preço total: R$' + this.cost.toFixed(2));
  }

  get cost() {
    return this._orderProducts.reduce((prev, acc) => prev + acc.product.price * acc.amount, 0);
  }
}

interface OrderProduct {
  product: Product;
  amount: number;
}