const { Schema, model, ObjectId } = require("mongoose")

// Создаем сущность пользователя для формирования его данных в будущем
// mpngoose по умолчанию создает id пользователю при авторизации 
const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    diskSpace: { type: Number, default: 1024 ** 3 * 10 },
    usedSpace: { type: Number, default: 0 },
    avatar: { type: String },
    files: [{ type: ObjectId, ref: 'File' }]
})

module.exports = model('User', User)