const advancedResults = (model, populate) => async (req, res, next) => {
    let query;
    // copy req.query
    const reqQuery = { ...req.query };
    const logicalOps = ['in', 'lte', 'gte', 'lt', 'gt'];
    //Fields to exclude;
    const removeFields = ['select', 'sort', 'page', 'limit'];
    Object.values(reqQuery).map((obj) => {
      logicalOps.map((operator) => {
        if (obj[operator] === 'undefined' || obj === 'undefined') {
          const key = Object.keys(reqQuery).find(
            (key) => reqQuery[key] === obj
          );
          removeFields.push(key);
        }
      });
    });
    console.log(reqQuery)
    // loop over removefields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);
  
    //creating query string
  
    let queryStr = JSON.stringify(reqQuery);
  
    //Create operators ($gt, $gte, etc...)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
  
    //Finding resource
    query = model.find(JSON.parse(queryStr));
  
    // select fields;
    if (req.query.select) {
      console.log('reached here')
      const fields = req.query.select.split(',').join(' ');
      query = query.select("title")
      console.log("f: ",fields)
    }
  
    if (populate) {
      query = query.populate(populate);
    }
  
    // sort fields;
    if (req.query.sort) {
      console.log("reached")
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
  
    // Pagination;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 4;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments(); 
  
    query = query.skip(startIndex).limit(limit);
  
    // Execution of query
    const results = await query;
  
    //pagination result;
    // const pagination = {};
    // if (endIndex < total) {
    //   pagination.next = {
    //     page: page + 1,
    //     limit,
    //   };
    // }
    // if (startIndex > 0) {
    //   pagination.prev = {
    //     page: page - 1,
    //     limit,
    //   };
    // }
    res.advancedResults = {
      success: true,
      count: results.length,
      // pagination,
      data: results,
    };
  
    next();
  };
  
  module.exports = advancedResults;
  