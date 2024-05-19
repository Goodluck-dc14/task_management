const express = require('express');

const router = express.Router();
const { create_task, get_task, get_task_detail, update_task, delete_task } = require('../Controller/task_controller');
const auth = require("../Middlewares/auth");

router.route('/').get(get_task);
router.route('/create').post(auth, create_task);
router.route('/:taskId').get(get_task_detail);
router.route('/update/:taskId').patch(update_task);
router.route('/delete/:taskId').delete(delete_task);
module.exports = router;