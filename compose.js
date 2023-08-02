const person = {name: 'jack', age: 25};
const getName = (person) => {
  return person.name
}

const name = getName(person);
const getUpperCase = (text) => {
  return text.toUpperCase();
}

const getSubString = (string) => string.substring(0, 4);
const getReversedString = (string) => string.split('').reverse().join('');

// 实现一个从左往右执行的 pipe 函数.
const pipe = (...fns) => {
  return (initValue) => fns.reduce(
    (accumulator, currentFn) => {
      return currentFn(accumulator)
    }, initValue)
}

let user = {name: 'Paul Smith'};
const pipeResult = pipe(getName, getUpperCase, getSubString, getReversedString)(user)
console.log(`pipeResult : `, pipeResult);


// 实现一个从右往左组合两个函数的 compose.
const compose = (...fns) => (initialValue) => fns.reduceRight((accumulator, currentFn) => {
  return currentFn(accumulator)
}, initialValue)


const composeResult = compose(getUpperCase, getName)(user);
console.log(`upperCaseName : `, composeResult);





