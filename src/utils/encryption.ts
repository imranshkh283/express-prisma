import bcrypt from "bcryptjs";

export const encryptPassword = async (password:string) => {
    const encryptedPassword = bcrypt.hash(password,8)
    return encryptedPassword;
}