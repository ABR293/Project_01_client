
export function validatePassword(p:string, minLength=6) {
    let errors = [];
    if (p.length < minLength) {
        errors.push(`Your password must be at least ${minLength} characters`); 
    }
    if (p.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    // if (p.search(/[0-9]/) < 0) {
    //     errors.push("Your password must contain at least one digit."); 
    // }
    if (errors.length > 0) {
        // alert(errors.join("\n"));
        return errors.join("\n");
    }
    return null;
}

export function validatePasswordRepeat(passwordRepeat:string, password:string){
    return passwordRepeat === password ? null : 'passwords are different'
}

export function validateEmail(email:string) {
    const emailRegexp = new RegExp(
      /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
    )
    return !emailRegexp.test(email) ? 'e-mail is not valid' : null
}





export class FormValidation {
    private pass = ''

    login(v:string){
        return validateEmail(v)
    }
    password(v:string){
        this.pass = v 
        return validatePassword(v)
    }
    passwordRepeat(v:string){
        return validatePasswordRepeat(v, this.pass)
    }
}



export const validateForm = (data:FormData) => {
    let formValidation = new FormValidation ()
    let errors = {} as any
    for (let [key , value] of data) {
        if(!!formValidation[key as keyof FormValidation]){
            errors[key]=formValidation[key as keyof FormValidation](value as string) 
        }
    }
    return errors
}