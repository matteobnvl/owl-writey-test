import request, { Response } from "supertest";
import dotenv from "dotenv";
import { User } from "../type/user.type";


export class TestUtils {
    protected baseUrl = "https://owl-writey.hemit.fr/api";

    protected key = process.env.GOOGLE_API_KEY || "";
    protected tokens: Map<User, string> = new Map();

    protected userCredentials: Record<User, { email: string, password: string }> = {
        pseudo: {
            email: process.env.EMAIL_PSEUDO || '',
            password: process.env.PASSWORD_PSEUDO || '',
        },
        bob: {
            email: process.env.BOB_EMAIL || '',
            password: process.env.BOB_PASSWORD || '',
        },
        anonymous: {
            email: '',
            password: '',
        }
    };

    async logHas(user: User): Promise<string | null> {
        return await this.authenticate(user);
    }

    async authenticate(user: User): Promise<string | null> {
        if (this.tokens.has(user)) return this.tokens.get(user)!;
        if (user === 'anonymous') {
            this.tokens.set(user, '');
            return null;
        }

        const creds = this.userCredentials[user];
        if (!creds?.email) throw new Error(`No credentials for user "${user}"`);

        const url = 'https://www.googleapis.com/';
        const response = await request(url)
            .post("/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDpdYdgvEwYIKGr_rmh37DipL3djZ-KF3k")
            .send({ email: creds.email, password: creds.password, returnSecureToken: true });

        expect(response.status).toBe(200);
        const token = response.body.idToken;
        this.tokens.set(user, token);
        return token;
    }

    get(path: string, token: string|null = null): Promise<Response> {
        let req = request(this.baseUrl).get(path);
        if (token) req = req.set("Authorization", `Bearer ${token}`);
        return req;
    }

    post(path: string, body = {}, token: string|null = null): Promise<Response> {
        let req = request(this.baseUrl).post(path).send(body);
        if (token) req = req.set("Authorization", `Bearer ${token}`);
        return req;
    }

    delete(path: string, token: string|null = null): Promise<Response> {
        let req = request(this.baseUrl).delete(path);
        if (token) req = req.set("Authorization", `Bearer ${token}`);
        return req;
    }
}