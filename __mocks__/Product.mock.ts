const ProductMock = jest.fn((name: string, price: number) => ({
  name,
  price,
}));

export default ProductMock;