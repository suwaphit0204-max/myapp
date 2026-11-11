
"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "อาหารแมวรสปลาแซลมอน",
    description: "อาหารแมวสูตรบำรุงขน",
    price: 159,
    image: "🐟",
    category: "อาหารเม็ด",
  },
  {
    id: 2,
    name: "อาหารแมวรสไก่",
    description: "โปรตีนสูงสำหรับแมว",
    price: 129,
    image: "🍗",
    category: "อาหารเม็ด",
  },
  {
    id: 3,
    name: "อาหารเปียกรสทูน่า",
    description: "เนื้อนุ่ม อร่อยถูกใจ",
    price: 35,
    image: "🐠",
    category: "อาหารเปียก",
  },
  {
    id: 4,
    name: "ขนมแมวเลีย",
    description: "ขนมสำหรับแมวทุกวัย",
    price: 49,
    image: "🥫",
    category: "ขนมแมว",
  },
];

export default function Home() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState<Product>(products[0]);
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [qty, setQty] = useState(1);
  const [category, setCategory] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState("โอนเงินผ่านธนาคาร");
  const [success, setSuccess] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const addToCart = () => {
    setCart((old) => {
      const found = old.find((item) => item.product.id === selected.id);

      if (found) {
        return old.map((item) =>
          item.product.id === selected.id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }

      return [...old, { product: selected, qty }];
    });

    setPage("cart");
  };

  const changeQty = (id: number, amount: number) => {
    setCart((old) =>
      old
        .map((item) =>
          item.product.id === id
            ? { ...item, qty: item.qty + amount }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const openProduct = (product: Product) => {
    setSelected(product);
    setQty(1);
    setPage("detail");
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      category === "ทั้งหมด" || p.category === category;
    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[#f5f2f3] flex justify-center">
      <div className="w-full max-w-[390px] min-h-screen bg-[#fff8fb] relative shadow-xl overflow-hidden">

        {/* HEADER */}
        <header className="h-[65px] px-5 flex items-center justify-between bg-white border-b border-pink-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐱</span>
            <h1 className="text-xl font-black text-[#d96d9b]">
              Meowly
            </h1>
          </div>

          <button
            onClick={() => setPage("cart")}
            className="relative text-xl"
          >
            🛒
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
              {cart.reduce((s, i) => s + i.qty, 0)}
            </span>
          </button>
        </header>

        {/* HOME PAGE */}
        {page === "home" && (
          <div className="px-4 pt-4 pb-24">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍  ค้นหาอาหารแมวที่คุณต้องการ..."
              className="w-full p-3 rounded-full bg-white border border-pink-100 outline-none text-sm focus:border-pink-400"
            />

            <div className="mt-4 rounded-2xl bg-[#f8d6e4] p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#a44c73]">
                  Welcome to Meowly 🐾
                </p>
                <h2 className="font-bold text-[#853d60] text-lg mt-1">
                  เติมความสุขให้เจ้าเหมียว
                </h2>
                <p className="text-xs text-[#a44c73] mt-1">
                  อาหารดี ๆ สำหรับแมวที่คุณรัก
                </p>
                <span className="inline-block mt-3 bg-white text-pink-500 rounded-full px-4 py-1 text-xs">
                  เลือกซื้อสินค้า
                </span>
              </div>
              <div className="text-6xl">😺</div>
            </div>

            <div className="flex gap-2 mt-5 overflow-x-auto pb-2">
              {["ทั้งหมด", "อาหารเม็ด", "อาหารเปียก", "ขนมแมว"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`shrink-0 px-4 py-2 rounded-full text-xs ${
                      category === item
                        ? "bg-[#e78bb1] text-white"
                        : "bg-white text-gray-500 border border-pink-100"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <div className="flex justify-between items-center mt-4 mb-3">
              <h2 className="font-bold text-gray-800">
                สินค้าแนะนำ
              </h2>
              <span className="text-xs text-pink-400">
                ดูสินค้าทั้งหมด
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => openProduct(product)}
                  className="text-left bg-white rounded-2xl p-2 border border-pink-100 shadow-sm"
                >
                  <div className="h-[115px] rounded-xl bg-[#f9dce8] flex items-center justify-center text-6xl">
                    {product.image}
                  </div>
                  <p className="font-bold text-sm mt-2 text-gray-700">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-pink-500 font-bold">
                      ฿{product.price}
                    </span>
                    <span className="bg-pink-100 text-pink-500 rounded-full w-7 h-7 flex items-center justify-center">
                      +
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-400 mt-10">
                ไม่พบสินค้าที่ค้นหา 🐱
              </p>
            )}
          </div>
        )}

        {/* PRODUCT DETAIL */}
        {page === "detail" && (
          <div className="px-4 pt-4 pb-24">
            <button
              onClick={() => setPage("home")}
              className="text-gray-500 text-sm mb-4"
            >
              ← กลับหน้าหลัก
            </button>

            <div className="bg-[#f9dce8] rounded-3xl h-[280px] flex items-center justify-center text-[110px]">
              {selected.image}
            </div>

            <div className="mt-5">
              <h2 className="text-xl font-bold text-gray-800">
                {selected.name}
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                {selected.description}
              </p>
              <p className="text-2xl font-bold text-pink-500 mt-3">
                ฿{selected.price}
              </p>

              <hr className="my-5 border-pink-100" />

              <h3 className="font-bold text-gray-700">
                รายละเอียดสินค้า
              </h3>
              <p className="text-sm text-gray-500 mt-2 leading-7">
                ผลิตภัณฑ์อาหารสำหรับแมว คัดสรรวัตถุดิบ
                ที่เหมาะสำหรับสัตว์เลี้ยง
                เพื่อให้แมวของคุณได้รับสารอาหารที่ดี
              </p>

              <div className="flex items-center justify-between mt-6">
                <span className="font-bold text-gray-700">
                  จำนวนสินค้า
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-8 h-8 rounded-full bg-pink-100 text-pink-600"
                  >
                    -
                  </button>
                  <span>{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-8 h-8 rounded-full bg-pink-100 text-pink-600"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={addToCart}
              className="w-full mt-8 bg-[#e889ae] text-white py-3 rounded-full font-bold"
            >
              เพิ่มลงตะกร้า · ฿{selected.price * qty}
            </button>
          </div>
        )}

        {/* CART PAGE */}
        {page === "cart" && (
          <div className="px-4 pt-5 pb-24">
            <h2 className="font-bold text-xl text-gray-800 mb-5">
              🛒 ตะกร้าสินค้า
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl">🛍️</div>
                <p className="text-gray-400 mt-4">
                  ยังไม่มีสินค้าในตะกร้า
                </p>
                <button
                  onClick={() => setPage("home")}
                  className="mt-5 bg-pink-400 text-white px-6 py-2 rounded-full"
                >
                  เลือกซื้อสินค้า
                </button>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-2xl p-3 mb-3 flex gap-3 border border-pink-100"
                  >
                    <div className="w-20 h-20 bg-pink-100 rounded-xl flex items-center justify-center text-4xl">
                      {item.product.image}
                    </div>

                    <div className="flex-1">
                      <p className="font-bold text-sm text-gray-700">
                        {item.product.name}
                      </p>
                      <p className="text-pink-500 font-bold mt-1">
                        ฿{item.product.price * item.qty}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            changeQty(item.product.id, -1)
                          }
                          className="bg-pink-100 rounded-full w-6 h-6"
                        >
                          -
                        </button>
                        <span className="text-sm">{item.qty}</span>
                        <button
                          onClick={() =>
                            changeQty(item.product.id, 1)
                          }
                          className="bg-pink-100 rounded-full w-6 h-6"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-white rounded-2xl p-4 mt-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">รวมสินค้า</span>
                    <span>฿{total}</span>
                  </div>
                  <div className="flex justify-between font-bold mt-4">
                    <span>ยอดรวมทั้งหมด</span>
                    <span className="text-pink-500">฿{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => setPage("payment")}
                  className="w-full mt-5 bg-[#e889ae] text-white py-3 rounded-full font-bold"
                >
                  ดำเนินการชำระเงิน
                </button>
              </>
            )}
          </div>
        )}

        {/* PAYMENT PAGE */}
        {page === "payment" && (
          <div className="px-4 pt-5 pb-24">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              ชำระเงิน
            </h2>

            {success ? (
              <div className="text-center py-20">
                <div className="text-7xl">💗</div>
                <h2 className="text-xl font-bold text-pink-500 mt-5">
                  สั่งซื้อสำเร็จ!
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  ขอบคุณที่ใช้บริการ Meowly
                </p>
                <button
                  onClick={() => {
                    setCart([]);
                    setSuccess(false);
                    setPage("home");
                  }}
                  className="mt-6 bg-pink-400 text-white px-8 py-3 rounded-full"
                >
                  กลับหน้าหลัก
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-2xl p-4 mb-4 border border-pink-100">
                  <div className="text-center py-4">
                    <div className="text-4xl">🐱</div>
                    <h3 className="font-bold mt-2">
                      สรุปคำสั่งซื้อ
                    </h3>
                    <p className="text-pink-500 text-2xl font-bold mt-2">
                      ฿{total}
                    </p>
                  </div>
                </div>

                <h3 className="font-bold text-gray-700 mb-3">
                  เลือกวิธีชำระเงิน
                </h3>

                {[
                  "โอนเงินผ่านธนาคาร",
                  "ชำระเงินปลายทาง",
                  "พร้อมเพย์",
                ].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPayment(method)}
                    className={`w-full flex items-center justify-between bg-white p-4 rounded-xl mb-3 border ${
                      payment === method
                        ? "border-pink-400"
                        : "border-pink-100"
                    }`}
                  >
                    <span className="text-sm text-gray-700">
                      💳 {method}
                    </span>
                    <span className="text-pink-500">
                      {payment === method ? "🔘" : "⚪"}
                    </span>
                  </button>
                ))}

                <div className="bg-white rounded-2xl p-4 mt-5">
                  <div className="flex justify-between text-sm">
                    <span>ค่าสินค้า</span>
                    <span>฿{total}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-3">
                    <span>ค่าจัดส่ง</span>
                    <span>ฟรี</span>
                  </div>
                  <hr className="my-4 border-pink-100" />
                  <div className="flex justify-between font-bold">
                    <span>ยอดชำระทั้งหมด</span>
                    <span className="text-pink-500">฿{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSuccess(true)}
                  disabled={cart.length === 0}
                  className="w-full mt-6 bg-[#e889ae] text-white py-3 rounded-full font-bold disabled:opacity-40"
                >
                  ยืนยันการสั่งซื้อ
                </button>
              </>
            )}
          </div>
        )}

        {/* BOTTOM NAVIGATION */}
        <nav className="fixed bottom-0 w-full max-w-[390px] h-[65px] bg-white border-t border-pink-100 flex items-center justify-around z-10">
          <button
            onClick={() => setPage("home")}
            className={`flex flex-col items-center text-xs ${
              page === "home" ? "text-pink-500" : "text-gray-400"
            }`}
          >
            <span className="text-xl">⌂</span>
            หน้าแรก
          </button>

          <button
            onClick={() => setPage("home")}
            className="flex flex-col items-center text-xs text-gray-400"
          >
            <span className="text-xl">▦</span>
            สินค้า
          </button>

          <button
            onClick={() => setPage("cart")}
            className={`flex flex-col items-center text-xs ${
              page === "cart" ? "text-pink-500" : "text-gray-400"
            }`}
          >
            <span className="text-xl">🛒</span>
            ตะกร้า
          </button>

          <button
            onClick={() => setPage("payment")}
            className={`flex flex-col items-center text-xs ${
              page === "payment" ? "text-pink-500" : "text-gray-400"
            }`}
          >
            <span className="text-xl">♙</span>
            ชำระเงิน
          </button>
        </nav>

      </div>
    </main>
  );
}
