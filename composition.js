import {compose, curry, filter, join, map, pipe, reverse, split} from "ramda";

const toUpper = (str) => str.toUpperCase();
const exclaim = (str) => str + "!"
const unfinishedCompose = (f, g) => x => f(g(x))
const say = (name) => (word) => `${name} says: ${word}`;
const sayByJack = say('Jack')

// const compose = (...fns) => (x) => fns.reduceRight((accu, fn)=> fn(accu) ,x)

// 对比以下两种函数调用
const result = toUpper(exclaim('help'));
console.log(`result : `, result);

const result2 = unfinishedCompose(toUpper, exclaim)('help')  // pipe line
console.log(`result2 : `, result2);

const result3 = compose(sayByJack, exclaim, toUpper)('help')
console.log(`result3 : `, result3);

const result4 = pipe(toUpper, exclaim, sayByJack)('help')
console.log(`result4: `, result4);


// comparison: compose vs procedure

const user = {name: 'apolo du'}

// use compose
// const getFirstName = compose(
//   (str) => str[0].toUpperCase() + str.slice(1),
//   (arr) => arr[0],
//   (str) => str.split(" "),
//   (user) => user.name);
//
// const firstName = getFirstName(user)
// console.log(`firstName : `, firstName);

// procedure
// const userName = user.name;
// const nameList = userName.split(" ")
// const first = nameList[0]
// const firstName = first[0].toUpperCase() + first.slice(1);
// console.log(`firstName: `, firstName);

// compose is dot chaining

const input = 'Hello World, New Day is Coming'

const doStuff = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(i => i.trim())
    .reverse()
    .filter(x => x.length > 3)
    .join(' ')

console.log(`doStuff(input): `, doStuff(input));

const doStuffCompose = compose(
  arr => arr.join(' '),
  arr => arr.filter(x => x.length > 3),
  arr => arr.reverse(),
  arr => arr.map(i => i.trim()),
  str => str.split(' '),
  str => str.toLowerCase(),
)

console.log(`doStuffCompose(input): `, doStuffCompose(input));


const doStuffComposeWithUtils = compose(
  join(' '),
  filter(x => x.length > 3),
  reverse,
  map(i => i.trim()),
  split(' '),
  str => str.toLowerCase(),
)

console.log(`doStuffComposeWithUtils(input): `, doStuffComposeWithUtils(input));

// log
const log = curry((tag, x) => (console.log(tag, x), x));
compose(sayByJack, exclaim, log('logging: '), toUpper)('help')









