const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

export function validateSignup(body) {
  const firstName = String(body?.firstName || "").trim();
  const lastName = String(body?.lastName || "").trim();
  const email = normalizeEmail(body?.email);
  const role = String(body?.role || "").trim().toUpperCase();
  const password = String(body?.password || "");
  const messages = [];

  if (!firstName) messages.push("First name is required");
  if (!lastName) messages.push("Last name is required");
  if (!email) messages.push("Email is required");
  else if (!EMAIL_REGEX.test(email)) messages.push("Invalid email format");
  if (!role) messages.push("Role is required");
  else if (!["CLIENT", "LAWYER"].includes(role)) messages.push("Role must be CLIENT or LAWYER");
  if (!password) messages.push("Password is required");
  else if (password.length < 8) messages.push("Password must be at least 8 characters");

  return {
    valid: messages.length === 0,
    message: messages.join(", "),
    data: { firstName, lastName, email, role, password }
  };
}

export function validateLogin(body) {
  const email = normalizeEmail(body?.email);
  const password = String(body?.password || "");
  const messages = [];

  if (!email) messages.push("Email is required");
  else if (!EMAIL_REGEX.test(email)) messages.push("Invalid email format");
  if (!password) messages.push("Password is required");

  return {
    valid: messages.length === 0,
    message: messages.join(", "),
    data: { email, password }
  };
}
