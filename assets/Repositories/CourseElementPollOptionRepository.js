import {HttpRequest} from "/assets/Service/HttpRequest";

class CourseElementPollOptionRepositoryClass {
    constructor(request) {
        this.request = request;
    }

    async save(pollOption, courseElementId) {
        if ('' === pollOption.text) return new Promise(resolve => resolve());
        pollOption.courseElement = '/api-platform/course_elements/' + courseElementId;
        return new Promise(
            (resolve, reject) => pollOption.id ?
                this.request.put(
                    "/api-platform/course_element_poll_options/" + pollOption.id,
                    pollOption,
                    resolve,
                    reject) :
                this.request.post(
                    "/api-platform/course_element_poll_options",
                    pollOption,
                    resolve,
                    reject)
        );
    }

    async remove(pollOption) {
        if (!pollOption.id) {
            return new Promise(resolve => resolve());
        }
        return new Promise(
            (resolve, reject) =>
                this.request.delete(
                    "/api-platform/course_element_poll_options/" + pollOption.id,
                    resolve,
                    reject)
        );
    }

    async getByCourseElement(courseElement) {
        try {
            const pollOptions = courseElement.pollOptions ?? [];
            return new Promise((resolve, reject) => {
                const arr = [];
                pollOptions.forEach(option => {
                    this.request.get(option, data => {
                        arr.push(data);
                        if (arr.length === pollOptions.length) {
                            resolve(arr.map(element => {
                                if(!element.text) {
                                    element.text = '';
                                }
                                return element
                            }));
                        }
                    }, reject);
                });
            })
        }
        catch (Error) {
            console.log('Error', Error)
            console.log('courseElement', courseElement)
        }
    }
}

export const CourseElementPollOptionRepository = new CourseElementPollOptionRepositoryClass(HttpRequest)