export default (mongoose) => {
  const schema = mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    value: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) throw new Error('Negative Number');
      },
    },
    lastModified: { type: String, required: false },
  });
  const gradeModel = mongoose.Model('grades', schema);
  return gradeModel;
};
