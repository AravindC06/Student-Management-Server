import express from 'express';
import { getAllStudents, updateStudent, deleteStudent, createStudent, testVercel } from '../controllers/adminControllers';

const router = express.Router();

// Define API routes for student management
router.post('/register', createStudent); // Create a new student
router.put('/updatestudent/:id', updateStudent); // Update a student by ID
router.get('/getallstudent', getAllStudents); // Get all students
router.get('/', testVercel); // Get all students
router.delete('/deletestudent/:id', deleteStudent); // Delete a student by ID
router.get('/', testVercel)
export default router;
