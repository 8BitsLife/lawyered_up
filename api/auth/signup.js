import bcrypt from "bcryptjs";
import { ensureSchema, sql } from "../_lib/db.js";
import { errorResponse, json } from "../_lib/response.js";
import { validateSignup } from "../_lib/validation.js";

function mapUser(row) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    role: row.role
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateSignup(body);

    if (!validation.valid) {
      return errorResponse(validation.message, 400);
    }

    await ensureSchema();
    const { firstName, lastName, email, role, password } = validation.data;

    const existing = await sql`
      SELECT id
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return errorResponse("An account with this email already exists.", 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const rows = await sql`
      INSERT INTO users (first_name, last_name, email, password_hash, role)
      VALUES (${firstName}, ${lastName}, ${email}, ${passwordHash}, ${role})
      RETURNING id, first_name, last_name, email, role
    `;

    return json({
      success: true,
      message: "Account created successfully.",
      user: mapUser(rows[0])
    });
  } catch (error) {
    console.error(error);
    return errorResponse("Something went wrong. Please try again.", 500);
  }
}
