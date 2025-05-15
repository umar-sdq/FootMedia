import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/user-routes.js";
import { connectDB } from "./util/bd.js";
import postsRoutes from "./routes/posts-routes.js";

dotenv.config();

await connectDB();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.use((req, res, next) => {
  const error = new Error("Route non trouvée");
  error.code = 404;
  next(error);
});

app.listen(PORT, () => {
  console.log(` Serveur écoute sur http://localhost:${PORT}`);
});
