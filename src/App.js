import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import "./styles.css";
import Input from "./Input";
import schema from "./dataSchemaValidator";
import { objectToArray, formData } from "./data";
import useFormPersist from "./useFormPersist";
let renderCount = 0;
const NameAgeYup = () => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    trigger,
    control,
    watch,
    setValue,
    getValues,
    formState
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange"
    // defaultValues: {}; you can populate the fields by this attribute
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "registration"
    }
  );
  let savedData;
  useFormPersist(
    "myFrom",
    { watch, setValue, reset, getValues },
    {
      storage: window.localStorage, // default window.sessionStorage
      onDataRestored: (data) => {
        //reset(data);
        savedData = data;
        //console.log("onDataRestored", data);
      }
    }
  );
  const onSubmit = (data, event) => {
    console.log(data, event);
  };
  const renderFormObject = () =>
    objectToArray(formData).map((data, index) => (
      <Input
        key={index}
        ref={register}
        {...data}
        errors={errors}
        control={control}
      />
    ));
  // const watchAll = watch();
  // console.log(JSON.stringify(watchAll, null, 1));
  console.log("getValues");
  //console.log(getValues());
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ color: "white" }}>{renderCount++}</div>
      <div style={{ color: "white" }}>
        isDirty: {formState.isDirty.toString()}
        dirtyFiles {JSON.stringify(formState.dirtyFields, null, 1)}
      </div>
      {/* option 1 */}
      {renderFormObject()}
      {/* option 2 */}
      {/* <Input ref={register} {...formData.chk} errors={errors} />
      <Input ref={register} {...formData.name} errors={errors} />
      <Input ref={register} {...formData.age} errors={errors} />
      <Input ref={register} {...formData.password} errors={errors} />
      <Input ref={register} {...formData.passwordConfirm} errors={errors} /> */}
      {/* {console.log("item", fields)} */}

      {fields.map((item, index) => (
        <React.Fragment key={item.id}>
          <ul>
            <li>
              {objectToArray(formData).map((data, i) => (
                <Input
                  key={item.id + data.name + i}
                  ref={register()}
                  control={control}
                  {...{
                    ...data,
                    name: `registration[${index}][${data.name}]`
                  }}
                  errors={errors}
                  defaultValues={getValues(
                    `registration[${index}][${data.name}]`
                  )}
                />
              ))}
            </li>
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </ul>
        </React.Fragment>
      ))}
      <button type="button" onClick={() => append(formData)}>
        append
      </button>
      <button type="button" onClick={() => reset(savedData)}>
        reset
      </button>
      <input type="submit" />
    </form>
  );
};

export default NameAgeYup;
