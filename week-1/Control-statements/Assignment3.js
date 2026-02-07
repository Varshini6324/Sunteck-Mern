function CheckPrice(price)
{
    if (price<500)
    {
        label="Budget Course"
    }
    else if (price>500 && price<1000)
    {
        label="Standard Course"
    }
    else{
        label="Premium Course"
    }
}
CheckPrice(1299)
console.log(label)