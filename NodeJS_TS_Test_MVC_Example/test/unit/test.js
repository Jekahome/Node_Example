//let assert = require('assert');

const chai = require('chai');
const assert = chai.assert;    // Using Assert style
const expect = chai.expect;    // Using Expect style
const should = chai.should();  // Using Should style
const faker = require('faker');
const sinon = require("sinon");
require('mocha-testcheck').install();//  { check, gen, property }

const {Topic}   = require('../../app/models/topic');

// Тестирование Mocha (мокка) с набором инструментов:
// Mocha служит для организации описаний тест-кейсов
// - chai Для утверждений используют доп. chai
// - sinon Для mock,стабы (stub) и шпионы (spy)  используют доп. sinon
// - eslint-plugin-mocha Для проверки тестов плагин eslint-plugin-mocha
// - faker Для загрузки тестовыми данными faker
// - mocha-testcheck Тестирование, основанное на проверке свойств mocha-testcheck
// - supertest Для тестировать API, созданные с использованием Express supertest
// - node-mocks-http Для наблюдением за поведением функций, и обьетами  запроса и ответа node-mocks-http

//----------------------------------------------------------------------------------------------------------------------
// Как работать с sinon
//----------------------------------------------------------------------------------------------------------------------


// $ mocha test/unit -g chai
describe('learn #chai', () => {

    // Разница между assert,expect,should в стиле программирования и читабельности и формировании сообщений
    // Интерфейсы assert и expect не изменяют Object.prototype

    it('assert утверждать', () => {

        var foo = 'bar';
        var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

        assert.typeOf(foo, 'string'); // тип должен быть 'string'
        assert.typeOf(foo, 'string', 'your message');// тип должен быть 'string' (с сообщением)
        assert.equal(foo, 'bar', 'foo equal `bar`');// foo равен 'bar'
        assert.notEqual(foo, 'qqq', 'foo equal `bar`');// foo не равен 'bar'
        assert.lengthOf(foo, 3, 'foo`s value has a length of 3');// длина строки foo равена 3
        assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');// размер массива beverages.tea равен 3

    });

    it('assert full утверждать', () => {

        var foo = 'bar';
        var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

        // assert,fail
        assert('foo' !== 'bar', 'foo is not bar');
        assert(Array.isArray([]), 'empty arrays are arrays');
        // assert.fail("custom error message");//  вызов ошибки теста

        //isOk,isNotOk
        if(true){
            //null,undefined,0,"" с этими данными будет ошибка теста
            assert.isOk(true, 'your message');
            assert.isNotOk(undefined, 'your message');
        }

        // equal,notEqual Проверка на равенство
        //strictEqual,notStrictEqual  Проверка на строгое равенство
        assert.equal(3, '3', '== coerces values to strings');
        assert.equal(3, 3 , '== coerces values to strings');
        assert.notEqual(3, 4, 'these numbers are not equal');
        assert.strictEqual(true, true, 'these booleans are strictly equal');
        assert.notStrictEqual(3, '3', 'no coercion for strict equality');

        //deepEqual,notDeepEqual (Строгое сравнение свойств и значений и их количесва)
        assert.deepEqual({ tea: 'green', age: 0}, { tea: 'green', age: 0 });
        assert.deepEqual([1,2,3], [1,2,3]);
        assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });

        //isAbove,isAtLeast,isBelow,isAtMost (Сравнение чисел на больше или равно)
        assert.isAbove(5, 2, '5 is strictly greater than 2'); // 5 >  2
        assert.isAtLeast(3, 3, '3 is greater or equal to 3'); // 3 >= 3
        assert.isBelow(3, 6, '3 is strictly less than 6');    // 3 <  6
        assert.isAtMost(3, 6, '3 is less than or equal to 6');// 3 <= 6

        // isTrue,isNotTrue,isFalse,isNotFalse,isNull,isNotNull,isNaN,isNotNaN (Сравнение с типами данных true,false,null,NaN)
        var teaServed = true;
        assert.isTrue(teaServed, 'the tea has been served');
        var tea = 'tasty chai';
        assert.isNotTrue(tea, 'great, time for tea!');
        var teaServed = false;
        assert.isFalse(teaServed, 'no tea yet? hmm...');
        var tea = 'tasty chai';
        assert.isNotFalse(tea, 'great, time for tea!');
        assert.isNull(null, 'there was no error');
        assert.isNotNull(teaServed, 'great, time for tea!');
        assert.isNaN(NaN, 'NaN is NaN');
        assert.isNotNaN(4, '4 is not NaN');

        // exists,notExists,isUndefined (Утверждает, что цель не является ни null, ни undefined или наоборот)
        var foo = 'hi';
        var err_null= null;
        var err_undf;
        assert.exists(foo, 'foo is neither `null` nor `undefined`');
        assert.notExists(err_null, 'baz is either null or undefined');
        assert.isUndefined(err_undf, 'no `err_undf` defined');

        // isDefined (Утверждает, что значение не является неопределенным)
        var tea_isdef = 'cup of chai';
        assert.isDefined(tea_isdef, '`tea_isdef` has been defined');

        // isFunction,isNotFunction,isObject,isNotObject,isArray,isNotArray,isString,isNotString
        // isNumber,isNotNumber,isFinite,isBoolean,isNotBoolean
        function serveTea() { return 'cup of tea'; };
        assert.isFunction(serveTea, 'great, we can have tea now');
        var serveTea = [ 'heat', 'pour', 'sip' ];
        assert.isNotFunction(serveTea, 'great, we have listed the steps');
        var selection = { name: 'Chai', serve: 'with spices' };
        assert.isObject(selection, 'tea selection is an object');
        var selection = 'chai'
        assert.isNotObject(selection, 'tea selection is not an object');
        assert.isNotObject(null, 'null is not an object');
        var menu = [ 'green', 'chai', 'oolong' ];
        assert.isArray(menu, 'what kind of tea do we want?');
        var menu = 'green|chai|oolong';
        assert.isNotArray(menu, 'what kind of tea do we want?');
        var teaOrder = 'chai';
        assert.isString(teaOrder, 'order placed');
        var teaOrder = 4;
        assert.isNotString(teaOrder, 'order placed');
        var cups = 2;
        assert.isNumber(cups, 'how many cups');
        var cups = '2 cups please';
        assert.isNotNumber(cups, 'how many cups');
        //isFinite Утверждает, что значение является конечным числом. В отличие от .isNumber, это не удастся для NaN и Infinity
        var cups = 2;
        assert.isFinite(cups, 'how many cups');
        //assert.isFinite(NaN); // throws
        var teaReady = true;
        assert.isBoolean(teaReady, 'is the tea ready');
        var teaReadyn = 'yep';
        assert.isNotBoolean(teaReadyn, 'is the tea ready');


        // typeOf,notTypeOf (Проверка типа object,array,string,regexp,null,undefined)
        assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
        assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
        assert.typeOf('tea', 'string', 'we have a string');
        assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
        assert.typeOf(null, 'null', 'we have a null');
        assert.typeOf(undefined, 'undefined', 'we have an undefined');
        assert.notTypeOf('tea', 'number', 'strings are not numbers');

        // instanceOf,notInstanceOf (Утверждает, что значение является экземпляром конструктора)
        var Tea = function (name) { this.name = name; }
            , t_tea = new Tea('chai');
        assert.instanceOf(t_tea, Tea, 'chai is an instance of tea');
        t_tea = new String('chai');
        assert.notInstanceOf(t_tea, Tea, 'chai is not an instance of tea');

        // Может использоваться для подтверждения включения значения в массив, подстроки в строку или подмножества свойств в объекте.
        assert.include([1,2,3], 2, 'array contains value');
        assert.include('foobar', 'foo', 'string contains substring');
        assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
        assert.notInclude([1,2,3], 4, "array doesn't contain value");

        // deepInclude,notDeepInclude  Может использоваться для подтверждения включения значения в массив или подмножества свойств в объекте.
        // Глубокое равенство используется.
        var obj1 = {a: 1}
            , obj2 = {b: 2};
        assert.deepInclude([obj1, obj2], {a: 1});
        assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
        assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
        assert.notDeepInclude([obj1, obj2], {a: 9});


        // nestedInclude,notNestedInclude (Может использоваться для подтверждения включения подмножества свойств в объект.)
        assert.nestedInclude({'.a': {'b': 'x'}}, {'\\.a.b': 'x'});
        assert.nestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'x'});
        assert.notNestedInclude({'.a': {'b': 'x'}}, {'\\.a.b': 'y'});
        assert.notNestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'y'});

        //deepNestedInclude,notDeepNestedInclude (Может использоваться для утверждения включения подмножества свойств в объект при проверке на глубокое равенство.)
        assert.deepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {x: 1}});
        assert.deepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {x: 1}});
        assert.notDeepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {y: 1}})
        assert.notDeepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {y: 2}});

        // ownInclude,notOwnInclude (Может использоваться для подтверждения включения подмножества свойств в объект, игнорируя при этом унаследованные свойства.)
        Object.prototype.a = 1;
        assert.ownInclude({ a: 1 }, { a: 1 });
        Object.prototype.b = 2;
        assert.notOwnInclude({ a: 1 }, { b: 2 });

        //deepOwnInclude,notDeepOwnInclude (Может использоваться для утверждения включения подмножества свойств в объект,
        // игнорируя при этом унаследованные свойства и проверяя на глубокое равенство.)
        assert.deepOwnInclude({a: {b: 2}}, {a: {b: 2}});
        assert.notDeepOwnInclude({a: {b: 2}}, {a: {c: 3}});

        //match,notMatch (Утверждает, что значение соответствует регулярному выражению регулярного выражения)
        assert.match('foobar', /^foo/, 'regexp matches');
        assert.notMatch('barqqq', /^foo/, 'regexp does not match');

        // propertyVal,notPropertyVal (Утверждает, что object имеет прямое или унаследованное свойство с именем,
        // property значением которого является value. Использует строгую проверку на равенство (===))
        assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
        assert.notPropertyVal({ tea: 'is good' }, 'tea', 'is bad');
        assert.notPropertyVal({ tea: 'is good' }, 'coffee', 'is good');

        //deepPropertyVal,notDeepPropertyVal (Утверждает, что object имеет прямое или унаследованное свойство,
        // имя которого property равно значению, данному value. Использует глубокую проверку на равенство.)
        assert.deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
        assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
        assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
        assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });

        // nestedProperty,notNestedProperty (Утверждает, что object имеет прямое или унаследованное свойство с
        // именем by property, которое может быть строкой с использованием точечных и скобочных обозначений для вложенной ссылки.)
        assert.nestedProperty({ tea: { green: 'matcha' }}, 'tea.green');
        assert.nestedProperty({ tea: { green:  { matcha:' qqq' }  }}, 'tea.green.matcha');
        assert.notNestedProperty({ tea: { green: 'matcha' }}, 'tea.oolong');

        // nestedPropertyVal,notNestedPropertyVal (Утверждает, что object имеет прямое или унаследованное свойство с
        // именем by property, которое может быть строкой с использованием точечных и скобочных обозначений для вложенной
        // ссылки. Использует строгую проверку на равенство (===).)
        assert.nestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
        assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
        assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'coffee.green', 'matcha');

        // deepNestedPropertyVal,notDeepNestedPropertyVal (Как nestedPropertyVal но Использует глубокую проверку на равенство.)
        assert.deepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yum' });
        assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' });
        assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' });
        assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' });

        //lengthOf (Утверждает, что objectимеет lengthили sizeс ожидаемым значением.)
        assert.lengthOf([1,2,3], 3, 'array has length of 3');
        assert.lengthOf('foobar', 6, 'string has length of 6');
        assert.lengthOf(new Set([1,2,3]), 3, 'set has size of 3');
        assert.lengthOf(new Map([['a',1],['b',2],['c',3]]), 3, 'map has size of 3');

        // hasAnyKeys,doesNotHaveAnyKeys,hasAnyDeepKeys,doesNotHaveAnyDeepKeys (Утверждает, что object есть хотя бы один из keys предоставленных.Или свойсвто
        assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'iDontExist', 'baz']);
        assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, iDontExist: 99, baz: 1337});
        assert.hasAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
        assert.hasAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
        assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
        assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
        assert.doesNotHaveAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
        assert.doesNotHaveAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{one: 'two'}, 'example']);
        assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
        assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), [{one: 'one'}, {two: 'two'}]);
        assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
        assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
        assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {three: 'three'}]);
        assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
        assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
        assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
        assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
        assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);


       // hasAllKeys,doesNotHaveAllKeys,hasAllDeepKeys,doesNotHaveAllDeepKeys (Утверждает, что object имеет все и только все keys предоставленное. )
        assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
        assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337});
        let k = {foo: 1};
        assert.hasAllKeys(new Map([ [k, 'bar'], ['key', 'value'] ]), [k, 'key']);
        let k2 = {foo: 'bar'};
        assert.hasAllKeys(new Set([k2, 'anotherKey']), [k2, 'anotherKey']);
        assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
        assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
        assert.doesNotHaveAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
        assert.doesNotHaveAllKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{one: 'two'}, 'example']);
        assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne']]), {one: 'one'});
        assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
        assert.hasAllDeepKeys(new Set([{one: 'one'}]), {one: 'one'});
        assert.hasAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
        assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
        assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {one: 'one'}]);
        assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
        assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {fifty: 'fifty'}]);

        // containsAllKeys,containsAllDeepKeys (Утверждает, что object имеет все keys предоставленные, но может иметь больше ключей, не перечисленных. )
        assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'baz']);
        assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
        assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, baz: 1337});
        assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337});
        let k4 = {foo: 1};
        assert.containsAllKeys(new Map([[k4, 'bar'], ['key', 'value']]), [k4]);
        assert.containsAllKeys(new Map([[k4, 'bar'], ['key', 'value']]), [k4, 'key']);
        let k3 = {foo: 'bar'};
        assert.containsAllKeys(new Set([k3, 'anotherKey']), [k3]);
        assert.containsAllKeys(new Set([k3, 'anotherKey']), [k3, 'anotherKey']);
        assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
        assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
        assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
        assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);

        // throws,doesNotThrow (Если errorLike это Error конструктор, утверждает, что fn будет выдавать ошибку, которая является экземпляром errorLike)
        function fn(){
            throw new Error('Error thrown must have this msg')
        }
        assert.throws(fn, 'Error thrown must have this msg');
        assert.throws(fn, Error);
        function fn2(){
            if(true){
                return 'Hello';
            }else{
                throw new Error('Error msg')
            }

        }
        assert.doesNotThrow(fn2, Error);


       // operator (Сравнивает два значения, используя operator)
        assert.operator(1, '<', 2, 'everything is ok');
        assert.operator(3, '>', 2, 'this will fail');

        // closeTo (Утверждает, что цель равна expected, в пределах +/- delta диапазона)
        assert.closeTo(1.5, 1, 0.5, 'numbers are close');
        assert.approximately(1.5, 1, 0.5, 'numbers are close');

        // sameMembers,notSameMembers (Утверждает, что set1и set2имеют одинаковых членов в любом порядке. Использует строгую проверку на равенство (===).)
        assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
        assert.notSameMembers([ 1, 2, 3 ], [ 5, 1, 3 ], 'not same members');
        // sameDeepMembers,notSameDeepMembers (Утверждает, что set1и set2имеют одинаковых членов в любом порядке. Использует глубокую проверку на равенство.)
        assert.sameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members');
        assert.notSameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { f: 5 }], 'not same deep members');
        // sameOrderedMembers,notSameOrderedMembers (Утверждает, что set1и set2имеют одинаковые члены в том же порядке. Использует строгую проверку на равенство (===))
        assert.sameOrderedMembers([ 1, 2, 3 ], [ 1, 2, 3 ], 'same ordered members');
        assert.notSameOrderedMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'not same ordered members');
       // sameDeepOrderedMembers,notSameDeepOrderedMembers (Утверждает, что set1 и set2 имеют одинаковые члены в том же порядке. Использует глубокую проверку на равенство.)
        assert.sameDeepOrderedMembers ([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {b: 2}, {c: 3}], "такие же глубоко упорядоченные члены" );
        assert.notSameDeepOrderedMembers ([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {b: 2}, {z: 5}],  "не такие глубоко упорядоченные члены");
        assert.notSameDeepOrderedMembers ([{a: 1}, {b: 2}, {z: 3}], [{b: 2}, {a: 1}, {c: 3}],  "не такие глубоко упорядоченные члены");

        // includeMembers,notIncludeMembers (Утверждает, что subset входит superset в любой порядок. Использует строгую проверку на равенство (===). Дубликаты игнорируются.)
        assert.includeMembers([ 1, 2, 3 ], [ 2, 1, 2 ], 'include members');
        assert.notIncludeMembers([ 1, 2, 3 ], [ 5, 1 ], 'not include members');

        // includeDeepMembers,notIncludeDeepMembers (Утверждает, что subset входит superset в любой порядок. Использует глубокую проверку на равенство. Дубликаты игнорируются.)
        assert.includeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { b: 2 } ], 'include deep members');
        assert.notIncludeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { f: 5 } ], 'not include deep members');

        // oneOf (Утверждает, что не-объектное, не массивное значение inListпоявляется в плоском массиве list.)
        assert.oneOf(1, [ 2, 1 ], 'Not found in list');

        // changes (Утверждает, что функция изменяет значение свойства.)
        var obj = { val: 10 };
        var fn = function() { obj.val = 22 };
        assert.changes(fn, obj, 'val');
        // changesBy (Утверждает, что функция изменяет значение свойства на величину (дельта))
        var obj = { val: 10 };
        var fn = function() { obj.val += 2 };
        assert.changesBy(fn, obj, 'val', 2);

        // changesButNotBy (Утверждает, что функция не изменяет значение свойства или возвращаемого значения функции на величину (дельта))
        var obj = { val: 10 };
        var fn = function() { obj.val += 10 };
        assert.changesButNotBy(fn, obj, 'val', 5);

        // increases (Утверждает, что функция увеличивает числовое свойство объекта.)
        var obj = { val: 10 };
        var fn = function() { obj.val = 13 };
        assert.increases(fn, obj, 'val');

        // increasesButNotBy (Утверждает, что функция не увеличивает числовое свойство объекта или возвращаемое значение функции на величину (дельта))
        var obj = { val: 10 };
        var fn = function() { obj.val = 15 };
        assert.increasesButNotBy(fn, obj, 'val', 10);
        // decreases (Утверждает, что функция уменьшает числовое свойство объекта)
        var obj = { val: 10 };
        var fn = function() { obj.val = 5 };
        assert.decreases(fn, obj, 'val');

        // isEmpty,isNotEmpty (Утверждает, что цель не содержит никаких значений.)
        assert.isEmpty([]);
        assert.isEmpty('');
        assert.isEmpty(new Map);
        assert.isEmpty({});
        assert.isNotEmpty([1, 2]);
        assert.isNotEmpty('34');
        assert.isNotEmpty(new Set([5, 6]));
        assert.isNotEmpty({ key: 7 });

    });

});

//----------------------------------------------------------------------------------------------------------------------
// Как работать с sinon
//----------------------------------------------------------------------------------------------------------------------
// `spy` это шпион которые будет фиксировать как работала отслеживаемая ф-ция.
// Следующий тип test doubles это `stubs` который заменяет оригинальный метод.

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const topicPage   = require('../../app/controllers/topic');

// var spy = sinon.spy(); Создает анонимную функцию, которая записывает аргументы, this значения, исключения и возвращаемые значения для всех вызовов.
// var spy = sinon.spy(myFunc); Шпионит за предоставленной функцией
// var spy = sinon.spy(object, "method");

// $  mocha test/unit -g sinon
describe('learn #sinon', () => {

    // Разница между assert,expect,should в стиле программирования и читабельности и формировании сообщений
    // Интерфейсы assert и expect не изменяют Object.prototype

    it('assert утверждать', () => {

        var object = { method: function () {} };
        var spy = sinon.spy(topicPage, "list");

        let request = {
            params:{
                topicId:2
            }
        };
        let response = {
            render: sinon.spy()
        };

        topicPage.list(request, response);
        sleep(2000).then(res=>{
           // console.log(response.render.args[0][1].lessons.length)
            console.log(response.render.firstCall[0])
            //console.log(response.render.returnValues[0])

        });

        /*
        let request = {
            params:{
                topicId:1
            }
        };

        // Фейковый обьект
        let response = {
            render: sinon.spy()
        };
        topicPage.list(request, response)
        console.log(response.render.callCount)
*/
        //console.log(response.render.getCall(0).args[0])
        /*
        let response = {
            send: sinon.spy()
        };

        topicPage.getIndexPage(request, response)
        expect(response.send.calledOnce).to.be.true;// Мы ожидаем, что наша функция res.sendвызывается один раз
        expect(response.send.firstCall.args[0]).to.equal("Hey");// Мы ожидаем, что мы получим аргумент Heyна первый звонок
        */
    });



});









// Asynchronous
// Все тесты, включая before (), after (), beforeEach (), afterEach (), должны вызывать done () в конце, чтобы сообщить mocha, что все задачи выполнены.
// Если done () отсутствует, возникнет исключение тайм-аута, потому что mocha будет ждать 'done ()' до истечения времени ожидания.
//  Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/home/jeka/projects/LearnEng/test/test.js)


// done для асинхронных тестов
describe('Array', () => {
    describe('#indexOf()', () => {
        it('Synchronous Tests', () => {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
        it('Asynchronous Tests', done =>{

            // expect([1,2,3]).is.equal(3);
            expect(3+1).to.equal(4);
            //assert.deepEqual
            let res = faker.random.boolean();
            new Promise(function (resolve, reject) {
                if( res ){
                    resolve(true)
                }else{
                    reject(new Error('error'))
                }
            }).then(
                result =>{
                    done();// успех
                },
                error =>{
                    done(error);// ошибка
                });

        });
    });
});

//Для test doubles Mocha также требует подключения дополнительной библиотеки, в большинстве случаев это sinon.js.
// Sinon также может быть отличным дополнением, предоставляя свой fake server (поддельный сервер).




//  Тестирование, основанное на проверке свойств — это именно то, что нам в подобной ситуации пригодится.
//  А именно, в ходе такого тестирования модуль проверяют, вызывая его со всеми возможными комбинациями входных данных, что увеличивает вероятность нахождения в нём ошибки.
describe('MySpec #cold-test', () => {

    check.it('accepts an int and a string', gen.int, gen.string, (x, y) => {
        expect(x).to.be.a('number');
        expect(y).to.be.a('string');
    });

});
/*describe('Product service', () => {
    describe('Adding new', () => {
        //это выполнится 100 раз с использованием различных случайных свойств
        check.it('Add new product with random yet valid properties, always successful',
            gen.int, gen.string, (id, name) => {
                expect(addNewProduct(id, name).status).to.equal('approved');
            });
    })
});*/



//  node-mocks-http
exports['routeHandler - Simple testing'] = function(test) {

    var request  = httpMocks.createRequest({
        method: 'GET',
        url: '/user/42',
        params: {
            id: 42
        }
    });

    var response = httpMocks.createResponse();

    routeHandler(request, response);

    var data = response._getJSONData(); // short-hand for JSON.parse( response._getData() );
    test.equal("Bob Dog", data.name);
    test.equal(42, data.age);
    test.equal("bob@dog.com", data.email);

    test.equal(200, response.statusCode );
    test.ok( response._isEndCalled());
    test.ok( response._isJSON());
    test.ok( response._isUTF8());

    test.done();

};


/*
// sinon fake server (поддельный сервер)
it('should return a collection object containing all users', function(done) {
    var server = sinon.fakeServer.create();
    server.respondWith("GET", "/users", [
        200,
        { "Content-Type": "application/json" },
        '[{ "id": 1, "name": "Gwen" },  { "id": 2, "name": "John" }]'
    ]);

    Users.all().done(function(collection) {
        expect(collection.toJSON()).to.eql([
            { id: 1, name: "Gwen" },
            { id: 2, name: "John" }
        ]);

        done();
    });

    server.respond();
    server.restore();
});*/