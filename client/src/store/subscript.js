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
