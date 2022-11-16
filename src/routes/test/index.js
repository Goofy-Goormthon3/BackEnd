const { Router } = require("express");
const router = Router();
const ctrl = require("./test.ctrl");

router.get("/", ctrl.get_root);
// router.get("/add/:title", ctrl.get_add_title);
// router.get("/click/:title", ctrl.get_click_title);

module.exports = router;
