// server.js - Mini SAP P2P Application Server
const express = require("express");
const cors = require("cors");
const path = require("path");

const materialsRouter = require("./routes/materials");
const requisitionsRouter = require("./routes/requisitions");
const ordersRouter = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Routes - SAP P2P Endpoints
app.use("/materials", materialsRouter);
app.use("/prs", requisitionsRouter);
app.use("/orders", ordersRouter);

// Legacy endpoints for compatibility with PRD spec
app.post("/add-material", (req, res) => {
  req.url = "/add";
  materialsRouter(req, res, () => {});
});
app.post("/create-pr", (req, res) => {
  req.url = "/create";
  requisitionsRouter(req, res, () => {});
});
app.post("/create-po", (req, res) => {
  req.url = "/create";
  ordersRouter(req, res, () => {});
});

// Health check / dashboard stats
app.get("/api/stats", (req, res) => {
  const store = require("./data/store");
  const lowStock = store.materials.filter(m => m.quantity < m.threshold);
  res.json({
    totalMaterials: store.materials.length,
    lowStockCount: lowStock.length,
    pendingPRs: store.purchaseRequisitions.filter(p => p.status === "Pending").length,
    activeOrders: store.purchaseOrders.filter(o => o.status === "Ordered").length,
    totalPRs: store.purchaseRequisitions.length,
    totalPOs: store.purchaseOrders.length
  });
});

// Serve frontend for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n🚀 Mini SAP P2P running at http://localhost:${PORT}`);
  console.log(`📦 Material Management: http://localhost:${PORT}/materials`);
  console.log(`📋 Purchase Requisitions: http://localhost:${PORT}/prs`);
  console.log(`🛒 Purchase Orders: http://localhost:${PORT}/orders`);
  console.log(`\nPress Ctrl+C to stop.\n`);
});

module.exports = app;
