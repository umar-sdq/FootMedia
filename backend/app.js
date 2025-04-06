import express from "express"
import usersRoutes from "./routes/user-routes.js"
const app = express();

app.use(express.json())

app.use("/api/users", usersRoutes)
app.use((req, res, next) => {
    const error = new Error("Route non trouvee");
    error.code = 404;
    next(error)
})

app.listen(5001, () => {
    console.log("serveur ecoute au", "http://localhost:5001")
})