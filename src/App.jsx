import React, { useMemo, useState } from "react";
import {
  Store, Package, ShoppingCart, FileText, ShieldCheck, Camera, Image as ImageIcon,
  ScanLine, AlertTriangle, Receipt, Euro, Boxes, Users, CreditCard, Building2,
  CheckCircle2, ArrowUpRight
} from "lucide-react";

const company = {
  name: "Boutique Demo Norte",
  taxId: "B12345678",
  billingModel: "Híbrido",
  barcodeMode: "Mixto: internos + externos",
  channels: ["Tienda física", "WhatsApp", "Instagram", "Link de pago"],
  valueProps: [
    "Control total del producto desde la entrada hasta la venta",
    "Ventas en tienda física y a distancia desde un solo sistema",
    "Facturación, cobros e inventario conectados en tiempo real",
    "Preparado para crecer y venderse a otras tiendas",
  ],
};

const stats = [
  { label: "Ventas hoy", value: "1.248,50 €", icon: Euro },
  { label: "Tickets/facturas", value: "18", icon: Receipt },
  { label: "Stock bajo", value: "7", icon: AlertTriangle },
  { label: "Pedidos compra", value: "3", icon: Boxes },
];

const products = [
  {
    id: "P-001",
    name: "Blazer mujer beige",
    category: "Mujer",
    sku: "MUJ-BLA-BEI",
    gtin: "8437000012345",
    mode: "Interno + externo",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80",
    variants: [
      { color: "Beige", size: "S", stock: 4, cost: "24,00 €", price: "49,90 €" },
      { color: "Beige", size: "M", stock: 2, cost: "24,00 €", price: "49,90 €" },
    ],
  },
  {
    id: "P-002",
    name: "Collar perro cuero",
    category: "Perro",
    sku: "PER-COL-CUE",
    gtin: null,
    mode: "Solo interno",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
    variants: [
      { color: "Marrón", size: "M", stock: 12, cost: "6,20 €", price: "16,90 €" },
      { color: "Negro", size: "L", stock: 9, cost: "6,20 €", price: "16,90 €" },
    ],
  },
  {
    id: "P-003",
    name: "Pulsera acero antialérgico",
    category: "Joyería",
    sku: "JOY-PUL-ACE",
    gtin: "8437000099998",
    mode: "Interno + externo",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
    variants: [
      { color: "Plata", size: "Única", stock: 15, cost: "3,80 €", price: "14,90 €" },
    ],
  },
];

const purchases = [
  { date: "10/04/2026", supplier: "Moda Global S.L.", ref: "COMP-2026-0012", items: 14, total: "356,00 €", status: "Recibida" },
  { date: "09/04/2026", supplier: "Pet Style Import", ref: "COMP-2026-0011", items: 6, total: "98,40 €", status: "Pendiente" },
];

const sales = [
  { ref: "POS-2026-0042", customer: "Ana Gómez", channel: "Tienda física", payment: "Tarjeta", total: "49,90 €", invoice: "TIC-2026-0102", status: "Pagada" },
  { ref: "WEB-2026-0017", customer: "Lucía P.", channel: "Link de pago", payment: "Stripe", total: "31,80 €", invoice: "FAC-2026-0048", status: "Pagada" },
  { ref: "IG-2026-0009", customer: "David R.", channel: "Instagram", payment: "Pendiente", total: "16,90 €", invoice: "BORRADOR", status: "Pendiente" },
];

const invoices = [
  { number: "FAC-2026-0048", type: "Factura completa", customer: "Lucía P.", total: "31,80 €", payment: "Pagada", source: "Link de pago" },
  { number: "TIC-2026-0102", type: "Ticket", customer: "Ana Gómez", total: "49,90 €", payment: "Pagada", source: "TPV" },
  { number: "REC-2026-0003", type: "Rectificativa", customer: "Carlos M.", total: "-14,90 €", payment: "Reembolsada", source: "Devolución" },
];

const logs = [
  "Admin tienda creó el producto 'Blazer mujer beige' y subió 3 imágenes.",
  "Empleado ventas emitió el ticket TIC-2026-0102 y descontó stock de la variante Beige/M.",
  "Superadmin activó el modo de códigos mixto para Boutique Demo Norte.",
  "Empleado almacén registró la compra COMP-2026-0012 y aumentó stock automáticamente.",
  "Admin tienda generó el enlace de pago de la venta WEB-2026-0017.",
];

const implementationSteps = [
  { title: "1. Activación de tienda", text: "Se crea la tienda, usuarios, configuración fiscal y modelo de cobro en una base ya preparada." },
  { title: "2. Carga inicial", text: "Se importan productos, variantes, imágenes, stock y clientes desde plantillas simples." },
  { title: "3. Ajuste operativo", text: "Se definen series de facturación, tipos de código, métodos de pago y permisos por empleado." },
  { title: "4. Puesta en marcha", text: "La tienda empieza a vender desde móvil u ordenador con soporte para TPV, enlace de pago e inventario." },
];

function Badge({ children, variant = "default" }) {
  return <span className={`badge ${variant}`}>{children}</span>;
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="stat-card">
      <div className="icon-wrap"><Icon size={20} /></div>
      <div>
        <div className="muted small up">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
    </Card>
  );
}

function DataTable({ headers, rows, renderRow }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>{rows.map(renderRow)}</tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase().trim();
    return products.filter((p) =>
      [p.name, p.category, p.sku, p.gtin || "", p.mode].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  const tabs = [
    ["dashboard", "Resumen"],
    ["catalog", "Catálogo"],
    ["inventory", "Inventario"],
    ["purchases", "Compras"],
    ["sales", "Ventas"],
    ["billing", "Facturación"],
    ["admin", "Admin tienda"],
    ["owner", "Implantación"],
  ];

  return (
    <div className="page">
      <div className="container">
        <div className="alert">
          <AlertTriangle size={18} />
          <div>
            <div className="alert-title">DEMO VISUAL DE EJEMPLO</div>
            <div className="alert-text">
              Esta pantalla es una muestra ficticia para presentar la plataforma V1. Los datos, importes, clientes,
              facturas e imágenes son de ejemplo y sirven solo para enseñar cómo funcionaría una tienda ya operativa.
            </div>
          </div>
        </div>

        <Card className="hero">
          <div className="hero-main">
            <div>
              <div className="muted row gap"><Store size={16} /> Plataforma SaaS Retail · Demo comercial</div>
              <h1>{company.name}</h1>
              <p className="lead">
                Demo comercial lista para presentar a clientes: muestra cómo una tienda puede controlar inventario,
                ventas, cobros, facturación e imágenes desde el primer día.
              </p>
              <div className="badges">
                <Badge>{company.billingModel}</Badge>
                <Badge>{company.barcodeMode}</Badge>
                {company.channels.map((channel) => <Badge key={channel} variant="outline">{channel}</Badge>)}
              </div>
              <div className="value-grid">
                {company.valueProps.map((item) => <div key={item} className="value-item">{item}</div>)}
              </div>
            </div>
            <div className="stats-grid">
              {stats.map((s) => <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} />)}
            </div>
          </div>
        </Card>

        <div className="tabbar">
          {tabs.map(([value, label]) => (
            <button
              key={value}
              className={`tab ${tab === value ? "active" : ""}`}
              onClick={() => setTab(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && (
          <div className="grid two-one">
            <Card>
              <h2>Qué resuelve esta plataforma</h2>
              <div className="feature-grid">
                {[
                  [Package, "Inventario visible", "Cada producto se sigue desde la compra hasta la venta"],
                  [ShoppingCart, "Venta rápida", "Tienda física, redes y link de pago en el mismo flujo"],
                  [FileText, "Facturación integrada", "Ticket, factura y rectificativa conectados al cobro"],
                  [ShieldCheck, "Control sin errores", "Auditoría, stock validado y actualizaciones seguras"],
                ].map(([Icon, title, sub]) => (
                  <div key={title} className="feature-item">
                    <Icon size={20} />
                    <div className="feature-title">{title}</div>
                    <div className="muted">{sub}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h2>Impacto visible en la tienda</h2>
              <div className="stack">
                <div className="note success">Menos errores al vender gracias a imagen, variante y stock en tiempo real.</div>
                <div className="note">Más velocidad al cobrar y emitir documentos desde una sola pantalla.</div>
                <div className="note warn">Posibilidad de trabajar con códigos internos o con códigos externos por tienda.</div>
              </div>
            </Card>
          </div>
        )}

        {tab === "catalog" && (
          <Card>
            <div className="row between wrap gap">
              <div>
                <h2>Catálogo de productos</h2>
                <p className="muted">Ejemplo con imagen, variantes, SKU interno y GTIN/EAN opcional por tienda.</p>
              </div>
              <input
                className="input"
                placeholder="Buscar por nombre, SKU, EAN o categoría"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-body">
                    <div className="row between gap start">
                      <div>
                        <div className="feature-title">{product.name}</div>
                        <div className="muted">{product.category}</div>
                      </div>
                      <Badge variant="outline">{product.mode}</Badge>
                    </div>
                    <div className="meta">
                      <div><strong>SKU:</strong> {product.sku}</div>
                      <div><strong>GTIN/EAN:</strong> {product.gtin || "No asignado"}</div>
                    </div>
                    <div className="variant-box">
                      {product.variants.map((variant, i) => (
                        <div className="variant-row" key={i}>
                          <div>
                            <div className="feature-title tiny">{variant.color} · {variant.size}</div>
                            <div className="muted">Coste {variant.cost} · Venta {variant.price}</div>
                          </div>
                          <Badge variant={variant.stock <= 3 ? "danger" : "default"}>Stock {variant.stock}</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="row wrap gap">
                      <button className="btn"><ImageIcon size={16} /> Ver imágenes</button>
                      <button className="btn secondary"><Camera size={16} /> Añadir foto</button>
                      <button className="btn secondary"><ScanLine size={16} /> Imprimir etiqueta</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === "inventory" && (
          <Card>
            <h2>Inventario y movimientos</h2>
            <DataTable
              headers={["Producto", "Variante", "Stock", "Último movimiento", "Estado"]}
              rows={[
                ["Blazer mujer beige", "Beige / M", "2", "Venta POS-2026-0042", "Stock bajo"],
                ["Collar perro cuero", "Marrón / M", "12", "Compra COMP-2026-0012", "Correcto"],
                ["Pulsera acero antialérgico", "Plata / Única", "15", "Devolución REC-2026-0003", "Correcto"],
              ]}
              renderRow={(r, i) => (
                <tr key={i}>
                  <td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td>
                  <td><Badge variant={r[4] === "Stock bajo" ? "danger" : "default"}>{r[4]}</Badge></td>
                </tr>
              )}
            />
          </Card>
        )}

        {tab === "purchases" && (
          <Card>
            <h2>Compras y entrada de mercancía</h2>
            <DataTable
              headers={["Fecha", "Proveedor", "Referencia", "Artículos", "Total", "Estado"]}
              rows={purchases}
              renderRow={(purchase) => (
                <tr key={purchase.ref}>
                  <td>{purchase.date}</td>
                  <td>{purchase.supplier}</td>
                  <td>{purchase.ref}</td>
                  <td>{purchase.items}</td>
                  <td>{purchase.total}</td>
                  <td><Badge variant={purchase.status === "Recibida" ? "default" : "outline"}>{purchase.status}</Badge></td>
                </tr>
              )}
            />
          </Card>
        )}

        {tab === "sales" && (
          <div className="grid two-one">
            <Card>
              <h2>Ventas y TPV</h2>
              <DataTable
                headers={["Ref.", "Cliente", "Canal", "Pago", "Total", "Documento", "Estado"]}
                rows={sales}
                renderRow={(sale) => (
                  <tr key={sale.ref}>
                    <td>{sale.ref}</td>
                    <td>{sale.customer}</td>
                    <td>{sale.channel}</td>
                    <td>{sale.payment}</td>
                    <td>{sale.total}</td>
                    <td>{sale.invoice}</td>
                    <td><Badge variant={sale.status === "Pagada" ? "default" : "outline"}>{sale.status}</Badge></td>
                  </tr>
                )}
              />
            </Card>
            <Card>
              <h2>Venta rápida demo</h2>
              <div className="stack">
                <div className="boxed"><span className="muted">Producto</span><strong>Blazer mujer beige · M</strong></div>
                <div className="boxed"><span className="muted">Canal</span><strong>Tienda física</strong></div>
                <div className="boxed"><span className="muted">Cobro</span><strong>Tarjeta</strong></div>
                <div className="boxed"><span className="muted">Resultado automático</span><strong>Descuenta stock, genera ticket y registra pago</strong></div>
                <button className="btn wide"><ShoppingCart size={16} /> Simular venta</button>
              </div>
            </Card>
          </div>
        )}

        {tab === "billing" && (
          <div className="grid two-one">
            <Card>
              <h2>Facturación</h2>
              <DataTable
                headers={["Número", "Tipo", "Cliente", "Total", "Cobro", "Origen"]}
                rows={invoices}
                renderRow={(inv) => (
                  <tr key={inv.number}>
                    <td>{inv.number}</td>
                    <td>{inv.type}</td>
                    <td>{inv.customer}</td>
                    <td>{inv.total}</td>
                    <td><Badge variant={inv.payment === "Pagada" ? "default" : inv.payment === "Reembolsada" ? "outline" : "danger"}>{inv.payment}</Badge></td>
                    <td>{inv.source}</td>
                  </tr>
                )}
              />
            </Card>
            <Card>
              <h2>Enlace de pago demo</h2>
              <div className="stack">
                <div className="boxed">
                  <div className="feature-title tiny">Venta WEB-2026-0017</div>
                  <div className="muted">Cliente: Lucía P.</div>
                  <div className="muted">Importe: 31,80 €</div>
                </div>
                <div className="fake-link">https://demo.tienda/pago/WEB-2026-0017</div>
                <div className="note success">Pago confirmado · El sistema emite factura, marca cobro y deja trazabilidad.</div>
                <button className="btn secondary wide"><ArrowUpRight size={16} /> Copiar enlace</button>
              </div>
            </Card>
          </div>
        )}

        {tab === "admin" && (
          <div className="grid two-one">
            <Card>
              <h2>Configuración de la tienda</h2>
              <div className="stack">
                <div className="boxed"><strong>Razón social:</strong> {company.name}</div>
                <div className="boxed"><strong>NIF:</strong> {company.taxId}</div>
                <div className="boxed"><strong>Modelo de cobro:</strong> {company.billingModel}</div>
                <div className="boxed"><strong>Modo de códigos:</strong> La tienda puede elegir solo códigos internos o modo mixto con GTIN/EAN externo.</div>
              </div>
            </Card>
            <Card>
              <h2>Auditoría</h2>
              <div className="stack">
                {logs.map((log) => <div key={log} className="boxed">{log}</div>)}
              </div>
            </Card>
          </div>
        )}

        {tab === "owner" && (
          <div className="grid two-one">
            <Card>
              <h2>Implantación fácil para pasar de demo a tienda real</h2>
              <div className="stack">
                {implementationSteps.map((step) => (
                  <div key={step.title} className="boxed">
                    <div className="feature-title tiny">{step.title}</div>
                    <div className="muted">{step.text}</div>
                  </div>
                ))}
                <div className="note success"><CheckCircle2 size={16} /> La base está preparada para activar una tienda real sin rehacer el sistema.</div>
              </div>
            </Card>
            <Card>
              <h2>De la demo a una implantación real</h2>
              <div className="owner-grid">
                {[
                  "Multiempresa","Usuarios y permisos","Catálogo con variantes","Imágenes por archivo o foto",
                  "SKU interno","GTIN/EAN externo opcional","Compras y entradas","Inventario y alertas",
                  "Ventas TPV","Venta por enlace","Tickets y facturas","Rectificativas",
                  "Cobros manuales o automáticos","Auditoría","Panel superadmin","Responsive móvil y escritorio",
                ].map((item) => (
                  <div key={item} className="owner-item"><CheckCircle2 size={16} /> {item}</div>
                ))}
              </div>
              <div className="stack top">
                <div className="boxed row gap"><Building2 size={16} /> 12 tiendas activas</div>
                <div className="boxed row gap"><Users size={16} /> 38 usuarios registrados</div>
                <div className="boxed row gap"><CreditCard size={16} /> 4 tiendas con cobro manual</div>
                <div className="boxed row gap"><ShieldCheck size={16} /> Última actualización aplicada sin pérdida de datos</div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}