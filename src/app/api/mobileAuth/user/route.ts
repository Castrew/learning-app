import { NextRequest } from "next/server";
import {
  accountTable,
  sessionTable,
  userTable,
} from "../../../../../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../../../../../db/db";
import { v7 as uuidv7 } from "uuid";
import { responses } from "src/helper/responses";
import moment from "moment";

export const POST = async (request: NextRequest) => {
  const { user, googleResponse } = await request.json();

  const { params, authentication, type: responseType } = googleResponse;
  const { id_token, access_token, state, code, scope, authuser, prompt } =
    params;
  const {
    accessToken,
    tokenType,
    expiresIn,
    refreshToken,
    scope: authScope,
    idToken: authIdToken,
    issuedAt,
  } = authentication;

  const { name, description, email, emailVerified, image } = user;

  const sessionToken = uuidv7();
  const userId = uuidv7();
  const providerAccountId = uuidv7();

  const type = "oidc";
  const provider = "google";

  const expires = moment().add(1, "month").toDate();

  try {
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (existingUser.length > 0) {
      console.log("tuka sym");

      const userSession = await db
        .select()
        .from(sessionTable)
        .where(eq(sessionTable.userId, existingUser[0].id));

      const responseData = {
        user: existingUser[0],
        session: userSession[0],
      };

      return Response.json(responseData, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      await db.transaction(async (tx) => {
        // Insert into userTable
        await tx.insert(userTable).values({
          id: userId,
          name,
          description,
          email,
          emailVerified,
          image,
        });

        // Insert into accountTable
        await tx.insert(accountTable).values({
          userId,
          type,
          provider,
          providerAccountId,
          refresh_token: refreshToken,
          access_token,
          expires_at: issuedAt,
          token_type: tokenType,
          scope,
          id_token,
          session_state: null,
        });

        // Insert into sessionTable
        await tx.insert(sessionTable).values({
          sessionToken,
          userId,
          expires,
        });
      });

      console.log("tuka sym ama dolu");

      const newUser = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email));

      const userSession = await db
        .select()
        .from(sessionTable)
        .where(eq(sessionTable.userId, userId));

      const responseData = {
        user: newUser[0],
        session: userSession[0],
      };

      return Response.json(responseData, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return responses.serverError(error);
  }
};
