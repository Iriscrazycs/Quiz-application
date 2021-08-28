import render from "../../middlewares/renderMiddleware.js";
import * as services from "../../services/services.js";
import {validasaur} from "../../deps.js"; 

const showOption =async({response,params,render}) =>{
    console.log("show options");
    const question_id =params.id;
    const data ={
        
        options: await services.showO(question_id ),
        question: await services.showOneData(question_id),
    };
    
    console.log("data");
    console.log(data.options);
    
    render("optionView.eta", data);
}

const validation ={
    option_text1: [validasaur.required,validasaur.minLength(1) ],
    
}

const addOption = async({request, response,params,render}) =>{
    console.log("11111");
    const body= request.body();
    const params1 = await body.value;
    const option_text= params1.get("option_text");
    const is_correct= params1.get("is_correct");
    console.log("check type of is_correct");
    let a=true;
    if (is_correct === null){
        a=false;
    }
    console.log("hello");
    

    /*
    
    console.log(Object.keys(is_correct));
    console.log(typeof is_correct);
    
    }
    */
    const data={
        option_text1: option_text,
    }
    console.log("11");
    console.log(params.id);
    const [pass, errors] = await validasaur.validate(data,validation);
    console.log("12");
    console.log(errors);
    if (pass){
        await services.addO(params.id,option_text,a);
    
        response.redirect(`/questions/${params.id}`);

    }else {
        const data ={
        
            options: await services.showO(params.id ),
            question: await services.showOneData(params.id ),
            errors: errors,
        };
        console.log("last part");
        render("optionView.eta",data);
    }
    
}

const removeOption =async ({params,response}) =>{
    const questionId=params.questionId;
    const optionId=params.optionId;
    await services.removeO(questionId,optionId);
    response.redirect(`/questions/${questionId}`);
}


export{showOption,addOption,removeOption};

