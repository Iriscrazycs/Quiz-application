import render from "../../middlewares/renderMiddleware.js";
import * as service from "../../services/services.js";
import * as quizService from "../../services/quizService.js";

const showQuiz =async({response}) =>{
   
    const result= await quizService.randomChooseRow();
    const number= result.id;
    console.log("random number");
    console.log(number);
    response.redirect(`/quiz/${number}`);
}

const showAll =async({params,render}) =>{
    console.log("here");
    const question_id =params.id;
    const data ={
        
        options: await service.showO(question_id ),
        question: await service.showOneData(question_id),
    };
    
    console.log("data");
    console.log(data.options);
    
    render("quizView.eta", data);

}

const answerCheck = async({params,response}) =>{
    console.log("here in quiz");
    const question_id=params.id;
    const option_id=params.optionId;
    const result = await service.checkOption(option_id);
    console.log("1");
    const userResult = await service.showOneData(question_id);
    console.log("2");
    await quizService.userWithOption(userResult.user_id,question_id,option_id,result.is_correct);
    console.log("144");
    console.log(result);
    console.log(userResult);
    if (result.is_correct){
        response.redirect(`/quiz/${question_id}/correct`);
    }else{
        response.redirect(`/quiz/${question_id}/incorrect`);
    }

}

const correctPage =async({render}) =>{
    render("correctView.eta");
}
const IncorrectPage =async({render,params}) =>{
    console.log("incorrect page");
    const question_id=params.id;
    const result= await service.rightOption(question_id);
    console.log("wen");
    console.log(result);
    render("incorrectView.eta",result);
}


export{showQuiz, showAll,answerCheck,correctPage,IncorrectPage};