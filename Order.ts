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
      const { id, amount } = orderProduct;
      console.log(`#${id} | ${amount} unidades`);
    });
  }
}

interface OrderProduct {
  id: string;
  amount: number; 
}