import Ember from 'ember';
const { get, set, computed } = Ember;
const { alias } = computed;

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['cell'],
  classNameBindings: ['alive'],
  alive: alias('cell.alive'),

  click() {
    set(this, 'alive', !get(this, 'alive'));
  }
});
