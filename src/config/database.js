module.exports = { 
    dialect: 'postgres', 
    host: 'Localhost', 
    username: 'postgres', 
    password: 'postgres',
    database: 'hamburguerAPI', 
    define: { 
        timespamps: true,
        underscored: true,
        underscoredAll: true,
    },
}