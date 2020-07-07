import mongoose from 'mongoose';
import gradeModel from './modelGrade.js';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.grades = gradeModel(mongoose);

export { db };
