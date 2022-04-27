const express = require("express")

const { ApolloServer} = require("apollo-server-express")
const path = require("path")
const db = require("./config/connection")
const { authMiddleware} = require('./utils/auth')
const { typeDefs, resolvers} = require("./schemas")



const app = express()
const PORT = process.env.PORT || 3001

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware
    })
    await server.start()
    //console.log(`Starting server on ${PORT}${server.graphqlPath}`)
    server.applyMiddleware({ app })
}
startServer()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }
  
  //app.use(routes);
  
  db.once("open", () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });
  