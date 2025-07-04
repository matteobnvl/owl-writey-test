import http from 'k6/http';

export class AuthUtils {
    private baseUrl = "https://owl-writey.hemit.fr/api";
    private creds = {
        email: 'pseudo@gmail.com',
        password: 'Test1234@',
    }
    private token: string | null = null;

    public async login(): Promise<string | null> {
        if (this.token) return this.token;
        const url = 'https://www.googleapis.com/';
        const response = await http.post(`${url}/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDpdYdgvEwYIKGr_rmh37DipL3djZ-KF3k`, {
            email: this.creds.email, password: this.creds.password, returnSecureToken: true
        })
        this.token = JSON.parse(response.body).idToken;
        return this.token
    }
}