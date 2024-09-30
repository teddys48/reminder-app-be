const usecase = require("../usecase/jobs.usecase");

const addJobs = async (req, res) => {
  let response = await usecase.addJobs(req);

  res.json(response);
};

const deleteJobs = async (req, res) => {
  let response = await usecase.deleteJobs(req);

  res.json(response);
};

module.exports = { addJobs, deleteJobs };
