import Product from "../src/Product";

it("should have the name 'Playstation 5' and a price of $599.99", () => {
  const product = new Product("Playstation 5", 599.99);

  expect(product.name).toEqual("Playstation 5");
  expect(product.price).toEqual(599.99);
});

it("should generate unique ids", () => {
  const productA = new Product("Item 1", 99.99);
  const productB = new Product("Item 2", 99.99);

  expect(productA.id).toBeTruthy();
  expect(productB.id).toBeTruthy();
  expect(productA.id).not.toEqual(productB.id);
});