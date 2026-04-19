// routes/orders.js
const express = require("express");
const router = express.Router();
const store = require("../data/store");

// GET /orders - List all Purchase Orders
router.get("/", (req, res) => {
  res.json({ success: true, data: store.purchaseOrders });
});

// POST /create-po - Convert PR to PO
router.post("/create", (req, res) => {
  const { prId, supplierName, unitPrice, deliveryDate } = req.body;

  if (!prId || !supplierName) {
    return res.status(400).json({ success: false, message: "prId and supplierName are required." });
  }

  const pr = store.purchaseRequisitions.find(p => p.id === prId);
  if (!pr) return res.status(404).json({ success: false, message: "PR not found." });
  if (pr.status !== "Pending") return res.status(400).json({ success: false, message: `PR is already ${pr.status}. Cannot convert.` });

  store.counters.po++;
  const id = `PO-${String(store.counters.po).padStart(4, "0")}`;

  const po = {
    id,
    prId: pr.id,
    materialId: pr.materialId,
    materialName: pr.materialName,
    quantity: pr.quantity,
    unit: pr.unit,
    supplierName: supplierName.trim(),
    unitPrice: parseFloat(unitPrice) || 0,
    totalValue: (parseFloat(unitPrice) || 0) * pr.quantity,
    deliveryDate: deliveryDate || null,
    status: "Ordered",
    createdAt: new Date().toISOString()
  };

  store.purchaseOrders.push(po);

  // Update PR status to Approved/Converted
  pr.status = "Converted";

  res.status(201).json({ success: true, message: "Purchase Order created.", data: po });
});

// PUT /orders/:id/receive - Mark PO as Goods Received (GRN)
router.put("/:id/receive", (req, res) => {
  const po = store.purchaseOrders.find(o => o.id === req.params.id);
  if (!po) return res.status(404).json({ success: false, message: "PO not found." });
  if (po.status !== "Ordered") return res.status(400).json({ success: false, message: `PO is already ${po.status}.` });

  // Update inventory
  const material = store.materials.find(m => m.id === po.materialId);
  if (material) {
    material.quantity += po.quantity;
  }

  po.status = "Goods Received";
  po.receivedAt = new Date().toISOString();

  res.json({ success: true, message: "Goods received. Inventory updated.", data: po });
});

module.exports = router;
