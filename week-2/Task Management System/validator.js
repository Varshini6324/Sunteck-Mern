// TODO: Export these validation functions
// 1. Validate task title (not empty, min 3 chars)
export function validateTitle(title) {
    // Your code here
    if (title.length===null){
        return "Title is empty"
    }
    if(title.length<=3){
        return "Title should have atleast 3 char"
    }
    return true
}

// 2. Validate priority (must be: low, medium, high)
export function validatePriority(priority) {
    // Your code here
    if (priority===low ||priority===medium||priority===high){
        return true
    }
    return "Invalid Priority"
}

// 3. Validate due date (must be future date)
export function validateDueDate(date) {
    // Your code here
    let d=new Date()
    if(date>d){
        return true
    }
    return "Invalid Date"
}


