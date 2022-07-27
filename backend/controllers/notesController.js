const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')

const Note = require('../models/notesModel')
const User = require('../models/userModel')

// Fetch notes

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id })

  res.status(200).json(notes)
})

// Create Note

const createNote = asyncHandler(async (req, res) => {
  // if (!req.body.title || !req.body.description) {
  //   res.status(400)
  //   throw new Error('Please add this field')
  // }

  const note = await Note.create({
    title: req.body.title,
    description: req.body.description,
    user: req.user._id
  })

  res.status(200).json(note)
})

// Update note

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (!note) {
    res.status(400)
    throw new Error('Note not found')
  }

  // Check for student
  if (!req.user) {
    res.status(401)
    throw new Error('Student not found')
  }

  // Check if the logged in student matches the notes
  if (note.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Student not authorized')
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updateNote)
})

// Delete notes

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (!note) {
    res.status(400)
    throw new Error('Note not found')
  }

  // Check for student
  if (!req.user) {
    res.status(401)
    throw new Error('Student not found')
  }

  // Check if the logged in student matches the notes
  if (note.user.toString() !== req.user.id) {
    
    res.status(401)
    console.log(note.user.toString)
    console.log(req.user.id)
    throw new Error('Student not authorized')
    
  }

  await note.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
}
