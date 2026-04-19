// data/store.js - In-memory data store simulating SAP Material Master, PR, PO

const store = {
  materials: [
    { id: "MAT-001", name: "Paracetamol 500mg", quantity: 50, threshold: 100, unit: "Strips", createdAt: new Date().toISOString() },
    { id: "MAT-002", name: "Amoxicillin 250mg", quantity: 20, threshold: 80, unit: "Capsules", createdAt: new Date().toISOString() },
    { id: "MAT-003", name: "Surgical Gloves (L)", quantity: 200, threshold: 150, unit: "Pairs", createdAt: new Date().toISOString() },
    { id: "MAT-004", name: "Saline Solution 500ml", quantity: 30, threshold: 60, unit: "Bottles", createdAt: new Date().toISOString() },
  ],
  purchaseRequisitions: [],
  purchaseOrders: [],
  counters: { mat: 4, pr: 0, po: 0 }
};

module.exports = store;
