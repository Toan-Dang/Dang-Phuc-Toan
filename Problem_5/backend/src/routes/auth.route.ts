import express from "express";
import { login, createAccount } from "../controller/auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/create-account", createAccount);

export default router;
