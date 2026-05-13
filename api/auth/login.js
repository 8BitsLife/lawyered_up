import bcrypt from "bcryptjs";
import { ensureSchema, sql } from "../_lib/db.js";
import { errorResponse, json } from "../_lib/response.js";
import { validateLogin } from "../_lib/validation.js";

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
    const validation = validateLogin(body);

    if (!validation.valid) {
      return errorResponse(validation.message, 400);
    }

    await ensureSchema();
    const { email, password } = validation.data;

    const rows = await sql`
      SELECT id, first_name, last_name, email, role, password_hash
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    const user = rows[0];
    if (!user) {
      return errorResponse("Invalid email or password.", 400);
    }

    const matches = await bcrypt.compare(password, user.password_hash);
    if (!matches) {
      return errorResponse("Invalid email or password.", 400);
    }

    return json({
      success: true,
      message: "Login successful.",
      user: mapUser(user)
    });
  } catch (error) {
    console.error(error);
    return errorResponse("Something went wrong. Please try again.", 500);
  }
}
