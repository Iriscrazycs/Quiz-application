import { executeQuery } from "../database/database.js";

const registerUser =async(email, hash)=>{
    await executeQuery("INSERT INTO users (email, password) values($1,$2)",
    email,hash);
}

const checkUser =async(email)=>{
    console.log("email place");
    const result=await executeQuery("select * from users where email=$1",
    email);
    return result.rows[0];
    
    
    
}


export{registerUser,checkUser};