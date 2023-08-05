const {curry} = require("ramda");

// 写一个基础的 curry
// const curry = f => x => y => f(x, y);

const add = (x, y) => {
  return x + y
}

const curryAdd = curry(add);

// 分布计算
const increment = curryAdd(1);

const result = increment(5);
console.log(`result: `, result);


//  模除 (取余) 
function modulo(x, y) {
  return y % x;
}

const curryModulo = curry(modulo);
const moduloTwo = curryModulo(2);

const result2 = moduloTwo(3);
console.log(`result2: `, result2);


const moduloThree = curryModulo(3);
const result3 = moduloThree(5);
console.log(`result3: `, result3);


// 柯里化过滤
const curryFilter = (filterFn) => (array) => array.filter(filterFn)
const filterOdd = curryFilter((x) => {
  return x % 2 !== 0
});

const result4 = filterOdd([1, 2, 3, 4, 5]);
console.log(`result4 : `, result4);


// 对比过程式 和 柯里化函数 -  point free
const user = {name: 'xxx'}

const getUserName = (user) => {
  return user.name
}
const userName = getUserName(user)

const getUpperCase = (str) => str.toUpperCase();
const upperCaseUserName = getUpperCase(userName)
console.log(`upperCaseUserName: `, upperCaseUserName);


const getUpperCaseName = (getUserName) => (getUpperCase) => (user) => getUpperCase(getUserName(user))

const upperCaseName = getUpperCaseName((user) => (user.name))
((name) => (name.toUpperCase()))
(user)
console.log(`upperCaseName : `, upperCaseName);


const curryReplace = curry((regex, replacement, str)=> str.replace(regex, replacement));
const replaceVowels = curryReplace(/[AEIOU]/gi, '!');
const replaceResult = replaceVowels('this is a new world')
console.log(`replaceResult : `, replaceResult );
