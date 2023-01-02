import { useState } from "react"
import { callbackify } from "util"
import { validateForm } from "../utils/formValidators"

export const useFormValidation = () => {

    const [errors, setErrors] = useState({} as any)

    const validate = (data: FormData, callback:Function) => {
        const res = validateForm(data)
        if(Object.values(res).filter(e => !!e).length === 0){
            callback()
        }
        setErrors(res)

    }

    return {errors, validate};
}