import express from "express";
import { login, createAccount } from "./auth.controller";
const router = express.Router();

router.post("/login", login);
router.post("/create-account", createAccount);
export default router;
