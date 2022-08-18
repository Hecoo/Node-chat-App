//The Unix epoch is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), ...

// 10000 represent the Miliseconds after 1970 00:00:00 am  ===  1970 00:00:10
// - 1000 represent the Milliseconds before  1970 00:00:00 so

// let date = new Date().getMonth();
// console.log(date);

let moment = require("moment");

let date = moment();
date.add(100, "year").subtract(9, "months");
console.log(date.format("MMM Do, YYYY"));

let someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

let createdAt = 1000;
let date_2 = moment(createdAt);
console.log(date_2.format("h:mm:ss a"));
