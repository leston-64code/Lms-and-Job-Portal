const Project=require("../models/projectModel")
const { createDocument, updateDocument, deleteDocument, getDocument, getAllDocuments } = require("../utils/customCtrl")


exports.createProject=createDocument(Project,"Project submitted successfully")

exports.updateProject=updateDocument(Project,"Project updated successfully")

exports.deleteProject=deleteDocument(Project,"Project deleted successfully")

exports.getProject=getDocument(Project,"Project fetched successfully")

exports.getAllProjects=getAllDocuments(Project)