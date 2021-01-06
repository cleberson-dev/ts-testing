import Order from "../src/Order";
import Product from "../src/Product";

const ProductMock = jest.fn((name: string, price: number) => ({
  name,
  price,
}));

it("should have 3 products", () => {
  const orderProducts = [
    { product: new ProductMock("Item 1", 10) as Product, amount: 1 },
    { product: new ProductMock("Item 2", 20) as Product, amount: 2 },
    { product: new ProductMock("Item 3", 30) as Product, amount: 1 },
  ];

  const order = new Order(orderProducts);

  expect(order.products).toHaveLength(3);
});

it("should have a total of 4 items", () => {
  const orderProducts = [
    { product: new ProductMock("Item 1", 10) as Product, amount: 1 },
    { product: new ProductMock("Item 2", 20) as Product, amount: 2 },
    { product: new ProductMock("Item 3", 30) as Product, amount: 1 },
  ];
  const order = new Order(orderProducts);

  expect(order.totalAmount).toEqual(4);
});

it("should cost a total of $80", () => {
  const orderProducts = [
    { product: new ProductMock("Item 1", 10) as Product, amount: 1 },
    { product: new ProductMock("Item 2", 20) as Product, amount: 2 },
    { product: new ProductMock("Item 3", 30) as Product, amount: 1 },
  ];
  const order = new Order(orderProducts);

  expect(order.cost).toEqual(80);
});

it("should add a product to the order", () => {
  const orderProducts = [
    { product: new ProductMock("Item 1", 10) as Product, amount: 1 },
    { product: new ProductMock("Item 2", 20) as Product, amount: 2 },
    { product: new ProductMock("Item 3", 30) as Product, amount: 1 },
  ];
  const order = new Order(orderProducts);
  order.addProduct(new ProductMock("Item 4", 40) as Product, 1);

  expect(order.products).toHaveLength(4);
  expect(order.cost).toEqual(120);
  expect(order.totalAmount).toEqual(5);
});
