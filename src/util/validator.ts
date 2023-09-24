export interface ValidationInterface {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
// adding a ? to min:number makes it min:number|undefined
export function validate(validationObject: ValidationInterface) {
  const { value } = validationObject;
  let isValid = true;
  if (validationObject.required && (value == null || value == undefined)) {
    // isValid = isValid && !!value;
    console.log(1);
    isValid = false;
  }
  if (validationObject.minLength != null) {
    // if it is a number i ignore because it doesn't make sense

    isValid =
      isValid && value.toString().trim().length >= validationObject.minLength;
  }
  if (validationObject.maxLength != null) {
    // if it is a number i ignore because it doesn't make sense

    isValid =
      isValid && value.toString().trim().length <= validationObject.maxLength;
  }
  // if min is 0 validationObject.min won't execute so use !=null
  if (typeof value == "number" && validationObject.min != null) {
    // if it is a number i ignore because it doesn't make sense
    console.log(value >= validationObject.min);
    isValid = isValid && value >= validationObject.min;
  }
  if (typeof value == "number" && validationObject.max != null) {
    // if it is a number i ignore because it doesn't make sense
    console.log(value <= validationObject.max);

    isValid = isValid && value <= validationObject.max;
  }
  return isValid;
}
