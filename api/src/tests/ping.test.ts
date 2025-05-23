import request from "supertest";
import dotenv from "dotenv";
dotenv.config();

const baseUrl = "https://owl-writey.hemit.fr/api"

describe("External API Tests", () => {
    it("should return 200 OK for the root endpoint", async () => {
        const response = await request(baseUrl).get("/ping")
        expect(response.status).toBe(200)
    })
})