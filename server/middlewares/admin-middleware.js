
const adminMiddleware = async (req, res, next) => {
    try {
        console.log(req.user);
        const adminRole = req.user.isAdmin;
        if (!adminRole) {
            return res
                .status(404)
                .json({ message: 'access denied user is not admin' })
        }
        next();
        // res.status(200).json({ msg: req.user.isAdmin })
    } catch (error) {
        next(error)
    }
}

export default adminMiddleware;
