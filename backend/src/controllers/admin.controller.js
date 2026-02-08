const Joi = require("joi");
const adminService = require("../service/admin.service");
const { success, fail } = require("../utils/response");

/**
 * GET /api/admin/participants
 * Get all teams/participants dengan fitur search dan sort
 * Query params:
 *  - search: string (cari berdasarkan nama tim)
 *  - sortBy: 'name' | 'createdAt' (default: 'createdAt')
 *  - sortOrder: 'asc' | 'desc' (default: 'desc')
 */
const getAllParticipants = async (req, res, next) => {
  try {
    const { search, sortBy = "createdAt", sortOrder = "desc" } = req.query;

    // Validasi sortBy dan sortOrder
    const validSortBy = ["name", "createdAt"];
    const validSortOrder = ["asc", "desc"];

    if (!validSortBy.includes(sortBy)) {
      return fail(
        res,
        `sortBy harus salah satu dari: ${validSortBy.join(", ")}`,
        400,
      );
    }

    if (!validSortOrder.includes(sortOrder)) {
      return fail(
        res,
        `sortOrder harus salah satu dari: ${validSortOrder.join(", ")}`,
        400,
      );
    }

    // Ambil semua teams dengan leader
    const teams = await adminService.getAllTeamsWithLeader({
      search,
      sortBy,
      sortOrder,
    });

    return success(res, teams, "Semua participants berhasil diambil", 200);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /api/admin/participants/:teamId
 * View detail team beserta leader-nya
 */
const getTeamDetails = async (req, res, next) => {
  try {
    const { teamId } = req.params;

    // Validasi teamId
    if (!teamId || isNaN(teamId)) {
      return fail(res, "Team ID harus berupa angka", 400);
    }

    const team = await adminService.getTeamWithLeader(parseInt(teamId));

    if (!team) {
      return fail(res, "Team tidak ditemukan", 404);
    }

    return success(res, team, "Detail team berhasil diambil", 200);
  } catch (err) {
    return next(err);
  }
};

/**
 * PUT /api/admin/participants/:teamId
 * Edit data team dan leader
 * Body: { name?, password?, type?, fullName?, email?, whatsapp?, lineId?, github?, birthPlace?, birthDate? }
 */
const editTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const updateData = req.body;

    if (!teamId || isNaN(teamId)) {
      return fail(res, "Team ID harus berupa angka", 400);
    }

    // Validasi data yang dikirim
    const editSchema = Joi.object({
      name: Joi.string().min(3),
      password: Joi.string(),
      type: Joi.string().valid("BINUSIAN", "NON_BINUSIAN"),
      fullName: Joi.string().min(3),
      email: Joi.string().email(),
      whatsapp: Joi.string().min(9),
      lineId: Joi.string(),
      github: Joi.string().allow(null, ""),
      birthPlace: Joi.string(),
      birthDate: Joi.date(),
    }).min(1); // Minimal ada 1 field yang diupdate

    const { error, value } = editSchema.validate(updateData);
    if (error) {
      return fail(res, `Validasi gagal: ${error.message}`, 400);
    }

    // Update team
    const updatedTeam = await adminService.updateTeam(parseInt(teamId), value);

    if (!updatedTeam) {
      return fail(res, "Team tidak ditemukan", 404);
    }

    return success(res, updatedTeam, "Team berhasil diupdate", 200);
  } catch (err) {
    // Handle unique constraint violation
    if (err?.code === "P2002") {
      const field = err?.meta?.target?.[0];
      return fail(res, `${field} sudah terdaftar, gunakan yang lain`, 409);
    }
    return next(err);
  }
};

/**
 * DELETE /api/admin/participants/:teamId
 * Delete team beserta semua data terkait (leader, files, etc)
 */
const deleteTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;

    if (!teamId || isNaN(teamId)) {
      return fail(res, "Team ID harus berupa angka", 400);
    }

    const deleted = await adminService.deleteTeam(parseInt(teamId));

    if (!deleted) {
      return fail(res, "Team tidak ditemukan", 404);
    }

    return success(res, null, "Team berhasil dihapus", 200);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllParticipants,
  getTeamDetails,
  editTeam,
  deleteTeam,
};
