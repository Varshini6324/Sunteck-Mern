let enrollmentDeadline = new Date("2026-01-20");
let d=new Date()
//1.Check if:
    //* Today is before deadline → "Enrollment Open"
    //* Today is after deadline → "Enrollment Closed"
    if(d<enrollmentDeadline){
        console.log("Enrollment Open")
    }
    else{
        console.log("Enrollment Closed")
    }

//2. Validate user input date:
    //* Input: "2026-02-30"
    let date=new Date("2026-02-30")
    //* Detect whether the date is valid or invalid
    a=date.getDate
    b=date.getDay
    if(b>31){
        console.log("invslid date")
    }
    if(a==2 && a>29){
        console.log("invalid")
    }
    if(a%2!=0 && b>31){}