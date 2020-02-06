class APIfeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  find() {
    const queryObj = { ...this.queryString };
    const exclude = ["sort", "limit", "page", "field"];
    exclude.forEach(el => delete queryObj[el]);

    this.query = this.query.find(queryObj);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  pagenation() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIfeature;
