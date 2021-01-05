import Order from "./Order";
import Product from "./Product";
import Warehouse from "./Warehouse";

const ps5 = new Product("Playstation 5", 4999.99);
const xone = new Product("Xbox One", 2599.99);

const myWarehouse = new Warehouse([
  { id: ps5.id, amount: 30 },
  { id: xone.id, amount: 50 }
]);

myWarehouse.info();

const newOrder = new Order([
  { product: ps5, amount: 5 },
  { product: xone, amount: 3 },
]);
newOrder.info();
newOrder.fill(myWarehouse);
myWarehouse.info();