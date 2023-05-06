import { HttpRequest } from "../Service/HttpRequest";
import { User } from "../Entity/User";

const mapUserData = (data) => {
    let user = new User;
    user.id = data.id;
    user.name = data.name;
    user.email = data.email;
    user.fio = data.fio;
    user.roles = data.roles;
    user.examinationSheets = data.examinationSheets;
    return user;
}

export const UserRepository = {
    get: async (id) => {
        return HttpRequest.get(
            `/api-platform/users/${id}`,
            (data) => {
                return mapUserData(data);
            },
            (error) => {
                console.error(error)
            }
        )
    },

    getAll: async (page = 1) => {
        return HttpRequest.get(
            `/api-platform/users?page=${page}`,
            (data) => {
                return data.map(user => mapUserData(user));
            },
            (error) => {
                console.error(error)
            }
        )
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