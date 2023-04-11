export const API_ROOT = 'http://127.0.0.1:8001'
export const TIME_OUT = 10000

export default {
    API_ROOT,
    TIME_OUT,
    STAFF: {
        LIST: '/user',
        UPDATE: '/user/:id',
    },
    DEPARTMENT: {
        LIST: '/department',
        UPDATE: '/department/:id',
    },
    TOPIC: {
        LIST: '/topic',
        UPDATE: '/topic/:id',
    },
    ARTICLE: {
        LIST: '/article',
        UPDATE: '/article/:id',
    },
    BOOKS: {
        LIST: '/book',
        UPDATE: '/book/:id',
    },
    SCIENTIFIC: {
        LIST: '/scientific',
        UPDATE: '/scientific/:id',
    },
    EDUCATION: {
        LIST: '/education',
        UPDATE: '/education/:id',
    },
    COMPILATION: {
        LIST: '/compilation',
        UPDATE: '/compilation/:id',
    },
    // luận án
    THESIS: {
        LIST: '/thesis',
        UPDATE: '/thesis/:id',
    },
    CLASS: {
        LIST: '/class',
        UPDATE: '/class/:id',
    },
    SUBJECT: {
        LIST: '/subject',
        UPDATE: '/subject/:id',
    },
    EXAM: {
        LIST: '/exam',
        UPDATE: '/exam/:id',
    },
    ROOM: {
        LIST: '/room',
        UPDATE: '/room/:id',
    },
};