import mongoose, { Schema, Document } from 'mongoose';

interface IStudent extends Document {
    UniqueId: string;
    Name: string;
    Email: string;
    Phone: string;
    EnrollNumber: number;
    DateOfAdmission: Date;
}

// Define Mongoose schema for Student model
const studentSchema: Schema = new Schema(
    {
        UniqueId: {
            type: String,
            required: [true],
        },
        Name: {
            type: String,
            required: [true, "Please provide the name"]
        },
        Email: {
            type: String,
            required: [true, "Please provide the email"],
            unique: true,
        },
        Phone: {
            type: String,
            required: [true, "Please provide the phone number"]
        },
        EnrollNumber: {
            type: Number,
            required: [true, "Please provide the enroll number"],
            unique: true,
        },
        DateOfAdmission: {
            type: Date,
            required: [true, "Please provide the date of admission"],
        }
    },
    {
        timestamps: true // Adds createdAt and updatedAt timestamps to documents
    }
);

// Create Mongoose model for Student using the schema
const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;
