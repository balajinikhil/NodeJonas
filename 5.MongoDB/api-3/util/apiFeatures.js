class APIfeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  find() {
    const queryObj = { ...this.queryStr };
    const exclude = ["sort", "limit", "field", "page"];
    exclude.forEach(el => delete queryObj[el]);
    this.query = this.query.find(queryObj);

    return this;
  }
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitingFields() {
    if (this.queryStr.field) {
      const fields = this.queryStr.field.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-v");
    }
    return this;
  }
  pagination() {
    if (this.queryStr.page) {
      const page = this.queryStr.page * 1 || 1;
      const limit = this.queryStr.limit * 1 || 100;
      const skip = (page - 1) * limit;

      this.query = this.query.skip(skip).limit(limit);
    }

    return this;
  }
}

module.exports = APIfeatures;
