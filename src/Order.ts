import Product from "./Product";
import Warehouse from "./Warehouse";

export default class Order {
  private _orderProducts: OrderProduct[];
  private _isFilled: boolean = false;

  constructor(orderProducts: OrderProduct[]) {
    if (orderProducts.some((product) => product.amount <= 0)) {
      throw Error("");
    }
    this._orderProducts = orderProducts;
  }

  get products() {
    return this._orderProducts
      .map((orderProduct) => orderProduct.product);
  }

  addProduct(product: Product, amount: number) {
    if (amount <= 0) throw Error("");
    this._orderProducts.push({ product, amount });
  }

  info() {
    this._orderProducts.forEach((orderProduct) => {
      const { id, price } = orderProduct.product;
      const { amount } = orderProduct;
      const formattedCost = (price * amount).toFixed(2);
      console.log(
        `#${id} | ${amount} unidades | R$${formattedCost}`
      );
    });
    
    console.log("Preço total: R$" + this.cost.toFixed(2));
  }

  get cost() {
    return this._orderProducts.reduce(
      (prev, acc) => prev + acc.product.price * acc.amount,
      0
    );
  }

  fill(warehouse: Warehouse) {
    // Só é preciso realizar a retirada caso o pedido não for preenchido
    if (this.isFilled) return;
    
    // Precisa ter estoque para todo o pedido ter a retirada confirmada
    if (
      this._orderProducts.some(
        (op) => !warehouse.hasInventory(op.product.id, op.amount)
      )
    ) {
      throw Error("");
    }

    this._orderProducts.forEach((orderProduct) => {
      warehouse.remove(orderProduct.product.id, orderProduct.amount);
    });
    this._isFilled = true;
  }

  get isFilled() {
    return this._isFilled;
  }

  get totalAmount() {
    return this._orderProducts.reduce((prev, acc) => prev + acc.amount, 0);
  }
}

interface OrderProduct {
  product: Product;
  amount: number;
}
