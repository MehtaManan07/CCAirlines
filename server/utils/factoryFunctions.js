const ErrorResponse = require('../middlewares/ErrorResponse');
const asyncHandler = require('../middlewares/async');

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
    console.log(req.body);
    console.log('reached update');
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
