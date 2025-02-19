import { Router } from 'express';
import { createUser, loginUser, userProfile } from '../controllers/user.controller';
import { userAuth } from '../middlewares/adminAuth.middleware';

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({ message: "Welcome to the user route" });
});

userRouter.get("/:id", (req, res) => {
  res.json({ message: "User details" });
});

userRouter.post("/", createUser);

userRouter.post("/login", loginUser);

userRouter.use(userAuth);

userRouter.get("/profile", userProfile);

userRouter.put("/:id", (req, res) => {
  res.json({ message: "User updated" });
});

userRouter.delete("/:id", (req, res) => {
  res.json({ message: "User deleted" });
});

export default userRouter;