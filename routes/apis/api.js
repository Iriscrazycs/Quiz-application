import * as services from "../../services/services.js";
import * as quizServices from "../../services/quizService.js";

const returnApi =async({response})=>{
    console.log("line1");
    
    const result1= await services.showAllQuestions()
    if (result1.length === 0) {
        response.body={};   
    }else {
        const result= await quizServices.randomChooseRow();
        console.log("hello there");

        

        console.log(result);
        console.log("line2")
        const options=await services.showO(result.id);
        console.log(options);
        //console.log(options[1].id);
        //console.log("helloooo");
        //const a= await services.checkOptionAnswer(9,56);
        //console.log(a.is_correct);
        
        let array=[];
        for (var i=0; i<options.length; i++){
            const obj={
                optionId: options[i].id,
                optionText: `${options[i].option_text}`,

                

            }

            array.push(obj);
        }

        console.log("array");
        console.log(array);
        
        
        response.body={
            "questionId": result.id,
            "questionTitle": `${result.title}`,
            "questionText": `${result.question_text}`,
            "answerOptions": array,
        
        }
    }
    
    

}

const check =async({request, response})=>{
    console.log("hello")
    const body= request.body({type: "json"});
    const value=await body.value;

    //const javaObj=JSON.parse(value);
    let javaObj = value;

    const result=await services.checkOptionAnswer(javaObj.questionId,
                                                javaObj.optionId);
    
    response.body={
        "correct": result.is_correct,
    }

}


export {returnApi,check};

