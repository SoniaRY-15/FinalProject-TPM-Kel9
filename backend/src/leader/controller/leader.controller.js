const Joi = require('joi');
const leaderService = require('../service/leader.service.js');
const teamService = require('../../team/service/team.service');
const fs = require('fs');
const path = require('path');

const cleanUp = (req) => { //cuman untuk misalnya usernya gagal validasi terus filenya dihapus biar ga kemasuk ke folder images
  if (!req.files) return;

  const allFiles = Object.values(req.files).flat(); 
  for (const file of allFiles) {
    if (file?.path && fs.existsSync(file.path)) {
      try {
        fs.unlinkSync(file.path);
      } catch (e) {

      }
    }
  }
};


// fungsi cek umur minimal 17
const isAtLeast17 = (dateVal) => {
  const dob = new Date(dateVal);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age >= 17;
};

const leaderSchema = Joi.object({
  
 fullName: Joi.string()

     .min(3)
     .required()
     .messages({
       'string.empty': 'Nama leader tidak boleh kosong',
       'any.required': 'Nama leader tidak boleh kosong',
       'string.min': 'Nama leader minimal 3 karakter',
     }),
  email: Joi.string().email().required().messages({
    'string.email': 'Masukin email yang valid seperti user@gmail.com',
    'any.required': 'Email tidak boleh kosong',
    'string.empty': 'Email tidak boleh kosong',
  }),
  whatsapp: Joi.string().min(9).required().messages({
    'string.min': 'Nomor Whatsapp minimal 9 digit',
    'any.required': 'Whatsapp tidak boleh kosong',
    'string.empty': 'Whatsapp tidak boleh kosong',
  }),
  lineId: Joi.string().required().messages({
    'any.required': 'LINE ID tidak boleh kosong',
    'string.empty': 'LINE ID tidak boleh kosong',
  }),
  github: Joi.string().allow(null, ''),
  birthPlace: Joi.string().required().messages({
    'any.required': 'Birth place tidak boleh kosong',
    'string.empty': 'Birth place tidak boleh kosong',
  }),
  birthDate: Joi.date().required().messages({
    'any.required': 'Birth date tidak boleh kosong',
    'date.base': 'Birth date harus berupa tanggal yang valid',
    'date.empty': 'Birth date tidak boleh kosong',
  }),
  
});

const createLeader = async (req, res, next) => {
  try {
    const teamId = req.user.teamId;

    // ambil team (cek BINUSIAN/NON + apakah leader sudah ada)
    const team = await teamService.findTeamByIdWithLeader(teamId);
    if (!team) {
      cleanUp(req);
      return res.status(404).json({ message: 'Team tidak ditemukan' });
    }
    if (team.leader) {
      cleanUp(req);
      return res.status(409).json({ message: 'Leader untuk team ini sudah terdaftar' });
    }

    const payload = await leaderSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    if (!isAtLeast17(payload.birthDate)) {
      cleanUp(req);
      return res.status(400).json({ message: 'Umur minimal 17 tahun' });
    }

    //bagian cek unique
    // email unik
    const emailExists = await leaderService.findLeaderByEmail(payload.email);
    if (emailExists) {
      cleanUp(req);
      return res.status(409).json({ message: 'Email sudah terdaftar, gunakan email lain' });
    }

    // whatsapp unik
    const waExists = await leaderService.findLeaderByWhatsapp(payload.whatsapp);
    if (waExists) {
      cleanUp(req);
      return res.status(409).json({ message: 'Nomor Whatsapp sudah terdaftar, gunakan nomor lain' });
    }

    // lineId unik
    const lineExists = await leaderService.findLeaderByLineId(payload.lineId);
    if (lineExists) {
      cleanUp(req);
      return res.status(409).json({ message: 'LINE ID sudah terdaftar, gunakan LINE ID lain' });
    }

    // ====== FILE UPLOAD ======
    const cvFile = req.files?.cv?.[0];
    const flazzFile = req.files?.flazz?.[0];
    const idCardFile = req.files?.idCard?.[0];

    const cvFileUrl = cvFile ? `/images/cv/${cvFile.filename}` : null;
    const flazzFileUrl = flazzFile ? `/images/flazz/${flazzFile.filename}` : null;
    const idCardFileUrl = idCardFile ? `/images/idCard/${idCardFile.filename}` : null;

    if (!cvFileUrl) {
      return res.status(400).json({ message: 'CV wajib diupload' });
    }

    if (team.type === 'BINUSIAN' && !flazzFileUrl) {
      return res.status(400).json({ message: 'Flazz Card wajib diupload untuk BINUSIAN' });
    }

    if (team.type === 'NON_BINUSIAN' && !idCardFileUrl) {
      return res.status(400).json({ message: 'ID Card wajib diupload untuk NON BINUSIAN' });
    }

    const leader = await leaderService.createLeader({
      ...payload,
      teamId,
      cvFileUrl,
      flazzFileUrl,
      idCardFileUrl,
    });

    return res.status(201).json({
      message: 'Leader berhasil dibuat',
      data: leader,
    });
  } catch (err) {
    // Joi error
    if (err.isJoi) {
      cleanUp(req);
      return res.status(400).json({
        message: 'Validasi gagal',
        errors: err.details.map((d) => d.message),
      });
    }

    // Prisma unique constraint (jaga-jaga kalau race condition)
    // P2002 => Unique constraint failed
    if (err?.code === 'P2002') {
      const fields = err?.meta?.target || [];
      const field = Array.isArray(fields) ? fields[0] : fields;

      const map = {
        email: 'Email sudah terdaftar, gunakan email lain',
        whatsapp: 'Nomor Whatsapp sudah terdaftar, gunakan nomor lain',
        lineId: 'LINE ID sudah terdaftar, gunakan LINE ID lain',
        teamId: 'Leader untuk team ini sudah terdaftar',
      };

      return res.status(409).json({
        message: map[field] || 'Data sudah terdaftar (unik)',
      });
    }

    next(err);
  }
};

module.exports = { createLeader };
