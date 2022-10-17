import {HttpRequest} from "./HttpRequest";

export const StudentTableData = (callback) => {
    HttpRequest.get(`/api/studentData/10`, callback)
}