import Dexie from 'dexie';
import Fuse from 'fuse.js';

const fuseSearchOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  keys: ['word'],
};

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

  async getAllRaw() {
    return this.db.wordsHistory
      .orderBy('updatedAt')
      .reverse()
      .toArray();
  }

  async getAll(query) {
    const words = await this.getAllRaw();

    if (query) {
      const fuse = new Fuse(words, fuseSearchOptions);

      return fuse.search(query);
    }

    return words;
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
