module.exports = {
    name: 'ready',
    run: async (client) => {
        console.log(`${client.user.username} is Successfully Connected to Discord API!`)
    }
}