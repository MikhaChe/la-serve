import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { StatesService } from './states.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('states')
export class StatesController {
  constructor(private statesService: StatesService) {}

  @Post()
  createState(@Body() dto: CreateStateDto){
    return this.statesService.createState(dto)
  }

  @Get('/:value')
  getState(@Param('value') stateId: number) {
    return this.statesService.getStateByID(stateId)
  }
}
