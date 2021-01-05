import Product from "./Product"

export default class Order {
  private _orderProducts: OrderProduct[];

  constructor(orderProducts: OrderProduct[]) {
    if (orderProducts.some(product => product.amount <= 0)) throw Error('');
    this._orderProducts = orderProducts;
  }

  get products() {
    return [...this._orderProducts];
  }

  addProduct(orderProduct: OrderProduct) {
    if (orderProduct.amount <= 0) throw Error('');
    this._orderProducts.push(orderProduct);
  }

  info() {
    this._orderProducts.forEach(orderProduct => {
      const { id, amount, price } = orderProduct;
      console.log(`#${id} | ${amount} unidades | R$${price.toFixed(2)}`);
    });
  }

  get cost() {
    return this._orderProducts.reduce((prev, acc) => prev + acc.price * acc.amount, 0);
  }
}

interface OrderProduct {
  id: string;
  amount: number;
  price: number;
}