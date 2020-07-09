export default (mongoose) => {
  const schema = mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, required: true },
    value: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) throw new Error('Negative Number');
      },
    },
    lastModified: { type: Date, required: false },
  });
  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const gradeModel = mongoose.model('grades', schema);
  return gradeModel;
};
