

const dataMethods = ['body', 'query', 'params', 'headers'];
const validation = (schema) => {
    return (req, res, next) => {
        const validationArray = [];
        dataMethods.forEach(key => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], { abortEarly: false });
                if (validationResult.error) {
                    validationArray.push(validationResult.error);
                }
            }
        });
        if (validationArray.length > 0) {
            return res.status(400).json({ message: "validation error", validationArray });
        }
        next();
    }
}
export default validation;




//const validationResult = signUpSchema.validate(req.body, { abortEarly: false });
// since all the columns' names in auth.validation are the same as the body sent from the frontend , so we can do req.body
// or {signUpUserName,signUpEmail,signUpPassword , confirmPassword} , if the names are different you have to do it like this
// {nameOnValidation : nameFromFrontEnd}
//return res.json(validationResult);
//if (validationResult.error) {
//    return res.json({ message: "validation error", error: validationResult.error })
//}