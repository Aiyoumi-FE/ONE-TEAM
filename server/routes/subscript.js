const Subscript = require('../controllers/subscript')

module.exports = {
    'POST /subscript/getRecordList': Subscript.getRecordList,
    'POST /subscript/addRecord': Subscript.addRecord,
    'POST /subscript/deleteRecord': Subscript.deleteRecord,
    'POST /subscript/getUserByName': Subscript.getUserByName,
    'POST /subscript/getMySubList': Subscript.getMySubList
}
