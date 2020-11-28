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
const flight = {
  "features": [
  "drinks",
  "magazines",
  "breakfast"
  ],
  "crewStaff": [
  {
  "role": "staff",
  "_id": "5c8a1f292f8fb814b56fa184",
  "name": "Leo Gillespie"
  },
  {
  "role": "staff",
  "_id": "5c8a1f4e2f8fb814b56fa185",
  "name": "Jennifer Hardy"
  },
  {
  "role": "staff",
  "_id": "5c8a201e2f8fb814b56fa186",
  "name": "Kate Morrison"
  }
  ],
  "bookedSeats": [1,2,3,4,5,6,7,8,9,0,0,9,8,7,6,5,4,3,2,1],
  "isAvailable": true,
  "_id": "5fc29caf815fb54708ae3f23",
  "name": "FlightDeletqes",
  "from": {
  "_id": "5fbfee9766b98d23c0d38ca1",
  "name": "Mumbai_Airport"
  },
  "to": {
  "_id": "5fbfee9766b98d23c0d38caa",
  "name": "Jaipur_Airport"
  },
  "departureDate": "2020-11-30T18:30:00.000Z",
  "departureTime": "00:00",
  "arrivalTime": "1:30",
  "basePrice": 3837.415,
  "createdAt": "2020-11-28T18:53:35.934Z",
  "updatedAt": "2020-11-28T18:53:35.934Z",
  "slug": "flightdeletqes",
  "__v": 0,
  "totalSeats": 21,
  "seats": [
  {
  "_id": "5fc29cb0815fb54708ae3f24",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_0"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f25",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_1"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f26",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_2"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f27",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_3"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f28",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_4"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f29",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_5"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f2a",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_6"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f2b",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_7"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f2c",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_8"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f2d",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_9"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f2e",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_10"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f2f",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_11"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f30",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_12"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f31",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_13"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f32",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_14"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f33",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_15"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f34",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_16"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f35",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_17"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f36",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_18"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f37",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_19"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f38",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_20"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f39",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_21"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f3a",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_22"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f3b",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_23"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f3c",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_24"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f3d",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_25"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f3e",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_26"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f3f",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_27"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f40",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_28"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f41",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_29"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f42",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_30"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f43",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_31"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f44",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_32"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f45",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_33"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f46",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "E_34"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f47",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_0"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f48",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_1"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f49",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_2"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f4a",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_3"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f4b",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_4"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f4c",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_5"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f4d",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_6"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f4e",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_7"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f4f",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_8"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f50",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_9"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f51",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_10"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f52",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_11"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f53",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_12"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f54",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_13"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f55",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_14"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f56",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_15"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f57",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_16"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f58",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_17"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f59",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_18"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f5a",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "B_19"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f5b",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "F_0"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f5c",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "F_1"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f5d",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "F_2"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f5e",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "F_3"
  },
  {
  "_id": "5fc29cb0815fb54708ae3f5f",
  "flight": "5fc29caf815fb54708ae3f23",
  "seatName": "F_4"
  }
  ],
  "id": "5fc29caf815fb54708ae3f23"
  }
const calcPrice = () => {
  const deptDate = new Date(flight.departureDate.split('T')[0]);
  const today = new Date();
  const timeDiff = deptDate.getTime() - today.getTime();
  const kTime = Math.round(timeDiff / (1000 * 60 * 60 * 24));
  let kPrice = 1;
  let basePrice = 4000;
  const seatsLeft =  flight.bookedSeats.length;
  
  let price = basePrice + (kPrice * seatsLeft) / kTime;
  console.log({price, seatsLeft, kTime})
};

calcPrice()