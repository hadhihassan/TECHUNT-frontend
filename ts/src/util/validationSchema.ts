import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required("New password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    confrimPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref('newPassword'), null], "Passwords must match")
});
export const otpValidationSchema = Yup.object().shape({
    otp: Yup.string()
        .required("OTP is required")
        .matches(/^\d{4}$/, "OTP must be a 4-digit number")
});