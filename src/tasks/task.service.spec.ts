import { Test } from "@nestjs/testing";
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from "./tasks.model";
import { NotFoundException } from '@nestjs/common';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
})

const mockUser = { username: 'mock user', id: 1 }

describe('TaskService', () => {
  let taskService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TasksService, { provide: TaskRepository, useFactory: mockTaskRepository }]
    }).compile();

    taskService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('Get tasks', () => {
    it('Get all task from repository', async () => {
      const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'some search query' };
      taskRepository.getTasks.mockResolvedValue('some value');
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const result = await taskService.getTasks(filters, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('some value');
    });
  });

  describe('Get task by id', () => {
    it('calls taskRepository.findOne() and successfully return the task', async () => {
      const mockTask = { title: 'some title', description: 'some description' }
      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await taskService.getById(1, mockUser);
      expect(result).toEqual(mockTask);
      expect(taskRepository.findOne).toBeCalledWith({
        where: {
          id: 1,
          userId: mockUser.id
        }
      });
    });

    it('throws an error if task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(taskService.getById(1, mockUser)).rejects.toThrow(NotFoundException);
    });
  });

  it('Create task', async () => {
    const mockTask = { title: 'some title', description: 'some description' };
    taskRepository.createTask.mockResolvedValue(mockTask);
    const result = await taskService.create(mockTask, mockUser);
    expect(result).toBe(mockTask);
  });

  describe('Delete task', () => {
    it('Calls taskRepository.delete', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();
      await taskService.delete(1, mockUser);
      expect(taskRepository.delete).toHaveBeenCalledWith({ id: 1, userId: mockUser.id });
    });
  
    it('throws an error if task is not found', () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });
      expect(taskService.delete(1, mockUser)).rejects.toThrow(NotFoundException);
    });
  })

  describe('Update status', () => {
    it('update a task status', async() => {
      const save = jest.fn().mockResolvedValue(true);
    taskService.getById = jest.fn().mockResolvedValue({
      status: TaskStatus.OPEN,
      save,
    });

    expect(taskService.getById).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
    const result = await taskService.updateStatus(1, TaskStatus.DONE, mockUser);
    expect(taskService.getById).toHaveBeenCalled();
    expect(save).toHaveBeenCalled();
    expect(result.status).toEqual(TaskStatus.DONE);
    })
  });
});