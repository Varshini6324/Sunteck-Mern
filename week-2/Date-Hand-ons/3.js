let dob = new Date("2000-05-15");
//1. Calculate exact age in years
let d=new Date();
//find years
let years=d.getFullYear()-dob.getFullYear()
//find months
let months=d.getMonth()-dob.getMonth()
//find date
let date=d.getDate()-dob.getDate()


if(months<0){
    years--
    months=months+12
}

if(date<0){
    months--
    //get the no of days of prev month
    let a=d.getDay(2026,0,0)
    //add those months
    console.log(a.getMonth())
}

console.log("year",years)
