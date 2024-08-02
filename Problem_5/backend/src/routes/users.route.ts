import express from "express";
import {
  getAllPersons,
  getPersonById,
  updatePerson,
  addPerson,
  deletePerson,
  getUsersByQueryString,
  updateMultiUsers,
} from "../controller/users.controller";
import { deserializeUser } from "../middlewares/deserializeUser";

const router = express.Router();
router.use(deserializeUser);
router.get("/person", getAllPersons);
router.post("/person", addPerson);
router.get("/person/:id", getPersonById);
router.patch("/person/:id", updatePerson);
router.delete("person/:id", deletePerson);

// task 1.2
/**
 * 1. One using GET, for searching through all the records’ usernames and emails containing the
string provided from a query parameter, then return the filtered records. The response should be
in JSON format.
 */
router.get("/person/search/:query", getUsersByQueryString);

/**
 * 2. One using POST, to accept a payload of multiple records and update those records. Add basic
validations like the input records should exist in the system.
 */
router.post("/person/update", updateMultiUsers);

export default router;
