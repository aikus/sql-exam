import {HttpRequest} from "./HttpRequest";

export const StudentTableData = (url, callback) => {
    HttpRequest.get(url).then(callback)
}