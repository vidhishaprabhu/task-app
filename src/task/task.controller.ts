import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskservice:TaskService){}
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
