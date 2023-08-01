import express from "express";
import { Task } from "../models/Task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: req.user
    });
    res.status(201).json({
      success: true,
      message: "Task added Successfully"
    });
  } catch (error) {
    console.error("Error adding new task:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks
    });
  } catch (error) {
    console.error("Error getting all tasks:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

export const updateTasks = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task Not Found" });
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated"
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Invalid Task" });
    }
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted"
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};
