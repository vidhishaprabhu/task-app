import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/entities/user.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskservice:TaskService){}
  @roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('/add-task')
  async create(@Body() createTaskDto:CreateTaskDto){
    return this.taskservice.create(createTaskDto);
  }
  @Get('/get-all-task')
  async findAll(){
    return this.taskservice.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id:number){
    return this.taskservice.findOne(id);
  }
  @Put(':id')
  async update(@Param('id') id:number,@Body() updateTaskDto:UpdateTaskDto){
    return this.taskservice.update(id,updateTaskDto);
  }
  @Delete(':id')
  async remove(@Param('id') id:number){
    return this.taskservice.remove(id);
  }
}
