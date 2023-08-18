import { QAPair } from './qapair.entity';

export class Dataset {
  constructor(
    public id: string,
    public QAPairs: QAPair[],
  ) {}
}
