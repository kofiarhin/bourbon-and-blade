import { createHttpError } from './httpError.js';

const assertString = (value, field) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw createHttpError(400, `${field} is required`);
  }

  return value.trim();
};

const assertEmail = (value, field) => {
  const email = assertString(value, field).toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw createHttpError(400, `${field} must be a valid email address`);
  }

  return email;
};

const assertDate = (value, field) => {
  const date = assertString(value, field);
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(date)) {
    throw createHttpError(400, `${field} must use YYYY-MM-DD format`);
  }

  return date;
};

const assertTime = (value, field) => {
  const time = assertString(value, field);
  const timePattern = /^\d{2}:\d{2}$/;

  if (!timePattern.test(time)) {
    throw createHttpError(400, `${field} must use HH:MM format`);
  }

  return time;
};

const composeDateTime = (date, time) => `${date}T${time}:00`;

export { assertString, assertEmail, assertDate, assertTime, composeDateTime };
