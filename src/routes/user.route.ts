import { Router } from 'express';

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({ message: "Welcome to the user route" });
});

userRouter.get("/:id", (req, res) => {
  res.json({ message: "User details" });
});

userRouter.post("/", (req, res) => {
  res.json({ message: "User created" });
});

userRouter.put("/:id", (req, res) => {
  res.json({ message: "User updated" });
});

userRouter.delete("/:id", (req, res) => {
  res.json({ message: "User deleted" });
});

export default userRouter;