import { Request, Response } from 'express';
import Student from '../models/studentModel';
import { HttpStatus } from '../constants';



const testVercel = async (req: Request, res: Response) => {
  try {
    console.log("Success");
    res.json("Welcome to vercel deploy");
  } catch (error) {
    console.error('Error in testVercel:', (error as Error).message);
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
};


/**
 * Controller function to create a new student.
 * @param req The request object containing student data in the body.
 * @param res The response object to send back the result.
 */
const createStudent = async (req: Request, res: Response) => {
  const { UniqueId, Name, Email, Phone, EnrollNumber, DateOfAdmission } = req.body;

  try {
    // Create a new student record in the database
    const savedStudent = await Student.create({
      UniqueId,
      Name,
      Email,
      Phone,
      EnrollNumber,
      DateOfAdmission,
    });

    // Respond with success message and the saved student data
    res.status(HttpStatus.CREATED).json({
      message: 'Student created successfully',
      student: savedStudent,
    });
  } catch (error: unknown) {
    console.error('Error creating student:', error);

    const mongoError = error as any;

    // Handle duplicate key error (e.g., duplicate email or enroll number)
    if (mongoError.code === 11000) {
      const duplicateKeyErrorMessage = mongoError.errmsg;
      console.error('Duplicate key error:', duplicateKeyErrorMessage);
    }

    // Respond with internal server error message
    res.status(HttpStatus.SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

/**
 * Controller function to get all students.
 * @param req The request object (unused in this function).
 * @param res The response object to send back the list of students.
 */
const getAllStudents = async (req: Request, res: Response) => {
  try {
    // Fetch all students from the database
    const students = await Student.find();
    // Respond with the list of students
    res.status(HttpStatus.OK).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    // Respond with internal server error message if an error occurs
    res.status(HttpStatus.SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

/**
 * Controller function to update student details.
 * @param req The request object containing updated student data in the body.
 * @param res The response object to send back the updated student data.
 */
const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { Name, Email, Phone, EnrollNumber, DateOfAdmission } = req.body;

  try {
    console.log(id);

    // Check if the email is already in use by another student
    const existingStudent = await Student.findOne({ Email });
    if (existingStudent && existingStudent.id.toString() !== id) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    // Prepare updated document for the student
    const replacementDocument = { Name, Email, Phone, EnrollNumber, DateOfAdmission };

    // Update the student record in the database
    const result = await Student.updateOne({ _id: id }, replacementDocument);

    // Check if the student was found and updated
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    // Fetch and send back the updated student data
    const updatedStudent = await Student.findById(id);
    res.status(200).json({ success: true, data: updatedStudent });
  } catch (error: any) {
    console.error('Error updating student details:', error.message);
    // Respond with internal server error message and the error details
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

/**
 * Controller function to delete a student.
 * @param req The request object containing the ID of the student to delete.
 * @param res The response object to send back the result of the delete operation.
 */
const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log("Delete User : ", id);

    // Find and delete the student record from the database
    const student = await Student.findOneAndDelete({ _id: id });

    // Check if the student was found and deleted
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    // Respond with success message for the delete operation
    res.status(200).json({ success: true, message: 'Student deleted successfully.' });
  } catch (error) {
    console.error('Error deleting student:', error);
    // Respond with internal server error message if an error occurs
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export { createStudent, getAllStudents, updateStudent, deleteStudent, testVercel };
