const {createConnection} = require("typeorm");
const {User} = require("./entities/user")

const dbConfig = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
};

async function connectDatabase() {
    try {
        await createConnection(dbConfig)
        console.log('Connected tj the database')
    } catch (e) {
        console.log('Error connecting on the database', e)
    }
}

module.exports = { connectDatabase };