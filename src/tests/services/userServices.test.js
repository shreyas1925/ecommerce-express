const userServices = require("../../services/userServices");
const { Users } = require("../../../database/models")

describe("User Services", () => {
  describe("POST /register", () => {
    it("should register a user", async () => {
      const mockResult = {
        name: "test",
        password: "123456",
      };
      jest.spyOn(Users, "create").mockResolvedValue(mockResult);
      const result = await userServices.register(mockResult);
      expect(result).toEqual(mockResult);
    });
    it("should not register a user", async () => {

        const result = await userServices.register('abc')
        expect(result).toThrow("Password is required");
        });
  });
  describe("POST /login", () => {
    it("should login a user", async () => {
      const mockResult = {
        name: "test",
        password: "123456",
      };
      jest.spyOn(Users, "findOne").mockResolvedValue(mockResult);
      const result = await userServices.login(mockResult);
      expect(result).toEqual(mockResult);
    });
    it("should not login a user", async () => {
      const mockResult = {
        message: "User not found",
      };
      jest.spyOn(Users, "findOne").mockRejectedValue(mockResult);
      const result = await userServices.login(mockResult);
      expect(result).toEqual(mockResult);
    });
  });
});
