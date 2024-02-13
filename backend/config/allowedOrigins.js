const allowedOriginsJson = process.env.ALLOWED_ORIGINS_JSON || '[]'

const allowedOrigins = JSON.parse(allowedOriginsJson)

module.exports = allowedOrigins;