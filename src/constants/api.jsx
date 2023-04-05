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
    }
};