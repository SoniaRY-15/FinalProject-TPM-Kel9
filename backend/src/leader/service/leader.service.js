const leaderRepo = require('../repository/leader.repository');

const createLeader = (data) => leaderRepo.createLeader(data);
const findLeaderByTeamId = (teamId) => leaderRepo.findLeaderByTeamId(teamId);
const findLeaderByEmail = (email) => leaderRepo.findByEmail(email);
const findLeaderByWhatsapp = (whatsapp) => leaderRepo.findByWhatsapp(whatsapp);
const findLeaderByLineId = (lineId) => leaderRepo.findByLineId(lineId);



module.exports = {
  createLeader,
  findLeaderByTeamId,
  findLeaderByEmail,
  findLeaderByWhatsapp,
  findLeaderByLineId,
};
