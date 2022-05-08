require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'dev',
    DB_USER:    process.env.DB_USER,
    DB_PASSWORD:    process.env.DB_PASSWORD,
    DB_HOST:    process.env.DB_HOST,
    REDIS_URL: "redis://default:" + process.env.REDIS_PASSWORD + "@" + process.env.REDIS_HOST + ":" + process.env.REDIS_PORT
}

module.exports = {config}