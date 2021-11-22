module.exports ={
    name: "ready",
    description: "Ready event",
    once: true,
    execute(client){
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
};