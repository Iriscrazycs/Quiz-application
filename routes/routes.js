import { Router } from "../deps.js";

import * as serviceController from "./controllers/serviceController.js";
import * as optionController from "./controllers/optionController.js";
import * as registerController from "./controllers/registerController.js";
import * as quizController from "./controllers/quizController.js";
import * as statisticsController from "./controllers/statisticsController.js";
import * as mainController from "./controllers/mainController.js";
import * as api from "./apis/api.js";

const router = new Router();



router.get("/",mainController.showMain);
router.get("/questions",serviceController.showQues);
router.post("/questions",serviceController.addQues);
router.get("/questions/:id",optionController.showOption);
router.post("/questions/:id/options",optionController.addOption);
router.post("/questions/:questionId/options/:optionId/delete",optionController.removeOption);
router.post("/questions/:id/delete",serviceController.deleteQues);
router.get("/auth/register",registerController.registerForm);
router.post("/auth/register",registerController.registerUser);
router.get("/auth/login",registerController.loginForm);
router.post("/auth/login",registerController.loginUser);
router.get("/quiz",quizController.showQuiz);
router.get("/quiz/:id",quizController.showAll);
router.post("/quiz/:id/options/:optionId",quizController.answerCheck);
router.get("/quiz/:id/correct",quizController.correctPage);
router.get("/quiz/:id/incorrect",quizController.IncorrectPage);
router.get("/statistics", statisticsController.showStat);
router.get("/api/questions/random", api.returnApi);
router.post("/api/questions/answer", api.check);



export{router};