import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/", routes);
