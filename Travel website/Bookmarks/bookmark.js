// Bookmark list (in-memory for simplicity; replace with API calls for persistent data)
const bookmarks = [];

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate Header
gsap.from("#header-title", { duration: 1, y: 50, opacity: 0, ease: "power2.out" });
gsap.from("#header-subtitle", { duration: 1, y: 50, opacity: 0, ease: "power2.out", delay: 0.5 });

// Animate Div Containers
gsap.utils.toArray(".container > div").forEach((div) => {
  gsap.from(div, {
    scrollTrigger: {
      trigger: div,
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });
});

// Add a Bookmark
document.getElementById("bookmarkForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const placeName = document.getElementById("placeName").value.trim();
  const description = document.getElementById("description").value.trim();

  if (placeName && description) {
    const id = Date.now().toString(); // Unique ID
    const bookmark = { id, placeName, description };

    bookmarks.push(bookmark);
    addBookmarkToUI(bookmark);

    // Clear form fields
    document.getElementById("bookmarkForm").reset();
  } else {
    alert("Please fill out both fields.");
  }
});

// Add Bookmark to UI
function addBookmarkToUI({ id, placeName, description }) {
  const bookmarksList = document.getElementById("bookmarks");

  const bookmarkItem = document.createElement("div");
  bookmarkItem.className = "bookmark-item";
  bookmarkItem.dataset.id = id;

  bookmarkItem.innerHTML = `
    <div>
      <h3>${placeName}</h3>
      <p>${description}</p>
    </div>
    <button onclick="removeBookmark('${id}')">Remove</button>
  `;

  bookmarksList.appendChild(bookmarkItem);

  // Animate the new bookmark
  gsap.from(bookmarkItem, { scale: 0.8, opacity: 0, duration: 0.5, ease: "power2.out" });
}

// Remove a Bookmark
function removeBookmark(id) {
  const index = bookmarks.findIndex((bookmark) => bookmark.id === id);
  if (index > -1) {
    bookmarks.splice(index, 1);

    const bookmarkItem = document.querySelector(`.bookmark-item[data-id="${id}"]`);
    gsap.to(bookmarkItem, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => bookmarkItem.remove(),
    });
  }
}

