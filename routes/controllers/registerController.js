import render from "../../middlewares/renderMiddleware.js";
import * as registerService from "../../services/register.js";
import * as service from "../../services/services.js";
import { bcrypt } from "../../deps.js"; 
import {validasaur} from "../../deps.js"; 

const registerForm =async({render}) =>{
    render("registerView.eta");
}

const validation ={
    email1: [validasaur.required,validasaur.isEmail ],
    password1: [validasaur.required,validasaur.minLength(4) ],
    
}

const registerUser =async({render,response,request}) =>{
    /// need to register user and validations, so dont know yet.
    const body=request.body();
    const params=await body.value;
    const email = params.get("email");
    const password=params.get("password");
    const data={
        email1: email,
        password1: password,
    }
    const [pass, errors]= await validasaur.validate(data,validation);
    if (pass){
        const hash = await bcrypt.hash(password);

        await registerService.registerUser(email,hash);
        response.redirect("/auth/login");

    }else {
        const data={
            errors: errors,
        }
        render("registerView.eta",data);
    }
    

}

const loginForm =async({render}) =>{
    console.log("log form");
    render("loginView.eta");
}

const loginUser =async({request,response,state}) =>{
    //render(registerView.eta);
 /// need to register user and validations, so dont know yet.
    const body=request.body();
    const params=await body.value;
    const email = params.get("email");
    const password=params.get("password");
    console.log("1");
    const results = await registerService.checkUser(email);
    console.log("2");
    console.log(results);
    console.log((password));
    const userFromDatabase = await service.showDatabyEmail(email);
    const user =userFromDatabase[0]; 
    let compare= await bcrypt.compare(password,results.password);
    console.log("3");
    console.log(user);
    if (compare){
        await state.session.set("user", user);
        console.log("test session");
        console.log(await state.session.get("user"));
        response.redirect("/questions");
    }else{
        //login page with error messages.
        response.redirect("/auth/login");
    }
 
 
    

}


export{registerForm, registerUser,loginForm,loginUser};