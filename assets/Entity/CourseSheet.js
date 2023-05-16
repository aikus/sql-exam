export class CourseSheet {
    constructor(id, course, student, actualElement, createdAt, updatedAt, status) {
        this.id = id
        this.course = course
        this.student = student
        this.actualElement = actualElement
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.status = status
    }

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get course() {
        return this._course;
    }
    set course(course) {
        this._course = course;
    }
    get student() {
        return this._student;
    }
    set student(student) {
        this._student = student;
    }
    get actualElement() {
        return this._actualElement;
    }
    set actualElement(actualElement) {
        this._actualElement = actualElement;
    }
    get createdAt() {
        return this._createdAt;
    }
    set createdAt(createdAt) {
        this._createdAt = createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    set updatedAt(updatedAt) {
        this._updatedAt = updatedAt;
    }
    get status() {
        return this._status;
    }
    set status(status) {
        this._status = status;
    }
}