const mongoose = require('mongoose');
const Student = require('./models/studentModel'); // Adjust the path as necessary

const uri = 'mongodb+srv://laravind443:8ZxyDk8GIPWeacQA@yellowowldb.lsh0iyf.mongodb.net/Node-API?retryWrites=true&w=majority&appName=yellowowlDB'; // Replace with your MongoDB Atlas connection string

const cleanUpEnrollNumber = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Find documents with null EnrollNumber
    const studentsWithNullEnrollNumber = await Student.find({ EnrollNumber: null });
    console.log('Students with null EnrollNumber:', studentsWithNullEnrollNumber);

    // If there are any, either remove or update them
    if (studentsWithNullEnrollNumber.length > 0) {
      await Student.deleteMany({ EnrollNumber: null });
      console.log('Removed students with null EnrollNumber');
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error during cleanup:', error);
    await mongoose.disconnect();
  }
};

cleanUpEnrollNumber();
