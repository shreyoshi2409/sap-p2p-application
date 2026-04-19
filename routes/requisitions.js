// routes/requisitions.js
const express = require("express");
const router = express.Router();
const store = require("../data/store");

// GET /prs - List all Purchase Requisitions
router.get("/", (req, res) => {
  res.json({ success: true, data: store.purchaseRequisitions });
});

// POST /create-pr - Create a new Purchase Requisition
router.post("/create", (req, res) => {
  const { materialId, quantity, remarks } = req.body;

  if (!materialId || !quantity) {
    return res.status(400).json({ success: false, message: "materialId and quantity are required." });
  }

  const material = store.materials.find(m => m.id === materialId);
  if (!material) {
    return res.status(404).json({ success: false, message: "Material not found." });
  }

  store.counters.pr++;
  const id = `PR-${String(store.counters.pr).padStart(4, "0")}`;

  const pr = {
    id,
    materialId: material.id,
    materialName: material.name,
    quantity: parseInt(quantity),
    unit: material.unit,
    status: "Pending",
    remarks: remarks?.trim() || "",
    createdAt: new Date().toISOString()
  };

  store.purchaseRequisitions.push(pr);
  res.status(201).json({ success: true, message: "Purchase Requisition created.", data: pr });
});

// PUT /prs/:id/cancel - Cancel a PR
router.put("/:id/cancel", (req, res) => {
  const pr = store.purchaseRequisitions.find(p => p.id === req.params.id);
  if (!pr) return res.status(404).json({ success: false, message: "PR not found." });
  if (pr.status !== "Pending") return res.status(400).json({ success: false, message: `PR is already ${pr.status}.` });

  pr.status = "Cancelled";
  res.json({ success: true, message: "PR cancelled.", data: pr });
});

module.exports = router;
