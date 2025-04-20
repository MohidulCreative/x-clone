import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res
                .status(401)
                .json({ message: "Unauthorized: invalid token" });
        }
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res
                .status(401)
                .json({ message: "Unauthorized: user not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("protectRoute error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
