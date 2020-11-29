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
let n,k;
const kTime = 31
if((kTime <= 10 && kTime > 0)){ // 1,2,3,4,5,6,7,8,9,10
  k = 500;
} else if(kTime <= 20 && kTime > 10){ // 11,12,13,14,15,16,17,18,19
  k = 300
} else if(kTime <= 30 && kTime > 20){
  k = 100
} else k = 20;
console.log(k)
// 100       200       300
//     10       20       30
// ----------------------------

console.log(13600 * 45 / 300)