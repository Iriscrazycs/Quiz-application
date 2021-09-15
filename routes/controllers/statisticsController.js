import * as statistics from "../../services/statistics.js"; 
import render from "../../middlewares/renderMiddleware.js";


const showStat =async({user,render,state}) =>{
    console.log("statistics1");
    const number1= await statistics.countTotal(user.id);
    console.log("statistics2");
    const number2=await statistics.countRight(user.id);
    console.log("statistics3");
    const number3=await statistics.countQues(user.id);
    console.log("statistics4");
    const number4=await statistics.fiveMost();
    console.log("statistics5");
    const data ={
        total: Number(number1),
        correct: Number(number2),
        user: Number(number3),
        five: number4,
    }
    console.log(data.total);
    console.log(data.five);
    console.log("statistics2222");
    
    console.log(data.user);
    console.log("eww");
    render("statisticsView.eta",data);

}

export{showStat};