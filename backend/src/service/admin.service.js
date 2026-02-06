const adminRepo = require("../repository/admin.repository");

// Get all teams dengan leader, dengan fitur search dan sort
const getAllTeamsWithLeader = async ({ search, sortBy, sortOrder }) => {
  return adminRepo.getAllTeamsWithLeader({ search, sortBy, sortOrder });
};

//get single team dengan leader-nya
const getTeamWithLeader = async (teamId) => {
  return adminRepo.getTeamWithLeader(teamId);
};

// Update team and/or leader data
const updateTeam = async (teamId, updateData) => {
  return adminRepo.updateTeam(teamId, updateData);
};

//delete
const deleteTeam = async (teamId) => {
  return adminRepo.deleteTeam(teamId);
};

module.exports = {
  getAllTeamsWithLeader,
  getTeamWithLeader,
  updateTeam,
  deleteTeam,
};
