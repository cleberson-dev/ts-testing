import Order from "../src/Order";
import Product from "../src/Product";
import Warehouse from "../src/Warehouse";

const ProductMock = jest.fn((name: string, price: number) => ({
  name,
  price,
}));

const mockHasInventory = jest.fn((productId: string, amount: number) => true);
const mockRemove = jest.fn((productId: string, amountToRemove: number) => {});
const WarehouseMock = jest.fn().mockImplementation(() => ({
  _products: [],
  hasInventory: mockHasInventory,
  remove: mockRemove,
  add: (productId: string, amount: number) => {},
  info: () => {},
  findProduct: (productId: string) => ({ id: "e3412s", amount: 1 }),
  getAmount: (productId: string) => 1,
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

it("should fill the order", () => {
  const myMockWarehouse = new WarehouseMock();
  const orderProducts = [
    { product: new ProductMock("Item 1", 10) as Product, amount: 1 },
    { product: new ProductMock("Item 2", 20) as Product, amount: 2 },
    { product: new ProductMock("Item 3", 30) as Product, amount: 1 },
  ];
  const order = new Order(orderProducts);
  order.fill(myMockWarehouse as Warehouse);

  expect(order.isFilled).toEqual(true);
});

it("should fill the order only if it hasn't been", () => {
  const myMockWarehouse = new WarehouseMock();
  const orderProducts = [
    { product: new ProductMock("Item 1", 10) as Product, amount: 1 },
    { product: new ProductMock("Item 2", 20) as Product, amount: 2 },
    { product: new ProductMock("Item 3", 30) as Product, amount: 1 },
  ];
  const order = new Order(orderProducts);

  order.fill(myMockWarehouse as Warehouse);
  mockHasInventory.mockClear();
  order.fill(myMockWarehouse as Warehouse);

  expect(mockHasInventory.mock.calls).toHaveLength(0);
});
