import { getOrSetToken } from "../utils/helper";
import { protectedAPI, API } from "../utils/interceptors";

const login = (loginDetails:object) => {
    return API.post('https://reqres.in/api/login', {
        username: 'eve.holt@reqres.in',
        password: 'cityslicka'
    }).then((res) => {
        getOrSetToken(res.data.token);
    });
}

export const loginService = {
    login
}