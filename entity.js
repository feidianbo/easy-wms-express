var mongoose = require('mongoose');

exports.Pager = {
    total: 0,
    rows: Array
}
exports.User = mongoose.model('User', exports.UserSchema = new mongoose.Schema(
    {
            id: {           //编号
            type: Number,
            required: true
        },
        name: {             //姓名
            type: String,
            required: true
        },
        password: String,   //口令
        sex: {              //性别
            type: String,
            enum: ['M', 'F']//只能是男或女
        },
        birth: Date,        //出生日期
        age: {              //年龄
            type: Number,
            min: 18,
            max: 80,
            default: 35
        },
        others: Array       //其它
    }
));
