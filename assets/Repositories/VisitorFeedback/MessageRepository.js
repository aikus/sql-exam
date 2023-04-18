import { HttpRequest } from "/assets/Service/HttpRequest";

export const MessageRepository = {

    create: async (dataObject, handleSuccess, handleError) => {
        return await HttpRequest.post(`/api-platform/messages`, dataObject, handleSuccess, handleError)
            .then(r => r);
    }
}