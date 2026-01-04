const db = require('../../helpers/db');

// bagian bikin teamnya
const createTeam = async (data) => {
  return db.team.create({
    data,
  });
};

// ini untuk bagian register sama login
const findTeamByName = async (name) => {
  return db.team.findUnique({
    where: { name },
  });
};

//ini untuk dashboard user cuman masih belum kepakai
const findTeamByIdWithLeader = async (id) => {
  return db.team.findUnique({
    where: { id },
    include: {
      leader: true,
    },
  });
};

module.exports = {
  createTeam,
  findTeamByName,
  findTeamByIdWithLeader,
};
