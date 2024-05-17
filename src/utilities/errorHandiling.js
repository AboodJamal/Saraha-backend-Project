const asyncHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(err => {
            return res.json({ massage: "catch error", error: err.stack })
        }
        )
    }
}


export default asyncHandler;

