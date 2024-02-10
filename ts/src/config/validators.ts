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
    const phoneRegex = /^\d{10}$/;
    if (number.trim() === "") {
        return 'Number is required';
    }
    if (number.length < 10) {
        return "Phone number must be 10 digits";
    }
    if (!phoneRegex.test(number)) {
        return "Phone number only includes numbers";
    }
    // Count the occurrences of each digit
    const counts: { [digit: string]: number } = {};
    for (const digit of number) {
        counts[digit] = (counts[digit] || 0) + 1;
    }
    // Check if any digit occurs more than 5 times
    for (const digit in counts) {
        if (counts[digit] > 5) {
            return "Phone number should not contain more than 5 occurrences of any digit";
        }
    }
    // Phone number is valid
    return null;
}
// pincode
export function pincodeValidator(number: string) {
    const pincodeRegex = /^\d+$/;
    if (number.trim() === "") {
        return 'Pincode is required';
    }
    if (!pincodeRegex.test(number)) {
        return "Pincode only includes numbers";
    }
    if (number.length !== 6) {
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

