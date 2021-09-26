import render from "../../middlewares/renderMiddleware.js";
import * as services from "../../services/services.js";
import {validasaur} from "../../deps.js"; 

const showQues =async({render,user,state}) =>{
    console.log("hello");
    console.log(user);
    console.log("secondvpart");
    console.log();
    const data={
        questions: await services.showData(user.id),
        user: user,
    };
    console.log(data.user);
    render("questionView.eta", data);//actucally need id, dont know get
}

const validation ={
    title1: [validasaur.required,validasaur.minLength(1) ],
    question_text1: [validasaur.required,validasaur.minLength(1) ],
}

const addQues = async({request, response,render,user}) =>{
    const body= request.body();
    const params = await body.value;
    const title= params.get("title");
    const question_text= params.get("question_text");
    const data={
        title1: title,
        question_text1: question_text,
    }
    const [passes,errors] = await validasaur.validate(data,validation);
    if (passes){
        await services.addData(user.id,title,question_text);
        response.redirect("/questions");
    }else{
        const data={
            questions: await services.showData(user.id),
            errors: errors,
        }
        render("questionView.eta",data);
    }
    }
    

const deleteQues =async({params, response}) =>{
    console.log("arrive in delete detele question1");
    const id=params.id;
    await services.deleteData(id);
    console.log("finish the delete question3");
    response.redirect("/questions");

}

export{showQues,addQues,deleteQues};

