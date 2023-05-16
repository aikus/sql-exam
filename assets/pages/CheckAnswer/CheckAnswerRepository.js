import {HttpRequest} from '../../Service/HttpRequest';

class CheckAnswerRepositoryClass {
    constructor(request) {
        this.request = request;
    }

    async saveAnswerResult(answer) {
        return new Promise(
            (resolve, reject) => this.request.put(
                    "/api-platform/course_answers/" + answer.id,
                    {
                        answer: answer.answer,
                        courceSheet: answer.courceSheet,
                        created_at: answer.created_at,
                        createdAt: answer.createdAt,
                        id: answer.id,
                        isRight: answer.isRight,
                        result: answer.result,
                        updated_at: answer.updated_at,
                        updatedAt: answer.updatedAt,
                    },
                    resolve,
                    reject)
        );
    }

    async getAnswerList(courseSheetId) {
        const sheet = await this.getCourseSheet(courseSheetId),
            result = [];
        for(let i = 0; i < sheet.courseAnswers.length; i++) {
            const answer = await this.getCourseAnswer(sheet.courseAnswers[i]);
            answer.question = await this.getElementByAnswer(answer);
            result.push(answer);
        }
        return result;
    }

    async getCourseSheet(courseSheetId) {
        return new Promise((resolve, reject) => {
            this.request.get(
                "/api-platform/course_sheets/" + courseSheetId,
                resolve,
                reject
            )
        })
    }

    async getCourseAnswer(url) {
        return new Promise((resolve, reject) => {
            this.request.get(url, resolve, reject);
        })
    }

    async getElementByAnswer(answer) {
        return new Promise((resolve, reject) => this.request.get(answer.question, resolve, reject));
    }
}

export const CheckAnswerRepository = new CheckAnswerRepositoryClass(HttpRequest)