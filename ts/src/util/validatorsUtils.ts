// for email
export function emailValidator(email: string) {
    console.log(email, "am herer");
    if (email.trim() === "") {
        return "Email is required"
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return "Invalid email format";
    }
    return null;
}
// password
export function passwordValidator(password: string) {
    if (password.trim() === "") {
        return "Password is required";
    }
    if (password.length < 6) {
        return "Password must be at least 6 characters long";
    }
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    if (!passwordPattern.test(password)) {
        return "Password must contain at least one number and one special character";
    }
    return null;
}
// name 
export function nameValidator(name: string, fieldName: string) {
    if (name.trim() === "") {
        return `${fieldName},is required`
    }
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        return `${fieldName} only inlcudes letters`
    }
    return null
}
// number
export function numberValidator(number: string) {

    console.log(number);
    
    const mobileNumber = number.trim();
    const zeroCount = (mobileNumber.match(/0/g) || []).length;
    const mobileNumberPattern = /^\d+$/;
    if(mobileNumber.length === 10 ){
        return null
    }
    if(mobileNumber === ""){
        return "Number is required";
    }else if(!mobileNumberPattern.test(mobileNumber)) {
        return "Invalid mobile number. Please enter numbers only.";
    }else if(mobileNumber.length < 9 || mobileNumber.length > 9 ){
        return "Invalid mobile number must be 10 digits";
    } else if (zeroCount > 5) {
        return "Too many zeros in the mobile number.";
    } else {
        return null;
    }
}
// pincode
export function pincodeValidator(number: string) {
    const pincodeRegex = /^\d+$/;
    if(number.trim().length === 6 ){
        return null
    }
    if (number.trim() === "") {
        return 'Pincode is required';
    }
    if (!pincodeRegex.test(number.trim())) {
        return "Pincode only includes numbers";
    }
    if (number.trim().length < 5 || number.trim().length > 5) {
        return "Pincode must be 6 digits";
    }
    return null;
}
export function addressValidator(address: string) {
    if (address.trim() === "") {
        return 'address is required';
    }
    if (address.length < 10) {
        return "Address more than 10 letters";
    }
    return null;
}
export function descriptionValidator(address: string) {
    if (address.trim() === "") {
        return 'address is required';
    }
    if (address.length < 100) {
        return "Address more than 100 letters";
    }
    return null;
}

//amount validator for the antd
const positiveNumberRegex = /^\d*\.?\d+$/;

export const validatePositiveNumber = ( value: string, callback: (error?: string) => void) => {
    if (!positiveNumberRegex.test(value) ) {
        callback('Please enter a valid amount.');
    } else if(parseInt(value) < 0){
        callback("Please enter a positive number.");
    }else{
        callback();
    }
};

