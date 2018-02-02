import {
    _postPromise
} from '../assets/js/ajax'

export const getRecordList = (param) => {
    return _postPromise('/api/subscript/getRecordList', param)
}

export const addRecord = (param) => {
    return _postPromise('/api/subscript/addRecord', param)
}

export const deleteRecord = (param) => {
    return _postPromise('/api/subscript/deleteRecord', param)
}

export const getAllUser = (param) => {
    return _postPromise('/api/subscript/getAllUser', param)
}

export const getUserByName = (param) => {
    return _postPromise('/api/subscript/getUserByName', param)
}

export const getMySubList = (param) => {
    return _postPromise('/api/subscript/getMySubList', param)
}
