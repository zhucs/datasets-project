import { Injectable } from '@nestjs/common';
import { CreateDatasetDto } from './dto/create-dataset.dto';
import { UpdateDatasetDto } from './dto/update-dataset.dto';
import { Dataset } from './entities/dataset.entity';

@Injectable()
export class DatasetsService {
  create(reqBody: CreateDatasetDto) {
    const datasetID = Math.random().toString();
    const dataset = new Dataset(datasetID, [...reqBody.QAPairs]);
    // Check if request asks to generate more QA-pairs
    if (reqBody.generate === true) {
      let QAPairs = dataset.QAPairs;
      if (QAPairs.length === 0) {
        console.log('ERROR: No documents found!');
      }
      for (const docID of reqBody.documentIds) {
        QAPairs = [...QAPairs, ...this.generateMoreQAPairs(docID)];
      }
    }
    console.log('Sending dataset to DB'); // Upload dataset onto DB:
    return { ...dataset };
  }
  generateMoreQAPairs(docID) {
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
