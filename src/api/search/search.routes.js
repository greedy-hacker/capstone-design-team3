const express = require("express");
const router = express.Router();

const searchController = require("./search.controller");
const passport = require("passport");

let routes = (app) => {
    router.post("/search/", passport.authenticate('jwt', {session: false}), searchController.createNewTask); // 사용자가 입력한 타겟도메인 받아오기
    router.get("/search/", passport.authenticate('jwt', {session: false}), searchController.getTaskResult);
    app.use("/api/", router);
};

module.exports = routes;