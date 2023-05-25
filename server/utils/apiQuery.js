class apiQuery{
    constructor(documents,queryObject){
        this.documents=documents
        this.queryObject=queryObject
    }

    filter(){
        let queryObj={...this.queryObject}
        const excludeFilds=["page","sort","limit","fields"]
        excludeFilds.forEach((ele,index)=>{
            delete queryObj[ele]
        })
        let finalqueryString=JSON.stringify(queryObj)
        finalqueryString=finalqueryString.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>{
            return `$${match}`
        })
        this.documents=this.documents.find(JSON.parse(finalqueryString)) 
        return this
    }
    sort(){
        if(this.queryObject.sort){
            const sortBy=this.documents.sort.split(",").join(" ")
            this.documents=this.documents.sort(sortBy)
        }else{
            this.documents=this.documents.sort("-createdAt")
        }
        return this
    }
    limitFields(){
        if(this.queryObject.fields){
            const fields=this.documents.filds.split(",").join(" ")
            this.documents=this.documents.select(fields)
        }else{
            this.documents=this.documents.select("-__v")
        }
        return this
    }
    pagination(){
        const page=this.queryObject.page*1 || 1
        const limit=this.queryObject.limit *1 || 10;
        const skip=(page-1) * limit
        this.documents=this.documents.skip(skip).limit(limit)
        return this
    }

}

module.exports=apiQuery