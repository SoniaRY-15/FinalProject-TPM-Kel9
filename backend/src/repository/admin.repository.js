const db = require("../helpers/db");

const getAllTeamsWithLeader = async ({ search, sortBy, sortOrder }) => {
  const where = {};
  if (search) {
    where.name = {
      contains: search,
    };
  }

  const orderBy = {};
  if (sortBy === "name") {
    orderBy.name = sortOrder === "asc" ? "asc" : "desc";
  } else {
    orderBy.createdAt = sortOrder === "asc" ? "asc" : "desc";
  }

  return db.team.findMany({
    where,
    orderBy,
    include: {
      leader: true,
    },
  });
};

const getTeamWithLeader = async (teamId) => {
  return db.team.findUnique({
    where: { id: teamId },
    include: {
      leader: true,
    },
  });
};

const updateTeam = async (teamId, updateData) => {
  const teamFields = ["name", "password", "type"];
  const leaderFields = [
    "fullName",
    "email",
    "whatsapp",
    "lineId",
    "github",
    "birthPlace",
    "birthDate",
  ];

  const teamUpdate = {};
  const leaderUpdate = {};

  Object.keys(updateData).forEach((key) => {
    if (teamFields.includes(key)) {
      teamUpdate[key] = updateData[key];
    } else if (leaderFields.includes(key)) {
      leaderUpdate[key] = updateData[key];
    }
  });

  let updatedTeam = null;
  if (Object.keys(teamUpdate).length > 0) {
    updatedTeam = await db.team.update({
      where: { id: teamId },
      data: teamUpdate,
      include: { leader: true },
    });
  }

  if (Object.keys(leaderUpdate).length > 0) {
    updatedTeam = await db.team.update({
      where: { id: teamId },
      data: {
        leader: {
          update: leaderUpdate,
        },
      },
      include: { leader: true },
    });
  }

  if (!updatedTeam) {
    updatedTeam = await db.team.findUnique({
      where: { id: teamId },
      include: { leader: true },
    });
  }

  return updatedTeam;
};

const deleteTeam = async (teamId) => {
  return db.team.delete({
    where: { id: teamId },
  });
};

module.exports = {
  getAllTeamsWithLeader,
  getTeamWithLeader,
  updateTeam,
  deleteTeam,
};
