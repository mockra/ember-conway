import Ember from 'ember';
import DS from 'ember-data';
const { set, get, computed } = Ember;
const { alias, filter, filterBy } = computed;

export default DS.Model.extend({
  alive: false,
  neighbors: [],
  existingNeighbors: filter('neighbors', function(neighbor) {
    return neighbor !== undefined;
  }),
  aliveNeighbors: filterBy('existingNeighbors', 'alive'),
  aliveCount: alias('aliveNeighbors.length'),

  nextState: computed('alive', 'aliveCount', function() {
    const alive = get(this, 'alive');
    const aliveCount = get(this, 'aliveCount');
    return (alive && aliveCount === 2) || (aliveCount === 3);
  }),

  setNeighbors(board, cellColumn, row, cellRow) {
    const neighbors = [];

    const west = cellColumn - 1;
    const east = cellColumn + 1;
    const north = cellRow - 1;
    const south = cellRow + 1;

    const northRow = board[north];
    const southRow = board[south];
    const currentRow = board[cellRow];

    if (northRow) {
      neighbors.pushObject(northRow[west]);
      neighbors.pushObject(northRow[cellColumn]);
      neighbors.pushObject(northRow[east]);
    }
    if (southRow) {
      neighbors.pushObject(southRow[west]);
      neighbors.pushObject(southRow[cellColumn]);
      neighbors.pushObject(southRow[east]);
    }
    if (currentRow) {
      neighbors.pushObject(currentRow[west]);
      neighbors.pushObject(currentRow[east]);
    }

    set(this, 'neighbors', neighbors);
  },

  update() {
    set(this, 'alive', get(this, 'nextState'));
  }
});
