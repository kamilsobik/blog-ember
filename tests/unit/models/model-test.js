import { module, test } from 'qunit';
import { setupTest } from 'zadanie-ii-ember/tests/helpers';

module('Unit | Model | like', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('like', {});
    assert.ok(model);
  });
});