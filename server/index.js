// для создания приложений на nodejs
const express = require('express');
// для управления db в mongodb
const mongoose = require('mongoose');
// для описания конфигураций 
const config = require('config');
const authRouter = require('./routes/auth.routes')
const fileRouter = require('./routes/file.routes')
const corsMiddleware = require('./middleware/cors.middleware')

const app = express();
const PORT = config.get('serverPort')

app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

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