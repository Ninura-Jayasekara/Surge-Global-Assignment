const express = require('express')

const router = express.Router()
const {
    createUser,
    loginUser,
    getUser,
    fetchStudents,
    fetchId,
    updateStudent
} = require('../controllers/usersController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', createUser)
router.post('/login', loginUser)
router.get('/user', protect, getUser)
router.get('/fetch', fetchStudents)
router.get('/fetch/:id', fetchId)
router.patch('/update',  protect, updateStudent)
module.exports = router
