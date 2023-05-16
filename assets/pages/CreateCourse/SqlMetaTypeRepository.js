import {HttpRequest} from '../../Service/HttpRequest';

class SqlMetaTypeRepositoryClass {
    constructor(request) {
        this.request = request;
        this.metaTypes = null;
    }

    async get() {
        return this.metaTypes ? new Promise(resolve => resolve(this.metaTypes)) : new Promise(
            (resolve, reject) =>
                this.request.get(
                    "/api/sql-metadata/index",
                    (data) => {
                        this.metaTypes = data;
                        resolve(this.metaTypes);
                    },
                    reject)
        );
    }
}

export const SqlMetaTypeRepository = new SqlMetaTypeRepositoryClass(HttpRequest)