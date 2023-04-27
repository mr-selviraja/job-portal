import jobModel from "../models/jobModel.js";

export const createJobController = async (req, res, next) => {
  try {
    const { company, position, jobType } = req.body;

    if (!company || !position) {
      next("Please input values!");
    }

    if (jobType === "Teaching") {
      next("Teaching job is not allowed!");
    }

    const newJob = {
      company,
      position,
      jobType,
    };

    const job = await jobModel.create(newJob);

    res.status(200).json({
      success: true,
      message: "Job added Successfully!",
    });
  } catch (err) {}
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobModel.find();

    res.status(200).json({
      success: true,
      jobs,
      totalJobs: jobs.length,
    });
  } catch (err) {}
};

export const updateJobController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { workLocation, position } = req.body;

    if (!workLocation || !position) {
      next("Provide all fields");
    }

    const job = await jobModel.findOne({ _id: id });

    if (!job) {
      next(`No job found with the id: ${id}`);
    }

    const updatedJob = await jobModel.findOneAndUpdate(
      { _id: id },
      {
        workLocation,
        position,
      }
    );

    res.status(200).json({
      updatedJob,
    });
  } catch (err) {}
};

export const deleteJobController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await jobModel.findOne({ _id: id });
    if (!job) {
      next("No Job Found!");
    }

    await job.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Deleted document successfully!",
    });
  } catch (err) {}
};
