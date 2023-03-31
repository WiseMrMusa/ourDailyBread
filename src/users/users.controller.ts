import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserdto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
    // return createUserDto;
  }

  @Post('/login')
  async login( @Body() loginUserdto: LoginUserdto) {

      const user = await this.usersService.findByEmloyeeID(loginUserdto.employeeId);
      if (!user) {
        throw new Error('User not found');
      }
  
      const isPasswordValid = user.validatePassword(loginUserdto.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      return { success : true }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findByEmloyeeID(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
