import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB_CSKtAXpZezu9P0RaGsH2fYy3j9VK00o",
  authDomain: "sharifeduc-a2e6c.firebaseapp.com",
  projectId: "sharifeduc-a2e6c",
  storageBucket: "sharifeduc-a2e6c.firebasestorage.app",
  messagingSenderId: "800215227538",
  appId: "1:800215227538:web:6982fc31080ad356b15a4b",
  measurementId: "G-DXHB0QJV5C"
};

const db = getFirestore(initializeApp(firebaseConfig));
const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug = v => String(v ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const classSlug = {"Nursery":"nursery","P.1":"p1","P.2":"p2","P.3":"p3","P.4":"p4","P.5":"p5","P.6":"p6","P.7":"p7"};

async function loadResources(){
  try {
    const snap = await getDocs(query(collection(db,"resources"), orderBy("createdAt","desc"), limit(100)));
    return snap.docs.map(d => ({id:d.id,...d.data()}));
  } catch(e) {
    console.warn("Resource feed unavailable:", e);
    return [];
  }
}

function resourceUrl(r){
  return `/resources/${classSlug[r.classLevel] || slug(r.classLevel)}/${slug(r.subject || r.category || "resource")}/${slug(r.title || r.id)}/`;
}

const form = document.getElementById("searchForm");
const input = document.getElementById("search");
const results = document.getElementById("searchResults");

if(form){
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const q = input.value.trim().toLowerCase();
    if(!q) return;
    const resources = await loadResources();
    const matches = resources.filter(r =>
      [r.title,r.classLevel,r.category,r.subject,r.term,r.year].join(" ").toLowerCase().includes(q)
    );
    results.innerHTML =
      `<h2>Search results</h2>` +
      (matches.length
        ? matches.map(r => `
          <article class="result-card">
            <div>
              <span class="tag">${esc(r.classLevel)} · ${esc(r.category)}</span>
              <h3><a href="${resourceUrl(r)}">${esc(r.title)}</a></h3>
              <p>${esc(r.subject || "")} ${esc(r.term || "")} ${esc(r.year || "")}</p>
            </div>
            ${r.fileUrl ? `<a class="button" href="${esc(r.fileUrl)}" target="_blank" rel="noopener">PDF</a>` : ""}
          </article>`).join("")
        : `<p>No matching resources found yet.</p>`);
    results.scrollIntoView({behavior:"smooth"});
  });
}
