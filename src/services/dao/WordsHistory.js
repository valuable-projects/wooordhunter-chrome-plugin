import Dexie from 'dexie';

export default class WordsHistory {
  constructor() {
    this.db = new Dexie();

    this.db.version(1).stores({
      wordsHistory: '++id, &word, updatedAt',
    });

    this.db.open();
  }

  async save(object) {
    await this.db.wordsHistory.add({ ...object, updatedAt: new Date() });
  }

  async getAll() {
    return this.db.wordsHistory
      .orderBy('updatedAt')
      .reverse()
      .toArray();
  }

  async getByWord(word) {
    const record = await this.db.wordsHistory.get({ word });

    if (record) {
      await this.db.wordsHistory.update(record.id, { updatedAt: new Date() });
    }

    return record;
  }

  async deleteById(id) {
    return this.db.wordsHistory
      .where('id')
      .equals(id)
      .delete();
  }
}
