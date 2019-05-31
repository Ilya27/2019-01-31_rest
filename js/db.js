export default class DB {
    constructor(url, version) {
        this.domain = url;
        this.apiVersion = version;
    }

    getStudents() {
        return $.ajax(`${this.domain}/api/v${this.apiVersion}/students`);
    }

    getStudentById(id) {
        return $.ajax(`${this.domain}/api/v${this.apiVersion}/students/${id}`);
    }

    updateStudentById(id, data) {
        return $.ajax({
            url: `${this.domain}/api/v${this.apiVersion}/students/${id}`,
            method: 'PUT',
            data: data
        })
    }

    deleteStudentById(id) {
        return $.ajax({
            url: `${this.domain}/api/v${this.apiVersion}/students/${id}`,
            method: 'DELETE'
        })
    }

    createStudent(data) {
        return $.ajax({
            url: `${this.domain}/api/v${this.apiVersion}/students`,
            method: 'POST',
            data: data
        })
    }
}