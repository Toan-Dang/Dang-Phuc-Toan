import express from "express";
import { deserializeUser } from "../../middlewares/deserializeUser";
import {createResource, filterResource, getAllResource, deleteResource, updateResource, getDetailResource} from "./resource.controller";
const router = express.Router();
router.use(deserializeUser)
router.get("/resource", getAllResource);
router.get("/resource/filter/search", filterResource);
router.get("/resource/:id", getDetailResource);
router.post("/create-resource", createResource);
router.put("/update-resource", updateResource);
router.delete("/delete-resource", deleteResource)
export default router;
