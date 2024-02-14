/** Handling common input field validations */
/** Preventing KeyPress as required  */
export const onlyNumber = (e) => {
    let keyPressed = e.key;
    const pattern1 = /(\d)/g;
    const onlyNums = pattern1.test(keyPressed);
    if (onlyNums === false) {
      e.preventDefault();
    }
}

export const nameCheck = (e) => {
    let keyPressed = e.key;
    const pattern1 = new RegExp(/^[a-zA-Z\s]*$/);
    const ifProperName = pattern1.test(keyPressed);
    if (ifProperName === false) {
      e.preventDefault();
    }
}
/** Validations and setting errors */
export const mobileValidation = (value) => {
    if ((value !== '' || value !== null) && value.length == 10) {
      return false;
    }
    else {
      return true;
    }
}

export const nameValidation = (value) => {
    if ((value !== '' || value !== null) && value.length > 3) {
      return false;
    }
    else {
      return true;
    }
}

export const emailValidation = (value) => {
    const regex = new RegExp(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/);
    if ((value !== '' || value !== null) && regex.test(value)) {
      return false;
    }
    else {
      return true;
    }
}

export const ageValidation = (value) => {
    if ((value !== '' || value !== null) ) {
      return false;
    }
    else {
      return true;
    }
}

export const addressValidation = (value) => {
    if ((value !== '' || value !== null) && value.length > 3) {
      return false;
    }
    else {
      return true;
    }
}