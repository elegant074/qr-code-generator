// QR Code Generation Logic
document.getElementById("generateBtn").addEventListener("click", async () => {
  const qrText = document.getElementById("qrText").value;

  if (!qrText) {
    alert("Please enter text or URL");
    return;
  }

  const response = await fetch("/generate_qr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: qrText }),
  });

  if (response.ok) {
    const qrResult = document.getElementById("qrResult");
    qrResult.innerHTML = `<img src="${URL.createObjectURL(
      await response.blob()
    )}" alt="QR Code" class="rounded-lg shadow-lg">`;
  } else {
    alert("Error generating QR code");
  }
});

// Contact Form Submission Logic
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
  };

  if (!formData.name || !formData.email || !formData.message) {
    alert("Please fill in all fields.");
    return;
  }

  alert("Thank you for your message! We will get back to you shortly.");
  e.target.reset();
});

// Back-to-Top Button Logic
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
