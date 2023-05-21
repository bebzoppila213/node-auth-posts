import bcrypt from "bcrypt";


export default async function utilsComparePassword(password: string, hash: string){
    return await bcrypt.compare(password, hash);
}