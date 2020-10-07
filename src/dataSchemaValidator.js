import * as yup from "yup";
const schema = yup.object().shape({
  chk: yup.boolean(),
  name: yup.string().when("chk", {
    is: true,
    then: yup.string().required(),
    otherwise: yup.string().optional()
  }),
  age: yup.number("Age is required").min(5).max(30),
  password: yup.string().required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  feedback: yup.string().required("feedback is required"),
  registration: yup
    .array()
    .of(
      yup.object().shape({
        chk: yup.boolean(),
        name: yup.string().when("chk", {
          is: true,
          then: yup.string().required("Name is required"),
          otherwise: yup.string().optional()
        }),
        age: yup
          .number()
          .typeError(`"Age is required"`)
          .min(5)
          .typeError(`Age must be greater than or equal to 5`)
          .max(30)
          .typeError(`Age must be less than or equal to 30`),
        password: yup.string().required("Password is required"),
        passwordConfirm: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match"),
        feedback: yup.string().required("feedback is required")
      })
    )
    .required()
});
export default schema;
