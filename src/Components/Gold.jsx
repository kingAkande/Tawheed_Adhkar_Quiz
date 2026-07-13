import React, { useState, useEffect, useMemo } from "react";

// --- CONFIGURATION & CONSTANTS ---
const PURITY_MULTIPLIERS = {
  "24k": 1.0,
  "22k": 0.916,
  "18k": 0.75,
  "14k": 0.583,
  "10k": 0.417,
};

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "24K Investment Bullion Bar",
    weightGrams: 31.103,
    purity: "24k",
    premiumMarkup: 85.0,
    category: "Bullion",
    image: "https://images.unsplash.com/photo-1610375229632-c7158c35a537?w=400",
  },
  {
    id: 2,
    name: "Solid 18K Yellow Gold Cuban Link Chain",
    weightGrams: 55.4,
    purity: "18k",
    premiumMarkup: 299.0,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
  },
  {
    id: 3,
    name: "Classic 14K Diamond Wedding Band",
    weightGrams: 6.2,
    purity: "14k",
    premiumMarkup: 175.0,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
  },
  {
    id: 4,
    name: "22K Sovereign Heritage Coin",
    weightGrams: 7.98,
    purity: "22k",
    premiumMarkup: 120.0,
    category: "Coins",
    image: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=400",
  },
  {
    id: 5,
    name: "10K Lightweight Rope Bracelet",
    weightGrams: 12.5,
    purity: "10k",
    premiumMarkup: 95.0,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
  },
  {
    id: 6,
    name: "Pure 24K Cast Gold Grain (1 oz)",
    weightGrams: 31.103,
    purity: "24k",
    premiumMarkup: 60.0,
    category: "Bullion",
    image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=400",
  },
];

const calculateItemPrice = (spotPrice, weight, purity, markup) => {
  const purityFactor = PURITY_MULTIPLIERS[purity.toLowerCase()] || 1.0;
  return spotPrice * purityFactor * weight + markup;
};

export default function Gold() {
  // --- APPLICATION STATES ---
  const [spotPrice, setSpotPrice] = useState(78.5);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // --- LIVE MARKET SIMULATION ---
  useEffect(() => {
    const marketInterval = setInterval(() => {
      setSpotPrice((prevPrice) => {
        const drift = Math.random() * 0.3 - 0.15;
        return Math.max(50, prevPrice + drift);
      });
    }, 6000);
    return () => clearInterval(marketInterval);
  }, []);

  // --- ACTIONS ---
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const clearCart = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    alert(
      "Order Received Securely. Bank Wire instructions have been routed to your verification terminal.",
    );
  };

  // --- COMPUTED PROPERTIES ---
  const processedProducts = useMemo(() => {
    return INITIAL_PRODUCTS.map((prod) => ({
      ...prod,
      currentPrice: calculateItemPrice(
        spotPrice,
        prod.weightGrams,
        prod.purity,
        prod.premiumMarkup,
      ),
    })).filter((prod) => {
      const matchesSearch = prod.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || prod.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [spotPrice, searchQuery, selectedCategory]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const currentFreshPrice = calculateItemPrice(
        spotPrice,
        item.weightGrams,
        item.purity,
        item.premiumMarkup,
      );
      return sum + currentFreshPrice * item.quantity;
    }, 0);
  }, [cart, spotPrice]);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500/30 selection:text-amber-400">
      {/* HEADER BAR */}
      <header className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 md:px-10 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur sticky top-0 z-40 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl text-amber-500">⚜</span>
          <h1 className="text-xl font-extrabold tracking-widest text-white">
            AURUM<span className="text-amber-500">VAULT</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 bg-zinc-800/80 px-4 py-2 rounded-full border border-zinc-700 text-sm shadow-inner">
          <div className="w-2 height h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
          <span>
            LIVE 24K SPOT:{" "}
            <strong className="text-amber-400">
              ${spotPrice.toFixed(2)}/g
            </strong>
          </span>
        </div>

        <button
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition duration-200 active:scale-95 shadow-lg shadow-amber-500/10"
          onClick={() => setIsCartOpen(true)}
        >
          <span>🛒</span> Cart ({cartCount})
        </button>
      </header>

      {/* FILTER & CONTROL SUBBAR */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center px-6 py-6 md:px-10 gap-4">
        <input
          type="text"
          placeholder="Search inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 outline-none px-4 py-2.5 text-white rounded-lg w-full md:w-80 transition"
        />
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
          {["All", "Bullion", "Jewelry", "Coins"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`border-none px-4 py-2 rounded-md font-medium text-sm transition ${
                selectedCategory === cat
                  ? "bg-amber-500 text-black font-semibold"
                  : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID MESH */}
      <main className="px-6 md:px-10 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900/40 rounded-xl overflow-hidden border border-zinc-900 hover:border-zinc-800 transition-all duration-300 flex flex-col group shadow-md"
            >
              <div className="relative h-56 bg-zinc-950 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <span className="absolute top-3 right-3 bg-zinc-950/90 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded font-bold text-xs tracking-wider">
                  {product.purity.toUpperCase()}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-white tracking-wide mb-2 line-clamp-1 group-hover:text-amber-400 transition">
                  {product.name}
                </h3>
                <div className="flex justify-between text-zinc-500 text-xs font-medium mb-5">
                  <span>Weight: {product.weightGrams}g</span>
                  <span>Allocation: {product.category}</span>
                </div>
                <div className="flex justify-between items-center bg-zinc-900 p-3.5 rounded-lg border border-zinc-800/50 mb-4">
                  <span className="text-xs text-zinc-400 font-medium">
                    Lock-in Valuation:
                  </span>
                  <span className="text-xl font-bold text-amber-400">
                    $
                    {product.currentPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <button
                  className="w-full bg-zinc-100 hover:bg-white text-zinc-950 py-3 rounded-lg font-bold transition duration-200 active:scale-[0.99] mt-auto text-sm tracking-wide shadow-sm"
                  onClick={() => addToCart(product)}
                >
                  Allocate to Vault
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* COMPONENT DRAWER: SHOPPING CART */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex justify-end animate-fadeIn"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-full max-w-md bg-zinc-900 h-full p-6 md:p-8 flex flex-col shadow-2xl border-l border-zinc-800 transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
              <h2 className="text-xl font-bold tracking-wide text-white">
                Vault Custody Holdings
              </h2>
              <button
                className="text-zinc-500 hover:text-zinc-300 text-xl cursor-pointer"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-4 pr-1">
              {cart.length === 0 ? (
                <p className="text-zinc-600 text-center mt-12 text-sm font-medium">
                  No precious metals currently held in escrow.
                </p>
              ) : (
                cart.map((item) => {
                  const currentDynamicPrice = calculateItemPrice(
                    spotPrice,
                    item.weightGrams,
                    item.purity,
                    item.premiumMarkup,
                  );
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-4 border-b border-zinc-800/60 gap-4"
                    >
                      <div className="flex-grow">
                        <h4 className="text-sm font-medium text-zinc-200 line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="text-xs text-zinc-500 font-semibold tracking-wider uppercase">
                          {item.purity} · {item.weightGrams}g
                        </span>
                        <div className="text-amber-400 font-bold text-sm mt-1">
                          $
                          {(currentDynamicPrice * item.quantity).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            },
                          )}
                        </div>
                      </div>
                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-md p-1">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="text-zinc-400 hover:text-white px-2 py-0.5 text-sm font-bold"
                        >
                          -
                        </button>
                        <span className="text-sm px-2 font-medium text-zinc-200 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="text-zinc-400 hover:text-white px-2 py-0.5 text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-zinc-800 pt-5 mt-4">
                <div className="flex justify-between items-center text-sm md:text-base mb-2">
                  <span className="text-zinc-400 font-medium">
                    Aggregated Valuation:
                  </span>
                  <strong className="text-xl font-black text-amber-400">
                    $
                    {cartTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </div>
                <p className="text-[10px] text-zinc-500 leading-normal mb-5">
                  * Dynamic valuation is tethered to global spot prices. Order
                  locking occurs at the exact timestamp of settlement dispatch.
                </p>
                <button
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black py-3.5 rounded-lg font-bold transition text-sm tracking-wide shadow-lg shadow-amber-500/5"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  Proceed to Secure Escrow Lock
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMPONENT MODAL: SECURE CHECKOUT / KYC COMPLIANCE */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/85 z-50 flex justify-center items-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-xl max-w-lg w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white tracking-wide">
              Institutional Compliance Settle
            </h3>
            <p className="text-xs text-zinc-400 line-clamp-3 mt-2 mb-5 leading-relaxed">
              Pursuant to anti-money laundering (AML) statutes regarding
              physical precious metals, high-tier allocations must execute via
              bank wire or secure corporate liquidity channels.
            </p>

            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 flex justify-between items-center mb-5">
              <span className="text-xs text-zinc-400 font-medium">
                Locked Execution Value:
              </span>
              <div className="text-2xl font-black text-amber-400">
                $
                {cartTotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                  Legal Entity / Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500/40 outline-none p-3 rounded-lg text-white text-sm transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                  Government ID / Passport Issuing Serial
                </label>
                <input
                  type="text"
                  placeholder="ID-000000"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500/40 outline-none p-3 rounded-lg text-white text-sm transition"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                className="flex-1 bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 py-3 rounded-lg text-sm font-semibold transition"
                onClick={() => setIsCheckoutOpen(false)}
              >
                Abort Allocation
              </button>
              <button
                className="flex-[2] bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg text-sm font-bold shadow-lg shadow-emerald-600/10 transition"
                onClick={clearCart}
              >
                Confirm Wire Lock & Execute
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
