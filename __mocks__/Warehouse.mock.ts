export const mockHasInventory = jest.fn((productId: string, amount: number) => true);
export const mockRemove = jest.fn((productId: string, amountToRemove: number) => {});

const WarehouseMock = jest.fn().mockImplementation(() => ({
  _products: [],
  hasInventory: mockHasInventory,
  remove: mockRemove,
  add: (productId: string, amount: number) => {},
  info: () => {},
  findProduct: (productId: string) => ({ id: "e3412s", amount: 1 }),
  getAmount: (productId: string) => 1,
}));

export default WarehouseMock;