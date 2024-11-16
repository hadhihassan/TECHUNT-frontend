import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required("New password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref('newPassword')], "Passwords must match")
});
export const otpValidationSchema = Yup.object().shape({
    otp: Yup.string()
        .required("OTP is required")
        .matches(/^\d{4}$/, "OTP must be a 4-digit number")
});
export const reviewRatingSchema = Yup.object().shape({
    description: Yup.string()
        .required("Description required")
        .min(4, "Description more than 4 letters"),
    rate: Yup.number()
        .required("Rating is required.")
});

export const propsalValidation = Yup.object().shape({
    title: Yup.string()
        .trim()
        .required("Title is required")
        .max(20, "Title must be under 20 letters long"),
    coverLetter: Yup.string().trim().required("Cover letter is required")
        .max(500, "Cover letter must be under 500 letters long ."),
    availability: Yup.date()
        .required("Availability is required")
        .min(new Date(), "Availability must be in the future"),
    additionalInfo: Yup.string().trim()
        .max(100, "Additional info must be under the 100 letter ."),
    rate: Yup.number()
        .min(0, "Additional rate must be more then  1 rupee ."),
    attachments: Yup.array()
        .min(1, "At least one attachment is required")});