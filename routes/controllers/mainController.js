import render from "../../middlewares/renderMiddleware.js";


const showMain = ({ render }) => {
  render("main.eta");
};

export { showMain };
