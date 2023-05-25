const ProjectCategory=require("../models/projectCatModel")
const { createDocument, updateDocument, deleteDocument, getDocument, getAllDocuments } = require("../utils/customCtrl")


exports.createCategory=createDocument(ProjectCategory,"Category created successfully")

exports.updateCategory=updateDocument(ProjectCategory,"Category updated successfully")

exports.deleteCategory=deleteDocument(ProjectCategory,"Category deleted successfully")

exports.getCategory=getDocument(ProjectCategory,"Category fetched successfully")

exports.getAllCategories=getAllDocuments(ProjectCategory)