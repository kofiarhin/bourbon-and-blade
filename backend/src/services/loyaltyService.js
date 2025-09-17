import { randomUUID } from 'node:crypto';
import { addLoyaltyMember, findLoyaltyMemberByEmail } from '../data/mockDb.js';
import { createHttpError } from '../utils/httpError.js';
import { assertString, assertEmail } from '../utils/validators.js';

const registerLoyaltyMember = ({ name, email }) => {
  const trimmedName = assertString(name, 'Name');
  const normalizedEmail = assertEmail(email, 'Email');

  const existing = findLoyaltyMemberByEmail(normalizedEmail);

  if (existing) {
    throw createHttpError(409, 'You are already part of the Blade & Bourbon Reserve loyalty program');
  }

  return addLoyaltyMember({
    id: randomUUID(),
    name: trimmedName,
    email: normalizedEmail,
    joinedAt: new Date().toISOString()
  });
};

export { registerLoyaltyMember };
