import joi from "joi";

// making the schema u want to make the validation for.

//for trejister for example 

// export const signUpSchema = joi.object({
//     signUpUserName: joi.string().min(3).max(20).required().alphanum().messages(
//         {
//             "string.empty": "username is required",
//             "any.required": "username is required",
//             "string.min": "user name has to be at least 3 charactars"
//         }
//     ),
//     signUpEmail: joi.string().email().required(),
//     signUpPassword: joi.string().min(5).required().alphanum(),
//     confirmPassword: joi.valid(joi.ref('signUpPassword')).required(),
//     // valid : Adds the provided values into the allowed whitelist and marks them as the only valid values allowed.
//     // ref:Generates a reference to the value of the named key.
//     age:joi.number().min(20).positive().integer(),
//     gender:joi.string().alphanum().valid('Male','Female').required()
// });

// export const signInSchema = joi.object({
//     signInEmail: joi.string().email().required(),
//     signInPassword: joi.string().min(5).required().alphanum(),
// });

export const signUpSchema = {
    body: joi.object({
        signUpUserName: joi.string().min(3).max(20).required().alphanum().messages(
            {
                "string.empty": "username is required",
                "any.required": "username is required",
                "string.min": "user name has to be at least 3 charactars"
            }
        ),
        signUpEmail: joi.string().email().required(),
        signUpPassword: joi.string().min(5).required().alphanum(),
        confirmPassword: joi.valid(joi.ref('signUpPassword')).required(),
        // valid : Adds the provided values into the allowed whitelist and marks them as the only valid values allowed.
        // ref:Generates a reference to the value of the named key.
        age: joi.number().min(20).positive().integer(),
        gender: joi.string().alphanum().valid('Male', 'Female').required()
    })
};

export const signInSchema = {
    body: joi.object({
        signInEmail: joi.string().email().required(),
        signInPassword: joi.string().min(6).required().alphanum(),
    })
};
