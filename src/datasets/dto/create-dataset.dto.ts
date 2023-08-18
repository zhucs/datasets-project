import { QAPair } from '../entities/qapair.entity.ts';

export class CreateDatasetDto {
  values: QAPair[];
  generate: boolean;
  documentIds: number[];
}
