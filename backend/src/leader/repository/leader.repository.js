const db = require('../../helpers/db');

const createLeader = async (data) => {
  return db.leader.create({ data });
};

const findLeaderByTeamId = async (teamId) => {
  return db.leader.findUnique({
    where: { teamId },
  });
};

const findByEmail = async (email) => {
  return db.leader.findUnique({
    where: { email },
  });
}

const findByWhatsapp = async (whatsapp) => {
  return db.leader.findUnique({
    where: { whatsapp },
  });
}

const findByLineId = async (lineId) => {
  return db.leader.findUnique({
    where: { lineId },
  });
}


const create = (data) => prisma.leader.create({ data });



module.exports = {
  createLeader,
  findLeaderByTeamId,
  findByEmail, 
  findByWhatsapp, 
  findByLineId
};
