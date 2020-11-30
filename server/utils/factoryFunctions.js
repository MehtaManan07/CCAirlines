const ErrorResponse = require('../middlewares/ErrorResponse');
const asyncHandler = require('../middlewares/async');
const AdvancedFeatures = require('./filterFeatures');

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(
        new ErrorResponse(`No document found with id ${req.params.id}`, 404)
      );
    }

    await doc.remove();

    res.status(204).json({
      success: true,
      data: null,
    });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new ErrorResponse(`No document found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: doc });
  });

  
exports.getAll = (Model) =>
asyncHandler(async (req, res, next) => {
  // hack for reviews
  let filter = {}
  // Executing the query
  const features = new AdvancedFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const allDocs = await features.query.explain();
  const allDocs = await features.query;

  res.status(200).json({
    success: true,
    count: allDocs.length,
    data: allDocs,
  });
});
