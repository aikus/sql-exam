import { HttpRequest } from "/assets/Service/HttpRequest";

export const ScreenshotRepository = {

    create: async (messageId, file, handleSuccess, handleError) => {
        const formData = new FormData();

        if (null === file) return;

        formData.append('messageId', messageId);
        formData.append('file', file);

        return HttpRequest.upload(
            '/api/visitor-feedback/screenshot',
            formData,
            handleSuccess,
            handleError
        ).then(r => r);
    },
    multiCreate: async (messageId, files, handleSuccess, handleError) => {
        const formData = new FormData();

        if (null === files) return;

        files.map((file, key) => {
            formData.append('messageId'+key, messageId);
            formData.append('file'+key, file);
        })

        return HttpRequest.upload(
            '/api/visitor-feedback/screenshot',
            formData,
            handleSuccess,
            handleError
        ).then(r => r);
    },
}