const PHONE = "5519991473883";

function whatsappUrl(service) {
  const text = service
    ? `Olá! Vim pelo site da LariLash Studio e gostaria de agendar o serviço ${service}.`
    : "Olá! Vim pelo site da LariLash Studio e gostaria de agendar um horário.";
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.href = whatsappUrl(link.dataset.service);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const rows = [...document.querySelectorAll("#lista .row")];
const vazio = document.querySelector("#vazio");

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filtro = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => {
      item.classList.toggle("is-on", item === button);
    });

    let visiveis = 0;
    rows.forEach((row) => {
      const mostrar = filtro === "todas" || row.dataset.category === filtro;
      row.hidden = !mostrar;
      if (mostrar) visiveis += 1;
    });
    vazio.hidden = visiveis > 0;
  });
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav a").forEach((item) => {
      if (item === link) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
  });
});

const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");

document.querySelectorAll(".shot").forEach((shot) => {
  shot.addEventListener("click", () => {
    const img = shot.querySelector("img");
    lightboxImg.src = shot.dataset.full;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
  });
});

document.querySelector("#fechar").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
