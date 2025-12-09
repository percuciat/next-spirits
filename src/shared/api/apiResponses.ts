import { NextResponse } from "next/server";
import { TSpirit } from "@/entities/spirit";
import type { IApiErrorResponse } from "./types";

export const ApiResponse = {
  captured(spirit: TSpirit) {
    return NextResponse.json({
      success: true,
      spirit,
      message: `${spirit.name} has been captured!`,
    });
  },

  error(message: string, status: number): NextResponse<IApiErrorResponse> {
    return NextResponse.json({ success: false, message }, { status });
  },

  notFound(message: string = "Resource not found") {
    return this.error(message, 404);
  },

  badRequest(message: string = "Bad request") {
    return this.error(message, 400);
  },

  captureFailed() {
    return this.error("Capture failed! The spirit escaped.", 500);
  },

  spiritNotFound() {
    return this.notFound("Spirit not found.");
  },

  alreadyCaptured() {
    return this.badRequest("Spirit is already captured.");
  },
};
