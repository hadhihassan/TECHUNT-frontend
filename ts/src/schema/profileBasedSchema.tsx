import * as Yup from 'yup';
export const validationSchema = Yup.object({
    institution: Yup.string().required('Institution is required').trim().min(5, "must be at least 5 characters long"),
    degree: Yup.string().required('Degree is required').trim().min(5, "must be at least 5 characters long"),
    fieldOfStudy: Yup.string().required('Field of Study is required').trim().min(5, "must be at least 5 characters long"),
    startDate: Yup.date()
        .required('Start Date is required')
        .max(new Date(), 'Start Date cannot be in the future')
});
