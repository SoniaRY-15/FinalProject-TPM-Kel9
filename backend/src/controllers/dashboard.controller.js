const teamService = require("../team/service/team.service");
const leaderService = require("../leader/service/leader.service");
const landingData = require("../data/landing.data");
const { success, fail } = require("../utils/response");

/**
 * GET /api/dashboard
 * Get dashboard data including team info, leader data, timeline, and contact
 */
const getDashboard = async (req, res, next) => {
  try {
    const teamId = req.user.teamId;

    // Get team with leader data
    const team = await teamService.findTeamByIdWithLeader(teamId);
    if (!team) {
      return fail(res, "Team tidak ditemukan", 404);
    }

    // Remove sensitive data
    delete team.password;

    // Format leader data for frontend
    const leaderData = team.leader
      ? {
          fullName: team.leader.fullName,
          email: team.leader.email,
          whatsapp: team.leader.whatsapp,
          lineId: team.leader.lineId,
          github: team.leader.github,
          birthPlace: team.leader.birthPlace,
          birthDate: team.leader.birthDate,
          cvFileUrl: team.leader.cvFileUrl,
          flazzFileUrl: team.leader.flazzFileUrl,
          idCardFileUrl: team.leader.idCardFileUrl,
        }
      : null;

    // Get timeline data from landing data
    const timeline = landingData.timeline?.events || [];

    // Get contact info
    const contactInfo = {
      email: landingData.contact?.contactEmail,
      phone: "To be announced",
    };

    const dashboardData = {
      team: {
        id: team.id,
        name: team.name,
        type: team.type,
        createdAt: team.createdAt,
      },
      leader: leaderData,
      timeline,
      contactInfo,
    };

    return success(
      res,
      dashboardData,
      "Dashboard data fetched successfully",
      200,
    );
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/dashboard/files/:type/:filename
 * Stream file untuk download atau view
 * type: cv, flazz, idCard
 */
const getFile = async (req, res, next) => {
  try {
    const { type, filename } = req.params;
    const path = require("path");
    const fs = require("fs");

    // Validate file type
    const validTypes = ["cv", "flazz", "idCard"];
    if (!validTypes.includes(type)) {
      return fail(res, "Invalid file type", 400);
    }

    // Construct file path securely
    // backend/src/images/cv/filename.pdf
    const baseDir = path.join(__dirname, "..", "images", type);
    const filePath = path.resolve(path.join(baseDir, filename));

    // Prevent directory traversal attacks
    if (!filePath.startsWith(baseDir)) {
      return fail(res, "Forbidden", 403);
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return fail(res, "File tidak ditemukan", 404);
    }

    // Get file extension
    const ext = path.extname(filePath).toLowerCase();

    // Set content type based on extension
    let contentType = "application/octet-stream";
    if (ext === ".pdf") {
      contentType = "application/pdf";
    } else if ([".jpg", ".jpeg"].includes(ext)) {
      contentType = "image/jpeg";
    } else if (ext === ".png") {
      contentType = "image/png";
    }

    // Set headers untuk download
    const isDownload = req.query.download === "true";
    if (isDownload) {
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`,
      );
    } else {
      res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    }

    res.setHeader("Content-Type", contentType);

    // Stream file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on("error", (err) => {
      if (err.code === "ENOENT") {
        res.status(404).json({ message: "File tidak ditemukan" });
      } else {
        res.status(500).json({ message: "Error membaca file" });
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/dashboard/timeline
 * Get timeline events with links if available
 */
const getTimeline = async (req, res, next) => {
  try {
    const timeline = landingData.timeline?.events || [];

    const formattedTimeline = timeline.map((event) => ({
      date: event.date,
      year: event.year,
      title: event.title,
      description: event.description,
      meetingLink: event.meetingLink || null,
    }));

    return success(
      res,
      { events: formattedTimeline },
      "Timeline fetched successfully",
      200,
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboard,
  getFile,
  getTimeline,
};
