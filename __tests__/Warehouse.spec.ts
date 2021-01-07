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
