import { QAPair } from '../entities/qapair.entity';

export class CreateDatasetDto {
  QAPairs: QAPair[];
  generate: boolean;
  documentIds: number[];
}
