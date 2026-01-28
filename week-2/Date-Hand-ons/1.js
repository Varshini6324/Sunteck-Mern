//1. Create a Date object for current date & time.
let date=new Date()
       //2. Extract and display:
            //* Year
                console.log(date.getFullYear())
            //* Month (human readable)
                a=date.getMonth()
                arr=['jan','feb','mar','apr','may','june','july','aug','sept','oct','nov','dec']
                console.log(arr[a])
            //* Date
                console.log(date.getDate())
            //* Day of week
                b=date.getDay()
            //* Hours, minutes, seconds
                console.log(date.getHours(),date.getMinutes(),date.getSeconds())

      //3. Display the date in this format:
        //DD-MM-YYYY HH:mm:ss
            console.log(date.toString())
