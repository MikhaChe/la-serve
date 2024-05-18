import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { InjectModel } from '@nestjs/sequelize';
import { State } from './states.model';

@Injectable()
export class StatesService {
  constructor(@InjectModel(State) private stateRepository: typeof State) {}

  async createState(dto: CreateStateDto) {
    
    const state = await this.stateRepository.create(dto);
    return state.dataValues;
  }

  async getStateByID(stateId: number) {
    const state = await this.stateRepository.findByPk(stateId, {include: {all: true}});
    return state.dataValues;
  }
}
