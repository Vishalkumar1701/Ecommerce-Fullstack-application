class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            pname : {
                $regex : new RegExp(this.queryStr.keyword, 'i'),
            },
        } : {};
        this.query = this.query.find({...keyword});
        return this;
    }
    filter() {
        const quesryCopy = {...this.queryStr}
        const removeField = ["keyword","page","limit"];
        removeField.forEach(key => delete quesryCopy[key]);
        
        //filter for price
        let queryStr = JSON.stringify(quesryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;