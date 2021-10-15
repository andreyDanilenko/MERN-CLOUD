// Путь по которому с клиента будет отправляться запрсо на авторизацию пользователя

// Для маршрутизации
const Router = require("express");
// Используем нашу схему формирования данных о пользователе
const User = require("../models/User")
// модуль для хеширования пароля
const bcrypt = require("bcryptjs")

const config = require('config');
const jwt = require('jsonwebtoken')
// Плагин для валидирования пароля на стороне сервера
const { check, validationResult } = require("express-validator")
const router = new Router();

// Указываем URL на который отправим данные из окна регистрации 
// Данная функция обработает email и password и на основе нашей схемы сформирует обьект данных
router.post('/registration',
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: 3, max: 12 })
    ],
    async (req, res) => {
        try {
            console.log(req.body)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            // Тело запроса
            const { email, password } = req.body;
            // передаем email полученный из запроса
            const candidate = await User.findOne({ email })
            // делаем проверку на наличие данного email в базе
            if (candidate) {
                return res.status(400).json({ message: `User with email ${email} already exist` })
            }
            // хешируем пароль идобавляем в обьект данные
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({ email, password: hashPassword })
            // добавляем пользователя в базу данных
            await user.save()
            return res.json({ message: "User was created" })

        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        // compareSync сравнивает зашифрованый с с тем что вводит пользователь
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({ message: "Invalid password" })
        }
        // 1) id пользовавтеля, любой секрктный ключ, время существования
        const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" })
        // возвращаем обрптно на клиент
        console.log('Good');
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })


    } catch (e) {
        console.log(e)
        res.send({ message: "Server error" })
    }
})


module.exports = router