import fs from 'fs'
import path from 'path'

const index = async(ctx, next) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream(path.join(__dirname, '..', '..', '/client/dist/index.html'));
}

module.exports = {
    'GET /page/**': index
}
