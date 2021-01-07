import Warehouse from "../src/Warehouse";

it("should have 3 products", () => {
  const warehouse = new Warehouse([
    { id: "1234", amount: 1 },
    { id: "1235", amount: 1 },
    { id: "1237", amount: 3 },
  ]);
  expect(warehouse.products).toHaveLength(3);
});
