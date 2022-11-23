import {HttpRequest} from '../../Service/HttpRequest';

class CourseRepositoryClass {
    constructor(request) {
        this.request = request;
        this.cache = {
            "new": null,
            "completed": null,
            "started": null
        }
    }

    async getNewCourses() {
        return this._getCourseObjectsByType("new");
    }

    async getCompletedCourses() {
        return this._getCourseObjectsByType("completed");
    }

    async getStartedCourses() {
        return this._getCourseObjectsByType("started");
    }

    async _findCoursesId(type) {
        return new Promise((resolve, reject) => this.request.get("/api-courses/" + type + "/list", resolve, reject));
    }

    async _getCourseById(id) {
        return new Promise((resolve, reject) => this.request.get(id, resolve, reject));
    }

    async _getObjectsArrayByIdArray(idArray) {
        if(!idArray || 0 === idArray.length) {
            return new Promise(resolve => resolve([]));
        }
        return new Promise((resolve, reject) => {
            const result = [];
            idArray.forEach(id => {
                this._getCourseById(id).then(obj => {
                    result.push(obj);
                    if(result.length === idArray.length) {
                        resolve(result);
                    }
                }).catch(reject);
            })
        })
    }

    async _getCourseObjectsByType(type) {
        const cache = this._getCache(type);
        if(null !== cache) {
            return cache;
        }
        const ids = await this._findCoursesId(type);
        const result = await this._getObjectsArrayByIdArray(ids);
        this._setCache(type, result);
        return result;
    }

    _getCache(type) {
        const now = new Date().getTime();
        console.log(now, this.cache[type])
        if(!this.cache[type] || now - this.cache[type].time > 100) {
            return null;
        }
        return this.cache[type].data;
    }

    _setCache(type, data) {
        this.cache[type] = {
            data: data,
            time: new Date().getTime()
        }
    }
}
const CourseRepository = new CourseRepositoryClass(HttpRequest);
export default CourseRepository;