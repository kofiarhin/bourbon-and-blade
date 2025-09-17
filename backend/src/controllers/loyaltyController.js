import { registerLoyaltyMember } from '../services/loyaltyService.js';

const registerLoyaltyController = (req, res, next) => {
  try {
    const member = registerLoyaltyMember(req.body || {});
    res.status(201).json({
      memberId: member.id,
      name: member.name,
      email: member.email,
      joinedAt: member.joinedAt
    });
  } catch (error) {
    next(error);
  }
};

export { registerLoyaltyController };
