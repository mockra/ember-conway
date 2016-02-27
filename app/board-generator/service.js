import Ember from 'ember';
const { get } = Ember;
const { service } = Ember.inject;

export default Ember.Service.extend({
  store: service(),

  generate(width, height) {
    const board = [];
    _.times(height, () => {
      const row = [];
      _.times(width, () => {
        row.pushObject(
          get(this, 'store').createRecord('cell', {
            alive: false
          })
        );
      });
      board.pushObject(row);
    });

    return get(this, 'setupNeighbors')(board);
  },

  setupNeighbors(board) {
    return board.map((row, rowIndex, board) => {
      return row.map((cell, cellIndex) => {
        cell.setNeighbors(board, cellIndex, row, rowIndex);
        return cell;
      });
    });
  }
});
