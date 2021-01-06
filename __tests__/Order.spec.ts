import Order from "../src/Order";
import Product from "../src/Product";
import Warehouse from "../src/Warehouse";
import WarehouseMock, { mockHasInventory, mockRemove } from "../__mocks__/Warehouse.mock";

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

it("should throw an error if it has some invalid products", () => {
  const orderProducts = [
    { product: new ProductMock("Item 1", 10) as Product, amount: 1 },
    { product: new ProductMock("Item 2", 20) as Product, amount: 2 },
    { product: new ProductMock("Item 3", 30) as Product, amount: -2 },
  ];
  expect(() => {
    new Order(orderProducts);
  }).toThrow();
});

it("should throw an error if warehouse doesn't have enough inventory", () => {
  const myMockWarehouse = new WarehouseMock();
  mockHasInventory.mockImplementation((__, _) => false);

  const orderProducts = [
    { product: new ProductMock("Item 1", 10) as Product, amount: 1 },
    { product: new ProductMock("Item 2", 20) as Product, amount: 2 },
    { product: new ProductMock("Item 3", 30) as Product, amount: 2 },
  ];
  const order = new Order(orderProducts);

  expect(() => {
    order.fill(myMockWarehouse);
  }).toThrow();
  expect(order.isFilled).toEqual(false);
});

it("should NOT fill the order if can't remove some product from warehouse", () => {
  const myMockWarehouse = new WarehouseMock();
  mockHasInventory.mockImplementation((__, _) => true);
  mockRemove.mockImplementation((__, _) => {
    throw new Error("");
  });

  const orderProducts = [
    { product: new ProductMock("Item 1", 10) as Product, amount: 1 },
    { product: new ProductMock("Item 2", 20) as Product, amount: 2 },
    { product: new ProductMock("Item 3", 30) as Product, amount: 2 },
  ];
  const order = new Order(orderProducts);
  try {
    order.fill(myMockWarehouse);
  } catch (err) {}

  expect(order.isFilled).toEqual(false);
});
