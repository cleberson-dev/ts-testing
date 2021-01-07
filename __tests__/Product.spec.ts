import Product from "../src/Product";

it("should have the name 'Playstation 5' and a price of $599.99", () => {
  const product = new Product("Playstation 5", 599.99);

  expect(product.name).toEqual("Playstation 5");
  expect(product.price).toEqual(599.99);
});