const BookSession=require("../models/sessionModel")
const { createDocument, updateDocument, deleteDocument, getDocument, getAllDocuments } = require("../utils/customCtrl")


exports.createSession=createDocument(BookSession,"Session created successfully")

exports.updateSession=updateDocument(BookSession,"Session updated successfully")

exports.deleteSession=deleteDocument(BookSession,"Session deleted successfully")

exports.getSession=getDocument(BookSession,"Session fetched successfully")

exports.getAllSessions=getAllDocuments(BookSession)