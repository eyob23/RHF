//helpers
export const objectToArray = (obj) => Object.values(obj);
export const arrayToObject = (arr, keyField) =>
  Object.assign({}, ...arr.map((item) => ({ [item[keyField]]: item })));
//end of helpers

export const formData = {
  chk: { type: "checkbox", name: "chk", label: "Condition" },
  name: { type: "text", name: "name", label: "Name" },
  age: { type: "number", name: "age", label: "Age" },
  password: { type: "password", name: "password", label: "Password" },
  passwordConfirm: {
    type: "password",
    name: "passwordConfirm",
    label: "Password Confirm"
  },
  feedback: { type: "rte", name: "feedback", label: "Feedback" }
};
export const formData2 = [
  { type: "checkbox", name: "chk2", label: "Condition" },
  { type: "text", name: "name2", label: "Name" },
  { type: "number", name: "age2", label: "Age" },
  { type: "password", name: "password2", label: "Password" },
  {
    type: "password",
    name: "passwordConfirm2",
    label: "Password Confirm"
  }
];
