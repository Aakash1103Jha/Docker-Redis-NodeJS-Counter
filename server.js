const express = require("express")
const redis = require("redis")

const app = express()
const client = redis.createClient({
	// since we are using 'redis-server' in the docker-compose.yml file
	// that container can refered directly with the service name
	host: "redis-server",
	port: 6379,
})

client.set("visits", 0)

app.use("/", async (req, res, next) => {
	process.exit(1)

	client.get("visits", (err, visits) => {
		res.send(`Number of visits: ${visits}`)
		client.set("visits", parseInt(visits) + 1)
	})
})

const PORT = 4000

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
