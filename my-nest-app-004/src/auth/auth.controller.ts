import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthenticatedRequest } from './auth.types';
// import { AuthGuard } from './guards/auth.guard';
import { Role } from '../users/enums/role.enum';
import { Roles } from '../users/decorators/roles.decorator';
import { UsersService } from '../users/users.service';
import { Public } from '../users/decorators/isPublic.decorator';
// import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('Login')
  signIn(@Body() signInDto: Record<string, string>) {
    const result = this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return result;
  }

  // @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() request: AuthenticatedRequest) {
    return request.user;
  }

  @Delete('delete-profile/:userId')
  // @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteProfile(@Param('userId') userId: number) {
    return this.authService.deleteProfileByUserId(userId);
  }

  @Get('all-profile')
  // @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getAllProfile() {
    return this.userService.findAll();
  }
}
