const connectionDB = require("../db/connection");
const apiGet = require("./api/get");
const apiPost = require("./api/post");
const router = require("express").Router();

connectionDB();

router.use(apiGet);
router.use(apiPost);

module.exports = router;
