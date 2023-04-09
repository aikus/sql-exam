import { HttpRequest } from "../Service/HttpRequest";
import { User } from "../Entity/User";

export const UserRepository = {
    get: (id) => {
        let result;
        HttpRequest.get(
            `/api-platform/users/${id}`,
            (data) => {
                result = data;
            },
            (error) => {
                console.error(error)
            }
        )
        return result;
    },

    /** @returns {Promise<User>} */
    getUserInfo: async () => {
        let user = new User;

        return HttpRequest.get(
            `/api/user/info`,
            data => {
                user.email = data.userIdentifier;
                user.fio = data.userFio;
                return user;
            },
            (error) => {
                console.error(error)
            }
        )
    },
}