import express from "express";
import {
  createJobController,
  getAllJobs,
  updateJobController,
  deleteJobController,
} from "../controllers/jobController.js";

const route = express.Router();

route.post("/create-jobs", createJobController);

route.get("/get-jobs", getAllJobs);

route.patch("/update-job/:id", updateJobController);

route.delete("/delete-job/:id", deleteJobController);

export default route;
