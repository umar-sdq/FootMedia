import express from "express";
import cors from "cors";
import usersRoutes from "./routes/user-routes.js";
import { connectDB } from "./util/bd.js";
import postsRoutes from "./routes/posts-routes.js";

await connectDB();
const app = express();

app.use(cors()); 

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.use((req, res, next) => {
  const error = new Error("Route non trouvée");
  error.code = 404;
  next(error);
});

app.listen(5001, () => {
  console.log("serveur écoute sur http://localhost:5001");
});
