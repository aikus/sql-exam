
export class User {
    constructor(id = null, email = null, roles = null, password = null, fio = null, examinationSheets = null) {
        this.id = id;
        this.email = email;
        this.roles = roles;
        this.password = password;
        this.fio = fio;
        this.examinationSheets = examinationSheets;
    }

    get id() {
        return this._id
    }
    get email() {
        return this._email
    }
    get roles() {
        return this._roles
    }
    get password() {
        return this._password
    }
    get fio() {
        return this._fio
    }
    get examinationSheets() {
        return this._examinationSheets
    }
    set id(id) {
        this._id = id
    }
    set email(email) {
        this._email = email
    }
    set roles(roles) {
        this._roles = roles
    }
    set password(password) {
        this._password = password
    }
    set fio(fio) {
        this._fio = fio
    }
    set examinationSheets(examinationSheets) {
        this._examinationSheets = examinationSheets
    }
}

export default new User()