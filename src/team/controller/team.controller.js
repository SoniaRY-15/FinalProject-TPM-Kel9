const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const teamService = require('../service/team.service');

// password rule
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.empty': 'Nama team tidak boleh kosong',
      'any.required': 'Nama team tidak boleh kosong',
      'string.min': 'Nama team minimal 3 karakter',
    }),

  password: Joi.string().pattern(PASSWORD_REGEX).required().messages({
    'string.pattern.base':
      'Password minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan simbol',
  }),
  type: Joi.string()
    .valid('BINUSIAN', 'NON_BINUSIAN')
    .required()
    .messages({
      'string.empty': 'Tipe peserta tidak boleh kosong',
      'any.only': 'Tipe peserta harus BINUSIAN atau NON_BINUSIAN',
      'any.required': 'Tipe peserta wajib dipilih',
    }),
});

const loginSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
});

const registerTeam = async (req, res, next) => {
  try {
    const { name, password, type } = await registerSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    const exists = await teamService.findTeamByName(name);
    if (exists) {
      return res.status(409).json({ message: 'Nama team sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const team = await teamService.createTeam({
      name,
      password: hashedPassword,
      type,
    });

    // token untuk lanjut step leader (tanpa "login" page)
    const token = jwt.sign(
      { teamId: team.id, role: 'TEAM' },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );

    return res.status(201).json({
      message: 'Team berhasil dibuat',
      data: {
        token,
        teamId: team.id,
        name: team.name,
        type: team.type,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const loginTeam = async (req, res, next) => {
  try {
    const { name, password } = await loginSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    const team = await teamService.findTeamByName(name);
    if (!team) {
      return res
        .status(401)
        .json({ message: 'Nama team atau password salah' });
    }

    const ok = await bcrypt.compare(password, team.password);
    if (!ok) {
      return res
        .status(401)
        .json({ message: 'Nama team atau password salah' });
    }

    const token = jwt.sign(
      { teamId: team.id, role: 'TEAM' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Login berhasil',
      data: { token },
    });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({
        message: 'Validasi gagal',
        errors: err.details.map(d => d.message),
      });
    }
    next(err);
  }
};


const getMe = async (req, res, next) => {
  try {
    const teamId = req.user.teamId;

    const team = await teamService.findTeamByIdWithLeader(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team tidak ditemukan' });
    }

    delete team.password;

    return res.json({ data: team });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerTeam,
  loginTeam,
  getMe,
};
