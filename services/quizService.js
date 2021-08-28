import { executeQuery } from "../database/database.js";


const userWithOption =async(user_id,question_id,question_answer_option_id,
    correct ) =>{
    
    await executeQuery("insert into question_answers(user_id,question_id,question_answer_option_id,correct) VALUES ($1,$2,$3,$4)",
    user_id,question_id,question_answer_option_id,correct );

}

const randomChooseRow =async()=>{
    const result= await executeQuery("SELECT * FROM questions ORDER BY random() LIMIT 1");
    return result.rows[0];
}

export{userWithOption,randomChooseRow};