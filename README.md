# Mini SAP Procure-to-Pay (P2P) Web Application

A minimal web-based application simulating the SAP Procure-to-Pay (P2P) cycle, built using Node.js/Express with SAP BTP concepts.

---

## 🗂 Project Structure

```
mini-sap-p2p/
├── server.js              # Express server (entry point)
├── package.json
├── data/
│   └── store.js           # In-memory data store (SAP Material Master, PR, PO)
├── routes/
│   ├── materials.js       # Material management routes
│   ├── requisitions.js    # Purchase Requisition routes
│   └── orders.js          # Purchase Order routes
└── public/
    └── index.html         # Single-page frontend (HTML/CSS/JS)
```

---

## ⚙️ Setup & Run

### Prerequisites
- Node.js v16+ installed

### Install & Start

```bash
cd mini-sap-p2p
npm install
npm start
```

Open browser at: **http://localhost:3000**

---

## 🔄 SAP P2P Flow

```
Material Master → Purchase Requisition (PR) → Purchase Order (PO) → Goods Receipt (GRN)
```

1. **Add Material** — Create a material with name, quantity, unit, and reorder threshold
2. **Create PR** — Raise a Purchase Requisition for low-stock materials
3. **Convert PR → PO** — Issue a Purchase Order to a supplier
4. **Receive GRN** — Receive goods, auto-update inventory

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/materials` | List all materials |
| POST | `/materials/add` | Add new material |
| GET | `/prs` | List all Purchase Requisitions |
| POST | `/prs/create` | Create a new PR |
| PUT | `/prs/:id/cancel` | Cancel a PR |
| GET | `/orders` | List all Purchase Orders |
| POST | `/orders/create` | Convert PR to PO |
| PUT | `/orders/:id/receive` | Mark PO as Goods Received |
| GET | `/api/stats` | Dashboard statistics |

---

## 🗺️ SAP Mapping

| App Feature | SAP Equivalent |
|-------------|----------------|
| Material | Material Master (MM60) |
| Threshold | Reorder Point |
| PR | Purchase Requisition (ME51N) |
| PO | Purchase Order (ME21N) |
| GRN | Goods Receipt (MIGO) |

---

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JS (IBM Plex font family)
- **Backend**: Node.js + Express
- **Storage**: In-memory (JSON)
- **Architecture**: REST API + SPA

---

## 🚀 Future Enhancements

- SAP CAP (OData services) integration
- Real SAP BTP deployment
- Authentication (SAP XSUAA)
- AI-based demand prediction
- Expiry tracking system
- PDF invoice generation
