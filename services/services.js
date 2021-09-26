import { executeQuery } from "../database/database.js";


const showData =async(id) =>{
    const result= await executeQuery("SELECT * from questions where user_id=$1",id);
    //not sire about the input, but should by a user id. auth
    //console.log("show data");
    //console.log(result.rows);
    console.log("show all data");
    console.log(id);
    console.log(result.rows);

    return result.rows;
}

const showAllQuestions =async() =>{
    const result= await executeQuery("SELECT * from questions");
    //not sire about the input, but should by a user id. auth
    //console.log("show data");
    //console.log(result.rows);

    return result.rows;
}
const showOneData =async(id) =>{
    const result= await executeQuery("SELECT * from questions where id=$1",
    id);
     //not sire about the input, but should by a user id. auth
    //console.log("show data");
    //console.log(result.rows);
     return result.rows[0];
}

const showDatabyEmail =async(email) =>{
    const result= await executeQuery("SELECT * from users where email=$1",
    email);
    return result.rows;
}


const addData =async(id,title,question_text) =>{
    await executeQuery("INSERT INTO questions(user_id,title, question_text)  values ($1,$2,$3);",
    id,title,question_text);
}

const deleteData =async(id) =>{
    console.log("arrive in delete question2 database");
    await executeQuery("DELETE from questions where id=$1",
    id);
}

const showO =async(question_id ) =>{
    //console.log("show options-2");
    const result= await executeQuery("SELECT * from question_answer_options where question_id=$1;",
    question_id ); //here is not userID.
    console.log("8");
    console.log(result.rows);
    return result.rows;
}

const addO =async(question_id,option_text,is_correct)=>{
    console.log("add O");
    await executeQuery("INSERT INTO question_answer_options(question_id,option_text,is_correct)  values ($1,$2,$3);",
    question_id,option_text,is_correct);
}

const removeO =async(question_id,id) =>{
    console.log("remove option in database");
    await executeQuery("DELETE from question_answers WHERE question_id=$1 and question_answer_option_id =$2;",
    question_id,id);
    await executeQuery("DELETE from question_answer_options WHERE question_id=$1 and id =$2;",
    question_id,id);
}

const checkOption =async(option_id) =>{
    const result= await executeQuery("select * from question_answer_options where id=$1",
    option_id);
    return result.rows[0];
}
const rightOption =async(option_id) =>{
    const result= await executeQuery("select * from question_answer_options where question_id=$1 and is_correct=true",
    option_id);
    return result.rows[0];
}

const checkOptionAnswer =async(questionId,option_id) =>{
    console.log("hiiiii");
    const result= await executeQuery("select * from question_answer_options WHERE question_id=$1 and id =$2",
    questionId,option_id);
    return result.rows[0];
}


export{showData,addData,addO,showO,removeO,deleteData,
    showOneData,checkOption, rightOption,showDatabyEmail,showAllQuestions,checkOptionAnswer};