import {HttpRequest} from '../../Service/HttpRequest';

class CourseElementRepositoryClass {
    constructor(request) {
        this.request = request;
    }

    async save(courseElement, courseId) {
        courseElement.course = '/api-platform/courses/' + courseId;
        return new Promise(
            (resolve, reject) => courseElement.id ?
                this.request.put(
                    "/api-platform/course_elements/" + courseElement.id,
                    courseElement,
                    resolve,
                    reject) :
                this.request.post(
                    "/api-platform/course_elements",
                    courseElement,
                    resolve,
                    reject)
        );
    }

    async delete(courseElement) {
        if (!courseElement.id) {
            return new Promise(resolve => resolve());
        }
        return new Promise(
          (resolve, reject) =>
            this.request.delete(
              "/api-platform/course_elements/" + courseElement.id,
              resolve,
              reject)
        );
    }

    async getByCourse(course) {
        return new Promise((resolve, reject) => {
            if (!course.type || course.type.length < 1) {
                resolve([]);
            }

            const arr = [];
            course.type.forEach(courseElement => {
                this.request.get(courseElement, data => {
                    arr.push(data);
                    if (arr.length === course.type.length) {
                        arr.sort((aElement, bElement) => {
                            if (aElement.ord < bElement.ord) {
                                return -1;
                            } else if (aElement.ord > bElement.ord) {
                                return 1;
                            }
                            return 0;
                        });
                        resolve(arr.map(element => {
                            if(!element.description) {
                                element.description = '';
                            }
                            return element
                        }));
                    }
                }, reject);
            });
        })
    }

}

export const CourseElementRepository = new CourseElementRepositoryClass(HttpRequest)