const { parse } = require('path');
const teamRepository = require('../repository/team.repository');

const createTeam = async (data) => teamRepository.createTeam(data);
const findTeamByName = async (name) => teamRepository.findTeamByName(name);
const findTeamByIdWithLeader = async (id) => teamRepository.findTeamByIdWithLeader(id);

module.exports = {
  createTeam,
  findTeamByName,
  findTeamByIdWithLeader,
};
