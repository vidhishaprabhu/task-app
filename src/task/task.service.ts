import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly taskRepository:Repository<Task>){}
  async create(createTaskDto:CreateTaskDto):Promise<Task>{
    const newTask=this.taskRepository.create({
      title:createTaskDto.title,
      content:createTaskDto.content
    })
    return this.taskRepository.save(newTask);
  }
  async findAll():Promise<Task[]>{
    return this.taskRepository.find();
  }
  async findOne(id:number):Promise<Task>{
    const singleTask=await this.taskRepository.findOne({where:{id}});
    if(!singleTask){
      throw new NotFoundException(`Task with Id ${id} not found`);
    }
    return singleTask;
  }
  async update(id:number,updateTaskDto:UpdateTaskDto){
    const singleTask=await this.findOne(id);
    if(updateTaskDto.title){
      singleTask.title=updateTaskDto.title;
    }
    if(updateTaskDto.content){
      singleTask.content=updateTaskDto.content;
    }
    return this.taskRepository.save(singleTask);

  }
  async remove(id:number){
    const removeTask=await this.findOne(id);
    return this.taskRepository.remove(removeTask);
  }
}
