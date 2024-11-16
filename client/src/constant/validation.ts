export const nameRegex: RegExp = /^[a-zA-Z\s]*$/;
export const descriptionRegex: RegExp = /^[a-zA-Z\s]*$/;
export const urlRegex:RegExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
export const minLength = {
    name: 5,
    description: 50,
};
export const maxLength = {
    name: 20,
    description: 100,
};