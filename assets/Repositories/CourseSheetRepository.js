import { HttpRequest } from '/assets/Service/HttpRequest';
import { CourseSheet } from "/assets/Entity/CourseSheet";

class CourseSheetRepositoryClass {
    constructor(request) {
        this.request = request;
    }

    async create(userId, courseId, status) {
        let courseSheet = {};
        courseSheet.student = `/api-platform/users/${userId}`;
        courseSheet.course = `/api-platform/courses/${courseId}`;
        courseSheet.status = status;

        return new Promise((resolve, reject) =>
            this.request.post(
                "/api-platform/course_sheets",
                courseSheet,
                resolve,
                reject
            )
        );
    }
}
const CourseSheetRepository = new CourseSheetRepositoryClass(HttpRequest);
export default CourseSheetRepository;