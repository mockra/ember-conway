import Ember from 'ember';
const { get } = Ember;
const { service } = Ember.inject;

export default Ember.Component.extend({
  boardGenerator: service(),

  init() {
    this._super(...arguments);
    this.board = get(this, 'boardGenerator').generate(50, 50);
  },

  actions: {
    update() {
      get(this, 'board').forEach((row) => {
        row.invoke('update');
      });
    }
  }
});
