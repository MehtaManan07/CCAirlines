const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  // copy req.query
  const reqQuery = { ...req.query };
  //Fields to exclude;
  let removeFields = ['select', 'sort', 'page', 'limit'];

  Object.entries(reqQuery).map((each) => {
    if (typeof each[1] === 'object') {
      let tempArr = Object.entries(each[1])[0];
      if (tempArr[1] === 'undefined' || tempArr[1] === '') {
        removeFields.unshift(each[0]);
      }
    }
    if (each[1] === 'undefined' || each[1] === '') {
      removeFields.unshift(each[0]);
    }
  });

  // loop over removefields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  //creating query string

  let queryStr = JSON.stringify(reqQuery);

  //Create operators ($gt, $gte, etc...)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in|all)\b/g,
    (match) => `$${match}`
  );

  let finalQuery = JSON.parse(queryStr);
  let tempValues = Object.values(finalQuery);
  tempValues.map(value => {
    if (typeof value === 'object') {
      let key = Object.keys(value)
      let myStr = Object.values(value)[0]
      const newValue = myStr.includes(',') ? myStr.split(',') : myStr
      value[key] = newValue
    }
  })

  //Finding resources
  query = model.find(finalQuery);

  // select fields;
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select('title');
  }

  if (populate) {
    query = query.populate(populate);
  }

  // sort fields;
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Execution of query
  const results = await query;

  //pagination result;
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
