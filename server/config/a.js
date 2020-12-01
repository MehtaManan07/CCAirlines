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
// console.log(453/24)
var randoms = Array(40).fill(Math.floor(Math.random() * 9))
console.log(typeof randoms)