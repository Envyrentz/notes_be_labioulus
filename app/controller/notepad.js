const ApplicationError = require('../../config/errors/ApplicationError');
const Notepad = require('../model/notepad');

exports.handleGetNotepads = async (req, res) => {
    try {
        const data = await Notepad.getNotepads();
        res.status(200).json({
            status: "SUCCESS GET NOTEPADS",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL GET NOTEPADS",
            message: error.message,
        });
    }
}

exports.handleGetNotepadById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Notepad.getNotepadById(id);
        if (!data.length) {
            throw new ApplicationError('Notepad not found', 404);
        }
        res.status(200).json({
            status: "SUCCESS GET NOTEPAD BY ID",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL GET NOTEPAD BY ID",
            message: error.message,
        });
    }
}

exports.handleDeleteNotepad = async (req, res) => {
    try {
        const { id } = req.params;
        await Notepad.deleteNotepad(id);
        res.status(200).json({
            status: "SUCCESS DELETE NOTEPAD",
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL DELETE NOTEPAD",
            message: error.message,
        });
    }
}

exports.handleCreateNotepad = async (req, res) => {
    try {
        const { title, note } = req.body;
        const data = await Notepad.createNotepad(title, note);
        res.status(200).json({
            status: "SUCCESS CREATE NOTEPAD",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL CREATE NOTEPAD",
            message: error.message,
        });
    }
}

exports.handleUpdateNotepad = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, note } = req.body;
        const data = await Notepad.updateNotepad(id, title, note);
        res.status(200).json({
            status: "SUCCESS UPDATE NOTEPAD",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL UPDATE NOTEPAD",
            message: error.message,
        });
    }
}
