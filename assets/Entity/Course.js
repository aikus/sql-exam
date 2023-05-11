
export class Course {
    constructor(id, name, description, timeLimit, status, type) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.timeLimit = timeLimit;
        this.status = status;
        this.type = type;
    }
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get timeLimit() {
        return this._timeLimit;
    }

    set timeLimit(timeLimit) {
        this._timeLimit = timeLimit;
    }

    get status() {
        return this._status;
    }

    set status(status) {
        this._status = status;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }
}