import request from 'supertest';
import express from 'express';
import router from '../src/routes/adminRoutes';
import { createStudent, deleteStudent, getAllStudents, updateStudent } from '../src/controllers/adminControllers';

jest.mock('../src/controllers/adminControllers');

const app = express();
app.use(express.json());
app.use('/api/students', router);

describe('Student Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /register', () => {
    it('should create a student', async () => {
      (createStudent as jest.Mock).mockImplementation((req, res) => {
        res.status(201).json({ message: 'Student created successfully' });
      });

      const response = await request(app)
        .post('/api/students/register')
        .send({
          UniqueId: '12345',
          Name: 'John Doe',
          Email: 'john@example.com',
          Phone: '1234567890',
          EnrollNumber: 'EN12345',
          DateOfAdmission: '2024-01-01',
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Student created successfully' });
    });
  });

  describe('PUT /updatestudent/:id', () => {
    it('should update a student', async () => {
      (updateStudent as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json({ message: 'Student updated successfully' });
      });

      const response = await request(app)
        .put('/api/students/updatestudent/1')
        .send({
          Name: 'John Doe',
          Email: 'john@example.com',
          Phone: '1234567890',
          EnrollNumber: 'EN12345',
          DateOfAdmission: '2024-01-01',
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Student updated successfully' });
    });
  });

  describe('GET /getallstudent', () => {
    it('should get all students', async () => {
      (getAllStudents as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json([{ Name: 'John Doe' }]);
      });

      const response = await request(app).get('/api/students/getallstudent');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ Name: 'John Doe' }]);
    });
  });

  describe('DELETE /deletestudent/:id', () => {
    it('should delete a student', async () => {
      (deleteStudent as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json({ message: 'Student deleted successfully' });
      });

      const response = await request(app).delete('/api/students/deletestudent/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Student deleted successfully' });
    });
  });
});