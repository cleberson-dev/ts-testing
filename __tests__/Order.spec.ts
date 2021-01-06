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
