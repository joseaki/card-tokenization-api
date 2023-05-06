const MOCK_COMMERCE = {
  username: "commerce_a",
  commerce_name: "My commerce",
  isActive: true,
  password: "$2a$04$WeASAQsFR9lFj04gULR5AeupwtV3aHs8EugEueXhz7KzzbgfcEBZW",
  pk: "pk_test_mol23f2no94bc73d",
};
export const getCommerceByPk = jest.fn().mockResolvedValue(MOCK_COMMERCE);
export const getCommerceByUsername = jest.fn().mockResolvedValue(MOCK_COMMERCE);
