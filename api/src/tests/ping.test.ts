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
    // Increase timeout for all tests in this suite
    // jest.setTimeout(20000);
    var id = ''

    it("should return 200 OK for the root endpoint", async () => {
        const response = await request(baseUrl).get("/ping")
        expect(response.status).toBe(200)
    })

    it("should return 401 Unauthorized for the post exercice endpoint without token", async () => {
        const response = await request(baseUrl).post("/exercises").send({
            "name": "test",
            "status": "Ongoing",
            "type": "ExquisiteCorpse",
            "config": {
                "initialText": "test",
                "iterationDuration": 900,
                "nbIterations": 10,
                "textSize": {
                    "maxWords": 100,
                    "minWords": 10,
                },
            },
        })
        expect(response.status).toBe(401)
    })

    it("should return 201 OK for the post exercice endpoint", async () => {
        const token = await authenticate(email, password)
        const response = await request(baseUrl).post("/exercises").set("Authorization", `Bearer ${token}`).send({
            "name": "test",
            "status": "Ongoing",
            "type": "ExquisiteCorpse",
            "config": {
                "initialText": "test",
                "iterationDuration": 900,
                "nbIterations": 10,
                "textSize": {
                    "maxWords": 100,
                    "minWords": 10,
                },
            },
        })
        expect(response.status).toBe(201)
    })

    it("should return 401 Unauthorized for the /exercises endpoint without token", async () => {
        const response = await request(baseUrl).get("/exercises")
        expect(response.status).toBe(401)
    })

    it("should return 200 OK and a valid exercises array for the /exercises endpoint", async () => {
        const token = await authenticate(email, password)
        const response = await request(baseUrl).get("/exercises").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("exercises")
        expect(Array.isArray(response.body.exercises)).toBe(true)
        expect(response.body.exercises.length).toBeGreaterThan(0)
        for (const exercise of response.body.exercises) {
            id = exercise.id
            expect(exercise).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    status: expect.any(String),
                    type: expect.any(String),
                    _links: expect.objectContaining({
                        self: expect.any(String),
                    }),
                })
            )
        }
    })

    it("should return 401 Unauthorized for the /exercises/:id endpoint without token", async () => {
        const response = await request(baseUrl).get(`/exercises/${id}`)
        expect(response.status).toBe(401)
    })

    it("should return 200 OK and a valid exercise object for the /exercises/:id endpoint", async () => {
        const token = await authenticate(email, password)
        const response = await request(baseUrl).get(`/exercises/${id}`).set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: expect.any(String),
                status: expect.any(String),
                type: expect.any(String),
                config: expect.objectContaining({
                    initialText: expect.any(String),
                    iterationDuration: expect.any(Number),
                    nbIterations: expect.any(Number),
                    textSize: expect.objectContaining({
                        maxWords: expect.any(Number),
                        minWords: expect.any(Number),
                    }),
                }),
                content: expect.objectContaining({
                    scenes: expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            text: expect.any(String),
                            author: expect.objectContaining({
                                uid: expect.any(String),
                                name: expect.any(String),
                            }),
                        }),
                    ]),
                }),
                participants: expect.arrayContaining([
                    expect.objectContaining({
                        uid: expect.any(String),
                        name: expect.any(String),
                        isAdmin: expect.any(Boolean),
                    }),
                ]),
                _links: expect.objectContaining({
                    self: expect.any(String),
                    connect: expect.any(String),
                    delete: expect.any(String),
                    finish: expect.any(String),
                    invite: expect.any(String),
                    removeParticipant: expect.any(String),
                    takeTurn: expect.any(String),
                }),
            })
        )
    })

    it("should return 204 no content for the exquisite-corpse /:id/take-turn endpoint", async () => {
        const token = await authenticate(email, password)
        const response = await request(baseUrl).post(`/exquisite-corpse/${id}/take-turn`).set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(204)
    })

    it("should return 204 no content for the exquisite-corpse /:id/submit-data endpoint", async () => {
        const token = await authenticate(email, password)
        const response = await request(baseUrl).post(`/exquisite-corpse/${id}/submit-turn`).set("Authorization", `Bearer ${token}`).send({
            "content": "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        })
        expect(response.status).toBe(204)
    })

    it("should return 401 Unauthorized for the delete /exercises/:id endpoint without token", async () => {
        const response = await request(baseUrl).delete(`/exercises/${id}`)
        expect(response.status).toBe(401)
    })

    it("should return 204 OK for the delete /exercises/:id endpoint", async () => {
        const token = await authenticate(email, password)
        const response = await request(baseUrl).delete(`/exercises/${id}`).set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(204)
    })
})