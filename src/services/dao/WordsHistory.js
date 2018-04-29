import Dexie from 'dexie';

export default class WordsHistory {
  constructor() {
    this.db = new Dexie();

    this.db.version(1).stores({
      wordsHistory: '++id, &word',
    });

    this.db.open();
  }

  async save(object) {
    await this.db.wordsHistory.add(object);
  }

  async getAll() {
    return this.db.wordsHistory.toArray();
  }

  async getByWord(word) {
    return this.db.wordsHistory.get({ word });
  }

  async deleteById(id) {
    return this.db.wordsHistory
      .where('id')
      .equals(id)
      .delete();
  }
}
