// routes/materials.js
const express = require("express");
const router = express.Router();
const store = require("../data/store");

// GET /materials - List all materials
router.get("/", (req, res) => {
  res.json({ success: true, data: store.materials });
});

// POST /add-material - Add new material to master
router.post("/add", (req, res) => {
  const { name, quantity, threshold, unit } = req.body;

  if (!name || quantity === undefined || threshold === undefined) {
    return res.status(400).json({ success: false, message: "Name, quantity, and threshold are required." });
  }

  store.counters.mat++;
  const id = `MAT-${String(store.counters.mat).padStart(3, "0")}`;

  const material = {
    id,
    name: name.trim(),
    quantity: parseInt(quantity),
    threshold: parseInt(threshold),
    unit: unit?.trim() || "Units",
    createdAt: new Date().toISOString()
  };

  store.materials.push(material);
  res.status(201).json({ success: true, message: "Material added successfully.", data: material });
});

// PUT /materials/:id/restock - Update quantity after PO fulfillment
router.put("/:id/restock", (req, res) => {
  const mat = store.materials.find(m => m.id === req.params.id);
  if (!mat) return res.status(404).json({ success: false, message: "Material not found." });

  const { quantity } = req.body;
  mat.quantity += parseInt(quantity);
  res.json({ success: true, message: "Stock updated.", data: mat });
});

module.exports = router;
