import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateDatasetDto } from './dto/create-dataset.dto';
import { UpdateDatasetDto } from './dto/update-dataset.dto';
import { Dataset } from './entities/dataset.entity';
import { QAPair } from './entities/qapair.entity';

@Injectable()
export class DatasetsService {
  create(reqBody: CreateDatasetDto) {
    const datasetID = Math.random().toString();
    const dataset = new Dataset(datasetID, [...reqBody.QAPairs]);
    // Check if request asks to generate more QA-pairs
    if (reqBody.generate === true) {
      let QAPairs = dataset.QAPairs;
      if (reqBody.documentIDs.length === 0) {
        throw new BadRequestException(
          "Request set 'generate' to true, but provided no documents",
        );
      }
      console.log(QAPairs);
      for (const docID of reqBody.documentIDs) {
        QAPairs = [...QAPairs, ...this.generateMoreQAPairs(docID)];
      }
    }
    console.log('Sending dataset to DB'); // Upload dataset onto DB:
    return { ...dataset };
  }
  generateMoreQAPairs(docID): QAPair[] {
    console.log(
      `Generating more QA Pairs for dataset based on doc no. ${docID}... `,
    );
    return [
      {
        question: 'GENERATED Q! What document generated this question?',
        answer: `Document no. ${docID}`,
      },
    ];
  }

  findAll() {
    return 'This action returns all datasets';
  }

  findOne(id: number) {
    return `This action returns a #${id} dataset`;
  }

  update(id: number, updateDatasetDto: UpdateDatasetDto) {
    return `This action updates a #${id} dataset`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataset`;
  }
}
