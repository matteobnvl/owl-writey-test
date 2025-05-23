import request from "supertest";
import dotenv from "dotenv";
dotenv.config();

const baseUrl = "https://owl-writey.hemit.fr/api"
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

async function authenticate(login: string, pwd: string): Promise<string> {
    const url = 'https://www.googleapis.com/';
    const response = await request(url).post("/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDpdYdgvEwYIKGr_rmh37DipL3djZ-KF3k")
    .send({
        "email": login,
        "password": pwd,
        "returnSecureToken": true
    });
    expect(response.status).toBe(200);
    return response.body.idToken;
}

describe("External API Tests", () => {
    it("should return 200 OK for the root endpoint", async () => {
        const response = await request(baseUrl).get("/ping")
        expect(response.status).toBe(200)
    })

    it("should return 200 OK for the root endpoint", async () => {
        const token = await authenticate(email, password)
        const response = await request(baseUrl).get("/exercises").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
})