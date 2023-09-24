export function validate(validationObject) {
    const { value } = validationObject;
    let isValid = true;
    if (validationObject.required && (value == null || value == undefined)) {
        console.log(1);
        isValid = false;
    }
    if (validationObject.minLength != null) {
        isValid =
            isValid && value.toString().trim().length >= validationObject.minLength;
    }
    if (validationObject.maxLength != null) {
        isValid =
            isValid && value.toString().trim().length <= validationObject.maxLength;
    }
    if (typeof value == "number" && validationObject.min != null) {
        console.log(value >= validationObject.min);
        isValid = isValid && value >= validationObject.min;
    }
    if (typeof value == "number" && validationObject.max != null) {
        console.log(value <= validationObject.max);
        isValid = isValid && value <= validationObject.max;
    }
    return isValid;
}
//# sourceMappingURL=validator.js.map