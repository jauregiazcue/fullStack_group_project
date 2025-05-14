import bcrypt from "bcrypt";

async function hash(password){
    const result = await bcrypt.hash(password,10);
    return result;
}
async function compare(password,hash){
    const result = await bcrypt.compare(password,hash)
    return result;
}

export {
    hash,
    compare
}