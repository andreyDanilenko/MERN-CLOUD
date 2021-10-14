// для создания приложений на nodejs
const express = require('express');
// для управления db в mongodb
const mongoose = require('mongoose');
// для описания конфигураций 
const config = require('config');
// подключаем библиотеку к переменной
const app = express();
const PORT = config.get('serverPort')

const start = async () => {
    try {
        // подключаемся к базе данных
        await mongoose.connect(config.get("dbUrl"))
        // Первый параметр метода принимает номер порта
        // Второй параметр callback после запуска сервера
        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {

    }
}

start();