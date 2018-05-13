module.exports = {
    name: 'Node Todo',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        uri: 'mongodb://localhost:27017/nodetodo',
    }
}