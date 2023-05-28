import { HttpRequest } from '/assets/Service/HttpRequest';

class CourseElementSettingRepositoryClass {
    constructor(request) {
        this.request = request;
    }

    async save(elementSetting, courseElementId) {
        elementSetting.courseElement = '/api-platform/course_elements/' + courseElementId;
        return new Promise(
            (resolve, reject) => elementSetting.id
                ? this.request.put(
                    "/api-platform/course_element_settings/" + elementSetting.id,
                    elementSetting,
                    resolve,
                    reject
                )
                : this.request.post(
                    "/api-platform/course_element_settings",
                    elementSetting,
                    resolve,
                    reject
                )
        );
    }

    async getByCourseElement(courseElement) {
        try {
            const settingList = courseElement.settings ?? [];
            return new Promise((resolve, reject) => {
                if (settingList.length === 0) resolve([]);
                let result = [];
                settingList.forEach(setting => {
                    this.request.get(setting, data => {
                        result.push(data);
                        if (result.length === settingList.length) {
                            resolve(result);
                        }
                    }, reject);
                });
            })
        }
        catch (Error) {
            console.error('Error', Error)
            console.error('courseElement', courseElement)
        }
    }
}
export const CourseElementSettingRepository = new CourseElementSettingRepositoryClass(HttpRequest);
