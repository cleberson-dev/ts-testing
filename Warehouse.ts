export default class Warehouse {
  _products: WarehouseProduct[];
  
  constructor(products: WarehouseProduct[]) {
    this._products = products;
  }

  add(productId: string, amount: number) {
    if (amount <= 0) throw Error('');

    const product = this.findProduct(productId);
    if (product) {
      product.amount += amount;
    } else {
      this._products.push({ id: productId, amount });
    }
  }

  remove(productId: string, amountToRemove: number) {
    if (amountToRemove <= 0) throw Error('');

    const product = this.findProduct(productId);
    if (!product) throw Error('');
    if (amountToRemove > product.amount) throw Error('');

    product.amount -= amountToRemove;
  }

  info() {
    this._products.forEach(p => {
      console.log(`${p.amount}x #${p.id}`);
    });
  }

  findProduct(productId: string) {
    return this._products.find(p => p.id === productId);
  }

  getAmount(productId: string) {
    const product = this.findProduct(productId);
    if (!product) throw Error('');
    return product.amount;
  }

  hasInventory(productId: string, amount: number) {
    if (amount <= 0) throw Error('');
    
    const product = this.findProduct(productId);
    if (!product) return false;

    return amount <= product.amount;
  }
}

interface WarehouseProduct {
  id: string;
  amount: number;
}
