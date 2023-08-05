import * as R from 'ramda';
import assert from 'assert';

const _ = R
const split = _.curry((delimiter, string) => string.split(delimiter))

// Exercise 1

// from
// const words = function (str){
//   return split(" ", str)
// }

// to
const words = split(" ")


describe("Ex1: split", () => {
  it(`should split words into array`, function () {
    assert.deepEqual(words("jingle bells batman smells"), ['jingle', 'bells', 'batman', 'smells'])
  });
})


// use map to handle an array of parameters
const sentences = _.map(words);

// _.map is equivalent to
// const xMap = (fn) => (array) => array.map(fn);
// const sentences = xMap(words);

// is equivalent to:
// const sentences = (array) => array.map(words); 
// const result = _.map(words)(['hello world', 'see you soon'])
// console.log(`result : `, result );


// is equivalent to
// const sentences = (delimiter) => (array) => array.map(i => i.split(delimiter))
// const result2 = sentences(" ")(['hello world', 'see you soon'])
// console.log(`result2: `, result2);

describe("Ex1: map/split", () => {
  it(`should work on array parameters`, () => {
    assert.deepEqual(sentences(['hello world', 'see you soon']), [
      ["hello", "world"],
      ["see", "you", "soon"]
    ])
  })
})

// Exercise 2
// from
// const filterQS = function (xs) {
//   return _.filter(function (x) {
//     return _.test(/q/ig, x)
//   }, xs)
// }

// to
const filterQS = _.filter(_.test(/q/ig))

it('should filter Qs', () => {
  assert.deepEqual(filterQS(['quick', 'camels', 'quarry']), ['quick', 'quarry'])
})

// Exercise 3
// from
// const _keepHighest = (x, y) => x >= y ? x : y
// const max = function (xs){
//   return _.reduce(function (acc,x){
//     return _keepHighest(acc, x)
//   }, 0, xs)
// }

// to
// const reduceXs = (fn) => (xs) => _.reduce(fn,0, xs);
// const max = reduceXs((x, y) => x >= y ? x : y);

// or
const max = _.reduce((x, y) => x >= y ? x : y, 0)

it('should keep the largest number', () => {
  assert.equal(max([100, 22, 301]), 301)
})


// Bonus 1: wrap array's built in slice to be functional and curried;

// const slice = (start) => (end) => xs => xs.slice(start, end)
const slice = _.curry((start, end, xs) => xs.slice(start, end))

it(`should slice correctly`, function () {
  assert.deepEqual(slice(0)(2)([0, 1, 2]), [0, 1])
});

// Bonus 2: make a function take() that takes n elements from an array;
// const take = (n) => (xs) => xs.slice(0, n);
// const take = _.curry((n, xs) => xs.slice(0, n))

// use slice above
const take = slice(0);

it(`should take correct element from array`, function () {
  assert.deepEqual(take(3)([0, 1, 2, 3]), [0, 1, 2])
});













