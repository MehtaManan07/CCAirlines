// // const data = []
// // for (let i = 0; i < data.length; i++) {
// //   const element = data[i];
// //   if (element.type === 'Economy') c = `A3`;
// //   else if (element.type === 'Business') c = `A2`;
// //   else if (element.type === 'FirstClass') c = `A1`;
// //   let seatName = `${c}_${count}`
// //   count++
// //   let el = {...element,seatName}
// //   oi.push(el)
// // }
// // console.log(oi)

// // seatname, type

// const obj = { Economy: '10', Business: '20', FirstClass: '30' };
// const entries = Object.entries(obj);
// console.log(entries)
// const convert = (arr) => {
//   let count = 0;
//   const flight = 1;
//   const [type, quantity] = arr;
//   const history = [];
//   for (let i = 0; i < quantity; i++) {
//     const ret = {
//       flight,
//       seatname: `${type.split('')[0]}_${count}`,
//       type,
//     };
//     count++;
//     history.push(ret);
//   }
//   return history;
// };

// const lol = entries
//   .map((l) => convert(l)).reduce((a,b) => a.concat(b))
// console.log(lol)
// if n is b/w 11 to 20 || 21 to 30 ||
// var myDate = new Date("2013-04-08T10:28:43Z");
// var myoDate = new Date("2013-04-08T22:28:43Z");

// console.log((myoDate - myDate)/3600000)
// console.log(453/

let removeF = ['one', 'two', 'three', 'four'];
const logicalOps = ['in', 'lte', 'gte', 'lt', 'gt'];
let query = {
  a: 'lol',
  b: 'undefined',
  c: 'mahaLol',
  d: 'undefined',
  somethings: { lte: '90000' },
  something: { lte: 'undefined' },
};

Object.entries(query).map((each) => {
  if (typeof each[1] === 'object') {
    let tempArr = Object.entries(each[1])[0];
    // console.log({each, tempArr})
    if (tempArr[1] === 'undefined') {
      removeF.unshift(each[0]);
    }
  }
  if (each[1] === 'undefined') {
    removeF.unshift(each[0]);
  }
});
// console.log({ removeF });

let que = {
  a: 'lol',
  b: '',
  somethings: { opt: 'all', value: ['abc', 'gef'] }, //
  something: { opt: 'lte', value: 'manan' },
};
// let keys = Object.keys(que);
// let values = Object.values(que).filter((k) => !k);
// values.map((value) => console.log({ value }));
// let result = keys.reduce((o, k, i) => ({ ...o, [k]: values[i] }), {});

const co = (obj) => {
  let strr = '?';
  Object.values(que).map((each) => {
    if (typeof each === 'object') {
      let key = Object.keys(obj).filter((k) => obj[k] === each)[0];
      strr = strr + `${key}[${each.opt}]=` + each.value;
      delete obj[key];
    }
  });
  let newObj = obj;
  return { newObj, strr };
};

let hi = co(que);
console.log(hi);
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //… your array, filled with values
const mySeats = (n, array) => {
  const result = [[], [], []]; //we create it, then we'll fill it

  const wordsPerLine = Math.ceil(items.length / 3);

  for (let line = 0; line < n; line++) {
    for (let i = 0; i < wordsPerLine; i++) {
      const value = items[i + line * wordsPerLine];
      if (!value) continue; //avoid adding "undefined" values
      result[line].push(value);
    }
  }
  return result;
};

console.log(mySeats(3,items));
