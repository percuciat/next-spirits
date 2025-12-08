import { NextResponse } from "next/server";
import { TSpirit } from "@/entities/spirit";

export interface IApiSuccessResponse<T = unknown> {
  success: true;
  data?: T;
  message?: string;
}

export interface IApiErrorResponse {
  success: false;
  message: string;
}

export type TApiResponse<T = unknown> = IApiSuccessResponse<T> | IApiErrorResponse;

export const ApiResponse = {
  success<T>(data?: T, message?: string) {
    return NextResponse.json({
      success: true,
      ...(data !== undefined && { data }),
      ...(message && { message }),
    } satisfies IApiSuccessResponse<T>);
  },

  captured(spirit: TSpirit) {
    return NextResponse.json({
      success: true,
      spirit,
      message: `${spirit.name} has been captured!`,
    });
  },

  error(message: string, status: number = 500) {
    return NextResponse.json(
      { success: false, message } satisfies IApiErrorResponse,
      { status }
    );
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

