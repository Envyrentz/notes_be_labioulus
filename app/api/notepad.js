const express = require("express");
const router = express.Router();
const { handleCreateNotepad, handleDeleteNotepad, handleGetNotepadById, handleGetNotepads, handleUpdateNotepad } = require("../controller/notepad");

router
    .get("/", handleGetNotepads)
    .get("/:id", handleGetNotepadById)
    .delete("/:id", handleDeleteNotepad)
    .post("/", handleCreateNotepad)
    .put("/:id", handleUpdateNotepad);

module.exports = router;
