// Paste your Gradio backend URL here later
const API_BASE = "https://xxxxx.gradio.live";

let mode = "image";

document.getElementById("tab-image").addEventListener("click", () => {
  mode = "image";
  document.getElementById("file-wrapper").style.display = "none";
  updateTabs();
});
document.getElementById("tab-video").addEventListener("click", () => {
  mode = "video";
  document.getElementById("file-wrapper").style.display = "none";
  updateTabs();
});
document.getElementById("tab-img2vid").addEventListener("click", () => {
  mode = "img2vid";
  document.getElementById("file-wrapper").style.display = "flex";
  updateTabs();
});

document.getElementById("image-upload").addEventListener("change", (e) => {
  const fileName = e.target.files[0]?.name || "";
  document.getElementById("file-name").textContent = fileName;
});

function updateTabs() {
  document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
  document.getElementById(`tab-${mode}`).classList.add("active");
}

document.getElementById("generate-btn").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const fileInput = document.getElementById("image-upload");
  const loading = document.getElementById("loading");
  const outputImg = document.getElementById("output-image");
  const outputVid = document.getElementById("output-video");

  outputImg.style.display = "none";
  outputVid.style.display = "none";
  loading.style.display = "flex";

  try {
    if (mode === "image") {
      const res = await fetch(`${API_BASE}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [prompt] })
      });
      const result = await res.json();
      outputImg.src = result.data[0];
      outputImg.style.display = "block";
    } else if (mode === "video" || mode === "img2vid") {
      const formData = new FormData();
      formData.append("data", JSON.stringify([prompt]));
      if (fileInput.files[0]) {
        formData.append("file", fileInput.files[0]);
      }
      const res = await fetch(`${API_BASE}/api/predict`, {
        method: "POST",
        body: formData
      });
      const result = await res.json();
      outputVid.src = result.data[0];
      outputVid.style.display = "block";
    }
  } catch (e) {
    alert("Generation failed. Is the Colab backend running?");
  }
  loading.style.display = "none";
});
