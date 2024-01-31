class UsernameExistException extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'UsernameExistException';
        this.code = code || 400;
    }
}

class EmailExistException extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'EmailExistException';
        this.code = code || 400;
    }
}

class AllFieldsRequired extends Error {
    constructor(message, code) {
        super(message);
        this.name = this.constructor.name;
        this.code = code || 400;
    }
}

module.exports = {
    UsernameExistException,
    EmailExistException,
    AllFieldsRequired
};