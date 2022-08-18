import { test, assert } from 'vitest'
import { Define } from 'vue-class-setup';

test('', () => {
    class Test { }
    class App extends Define { }
    class App2 extends App {}
    class App3 extends App2 {}
    class App4 extends App3 {}
    assert.isFalse(Define.of(Test))
    assert.isTrue(Define.of(App))
    assert.isTrue(Define.of(App2))
    assert.isTrue(Define.of(App3))
    assert.isTrue(Define.of(App4))
})