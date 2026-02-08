const db = require("../helpers/db");

/**
 * Get all teams dengan leader, dengan search dan sort
 */
const getAllTeamsWithLeader = async ({ search, sortBy, sortOrder }) => {
  const where = {};

  // Filter berdasarkan search (case-insensitive)
  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  // Determine sort order
  const orderBy = {};
  if (sortBy === "name") {
    orderBy.name = sortOrder === "asc" ? "asc" : "desc";
  } else {
    // Default sort by createdAt
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

/**
 * Get single team dengan leader-nya
 */
const getTeamWithLeader = async (teamId) => {
  return db.team.findUnique({
    where: { id: teamId },
    include: {
      leader: true,
    },
  });
};

/**
 * Update team dan/atau leader data
 * updateData bisa contain team fields atau leader fields
 */
const updateTeam = async (teamId, updateData) => {
  // Separate team data dan leader data
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

  // Update team
  let updatedTeam = null;
  if (Object.keys(teamUpdate).length > 0) {
    updatedTeam = await db.team.update({
      where: { id: teamId },
      data: teamUpdate,
      include: { leader: true },
    });
  }

  // Update leader
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

  // Jika tidak ada update, ambil data terbaru saja
  if (!updatedTeam) {
    updatedTeam = await db.team.findUnique({
      where: { id: teamId },
      include: { leader: true },
    });
  }

  return updatedTeam;
};

/**
 * Delete team (cascade delete leader juga)
 */
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
