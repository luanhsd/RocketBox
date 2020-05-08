const Box = require('../models/Box')
const File = require('../models/File')

class FileController {
    async store(request, response) {
        const box = await Box.findById(req.params.id)
        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        })

        box.files.push(file)
        await box.save()

        return response.json(file)
    }
}

module.exports = new FileController()