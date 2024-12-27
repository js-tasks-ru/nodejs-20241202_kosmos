import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Request } from "express";

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const roleHeader = request.header("x-role");

    if (roleHeader && roleHeader.trim() === "admin") {
      return true;
    }

    throw new ForbiddenException("Доступ запрещён: требуется роль admin");
  }
}
