import { executeQuery } from "../database/database.js";

const countTotal =async(user) =>{
    console.log("here");
    const result= await executeQuery("Select count(id) from question_answers where user_id=$1",
    user);
    console.log("there");
    console.log(result.rows[0].count);
    console.log(typeof result.rows[0].count);
    return result.rows[0].count;

}


const countRight =async(user) =>{
    const result= await executeQuery("Select count(id) from question_answers where user_id=$1 and correct=true",
    user);
    console.log(result);
    return result.rows[0].count;

}

const countQues =async(user) =>{
    console.log("1");
    const result1 =await executeQuery("select * from questions where user_id=$1",
    user);
    console.log("2");
    const question_id=result1.rows[0].id;
    console.log(question_id);

    const result= await executeQuery("Select count(id) from question_answers where user_id=$1 and question_id=$2",
    user,question_id);
    console.log("3");
    console.log(result);
    return result.rows[0].count;

}

const fiveMost =async() =>{
    const data=await executeQuery(`Select users.email as email, count(*)
    as count from users
    JOIN question_answers ON users.id=question_answers.user_id
    group by users.email
    order by count
    limit 5  `);
    console.log(data.rows);
    return data.rows;
}


export{countTotal,countRight,countQues,fiveMost};