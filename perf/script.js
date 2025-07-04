import http from 'k6/http';
import { sleep, check } from 'k6';
import { AuthUtils } from './utils/auth.utils.ts';

const BASE_URL = 'https://owl-writey.hemit.fr/api';
export const options = {
  vus: 10,
  duration: '5s',
};
const authUtils = new AuthUtils()
let token;

export default async function() {
  token = await authUtils.login();
  let response = http.get(`${BASE_URL}/exercises`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  check(response, { "status is 200": (res) => res.status === 200 })

  let exercises = JSON.parse(response.body).exercises
  let exercice = exercises.length > 0 ? exercises[0] : null
  response = http.get(exercice._links.self, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  check(response, { "status is 200": (res) => res.status === 200 })
  sleep(1)
}
