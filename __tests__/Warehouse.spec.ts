import Warehouse from "../src/Warehouse";

it("should have 3 products", () => {
  const warehouse = new Warehouse([
    { id: "1234", amount: 1 },
    { id: "1235", amount: 1 },
    { id: "1237", amount: 3 },
  ]);
  expect(warehouse.products).toHaveLength(3);
});

it("should have a total of 5 items", () => {
  const warehouse = new Warehouse([
    { id: "1234", amount: 1 },
    { id: "1235", amount: 1 },
    { id: "1237", amount: 3 },
  ]);
  expect(warehouse.totalAmount).toEqual(5);
});

it("should find an existing product", () => {
  const warehouse = new Warehouse([
    { id: "1234", amount: 1 },
    { id: "1235", amount: 1 },
    { id: "1237", amount: 3 },
  ]);

  const product = warehouse.findProduct("1234");

  expect(product?.id).toEqual("1234");
  expect(product?.amount).toEqual(1);
});

it("should find an undefined product", () => {
  const warehouse = new Warehouse([
    { id: "1234", amount: 1 },
    { id: "1235", amount: 1 },
    { id: "1237", amount: 3 },
  ]);

  const product = warehouse.findProduct("notExistedId");

  expect(product).toBeUndefined();
});

it("should add a new product to warehouse", () => {
  const warehouse = new Warehouse([
    { id: "1234", amount: 1 },
    { id: "1235", amount: 1 },
    { id: "1237", amount: 3 },
  ]);

  const oldLength = warehouse.products.length;
  warehouse.add("randomId", 3);
  const newLength = warehouse.products.length;
  const product = warehouse.findProduct("randomId");

  expect(newLength - oldLength).toEqual(1);
  expect(product?.id).toEqual("randomId");
  expect(product?.amount).toEqual(3);
});

it("should remove 2 items", () => {
  const warehouse = new Warehouse([
    { id: "1234", amount: 1 },
    { id: "1235", amount: 1 },
    { id: "1237", amount: 3 },
  ]);

  warehouse.remove("1237", 2);

  const product = warehouse.findProduct("1237");
  expect(product?.amount).toEqual(1);
});

it("should throw an error if it attempts to remove 10 items from a 3-item product", () => {
  const warehouse = new Warehouse([
    { id: "1234", amount: 1 },
    { id: "1235", amount: 1 },
    { id: "1237", amount: 3 },
  ]);

  expect(() => {
    warehouse.remove("1234", 10);
  }).toThrow();
});

it("should throw an error if amount requested to remove is negative or zero", () => {
  const warehouse = new Warehouse([
    { id: "1234", amount: 1 },
    { id: "1235", amount: 1 },
    { id: "1237", amount: 3 },
  ]);

  expect(() => {
    warehouse.remove("1234", -1);
  }).toThrow();
  expect(() => {
    warehouse.remove("1234", 0);
  }).toThrow();
});

it("should have inventory of 3 for a product with 3 items", () => {
  const warehouse = new Warehouse([
    { id: "1234", amount: 1 },
    { id: "1235", amount: 1 },
    { id: "1237", amount: 3 },
  ]);

  expect(warehouse.hasInventory("1237", 3)).toEqual(true);
});

it("should return false if it doesnt have 4 of inventory", () => {
  const warehouse = new Warehouse([
    { id: "1234", amount: 1 },
    { id: "1235", amount: 1 },
    { id: "1237", amount: 3 },
  ]);

  expect(warehouse.hasInventory("1237", 4)).toEqual(false);
});

it("should return the correct amount for a product", () => {
  const warehouse = new Warehouse([
    { id: "1234", amount: 1 },
    { id: "1235", amount: 1 },
    { id: "1237", amount: 3 },
  ]);

  expect(warehouse.getAmount("1234")).toEqual(1);
});
