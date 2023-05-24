const Work=require("../models/workModel")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const { createDocument, updateDocument, deleteDocument, getDocument, getAllDocuments } = require("../utils/customCtrl")


exports.postDetails=createDocument(Work,"Details submitted successfully")

exports.updateDetails=updateDocument(Work,"Details updated successfully")

exports.deleteDetails=deleteDocument(Work,"Details deleted successfully")

exports.getDetail=getDocument(Work,"Details fetched successfully")

exports.getAllDetails=getAllDocuments(Work)