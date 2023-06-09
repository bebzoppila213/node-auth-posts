import bcrypt from "bcrypt";

export default async function utilsHasPassword(password: string){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}