const fs = require('fs')
const File = require('../models/File')
const config = require('config')

class FileServices {
    createDir(file) {
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`;
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({ message: 'File was created' });
                } else {
                    return reject({ message: 'File already exists' });
                }
            } catch (e) {
                return reject({ message: 'File error' });
            }
        })

    }
}

module.exports = new FileServices();