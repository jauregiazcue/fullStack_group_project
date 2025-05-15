import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


function createToken(userData){
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '24h' });
    return token;
}

function verifyToken(token){
    const result = jwt.verify(token,JWT_SECRET);
    return result;
}

export{
    createToken,
    verifyToken
}
/* const secret = 'mysecretkey';

const token = jwt.sign({ username: 'exampleuser' }, secret, { expiresIn: '1h' });
console.log(token);

const decoded = jwt.verify(token, secret);
console.log(decoded); */