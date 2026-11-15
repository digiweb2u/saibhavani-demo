/* Sai Bhavani Tours & Travels – site script */
const PHONE = "918978059618";   // country code + number, no + or spaces
const wa = m => `https://wa.me/${PHONE}?text=${encodeURIComponent(m)}`;
const hi = "Hi Sai Bhavani Tours & Travels, ";

document.querySelectorAll(".js-call").forEach(a => a.href = `tel:+${PHONE}`);
document.querySelectorAll(".js-wa").forEach(a => {
  const d = a.dataset;
  const m = d.msg ? hi + d.msg : hi + "I'd like to book a vehicle.";
  a.href = wa(m); a.target = "_blank"; a.rel = "noopener";
});

/* mobile menu */
const burger = document.querySelector(".burger"), menu = document.querySelector(".menu");
if (burger) burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", open);
});

/* banner slider */
(() => {
  const b = document.querySelector(".banner"); if (!b) return;
  const slides = [...b.querySelectorAll(".slide")], dots = b.querySelector(".dots");
  let i = 0, t;
  const go = n => { i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("is-on", k === i));
    [...dots.children].forEach((d, k) => d.setAttribute("aria-current", k === i)); };
  slides.forEach((_, k) => { const d = document.createElement("button"); d.type = "button";
    d.setAttribute("aria-label", "Slide " + (k + 1)); d.onclick = () => { go(k); run(); }; dots.appendChild(d); });
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const run = () => { clearInterval(t); if (!still) t = setInterval(() => go(i + 1), 5500); };
  b.querySelector(".prev").onclick = () => { go(i - 1); run(); };
  b.querySelector(".next").onclick = () => { go(i + 1); run(); };
  b.onmouseenter = () => clearInterval(t); b.onmouseleave = run;
  go(0); run();
})();

/* route board */
(() => {
  const chips = document.getElementById("chips"); if (!chips) return;
  const routes = [
    {to:"Bengaluru Airport", km:150, hrs:"3", car:"Innova Crysta"},
    {to:"Bengaluru City", km:160, hrs:"3.5", car:"Rumion"},
    {to:"Tirupati", km:250, hrs:"5.5", car:"Innova Crysta"},
    {to:"Lepakshi", km:70, hrs:"1.5", car:"Etios"},
    {to:"Horsley Hills", km:150, hrs:"3.5", car:"Rumion"},
    {to:"Srisailam", km:330, hrs:"7", car:"Tempo Traveller"},
    {to:"Hyderabad", km:410, hrs:"7", car:"Innova Crysta"}
  ];
  const $ = id => document.getElementById(id), book = $("boardBook");
  const set = (r, btn) => {
    $("toPlace").textContent = r.to; $("km").textContent = r.km; $("hrs").textContent = r.hrs; $("best").textContent = r.car;
    chips.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === btn));
    book.href = wa(`${hi}I need a vehicle from Puttaparthi to ${r.to}. Please share the fare.`);
    book.target = "_blank"; book.rel = "noopener";
  };
  routes.forEach((r, k) => { const b = document.createElement("button"); b.type = "button"; b.className = "chip";
    b.textContent = r.to; b.onclick = () => set(r, b); chips.appendChild(b); if (k === 0) set(r, b); });
})();

/* photo lightbox */
(() => {
  const dlg = document.querySelector("dialog.lb"); if (!dlg) return;
  const img = dlg.querySelector("img");
  document.querySelectorAll("[data-full]").forEach(b => b.addEventListener("click", () => {
    img.src = b.dataset.full; img.alt = b.querySelector("img").alt; dlg.showModal(); }));
  dlg.querySelector("button").onclick = () => dlg.close();
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
})();

/* fleet page thumbnails */
document.querySelectorAll(".vg").forEach(g => {
  const main = g.querySelector(".main");
  g.querySelectorAll(".thumbs button").forEach(b => b.addEventListener("click", () => {
    main.src = b.dataset.src;
    g.querySelectorAll(".thumbs button").forEach(x => x.setAttribute("aria-current", x === b));
  }));
});

/* booking form -> WhatsApp */
const form = document.getElementById("bookForm");
if (form) form.addEventListener("submit", e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(form));
  const m = `${hi}new booking request:
Name: ${f.name}
Phone: ${f.phone}
Service: ${f.service}
From: ${f.from}
To: ${f.to}
Date: ${f.date}${f.time ? " at " + f.time : ""}
Vehicle: ${f.car}
Passengers: ${f.pax || "-"}${f.note ? "\nNote: " + f.note : ""}`;
  window.open(wa(m), "_blank", "noopener");
});

document.querySelectorAll(".yr").forEach(s => s.textContent = new Date().getFullYear());
