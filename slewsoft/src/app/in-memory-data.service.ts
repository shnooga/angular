import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const jobs = [
      { id: 11, name: 'Target' },
      { id: 12, name: 'Costco' },
      { id: 13, name: 'Wells Fargo' },
      { id: 14, name: 'SaveMart' },
      { id: 15, name: 'McDonalds' },
      { id: 16, name: 'TOGOS' },
      { id: 17, name: 'Urban Jacks' },
      { id: 18, name: 'Borders' },
      { id: 19, name: 'Regal' },
      { id: 20, name: 'Les Schwab' }
    ];
    return {jobs};
  }
}
