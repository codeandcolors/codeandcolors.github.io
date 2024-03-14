const selector = "relatedValuesDatum";

document.querySelectorAll(`.${selector}`).forEach((container) => {
    const relatedValues = JSON.parse(container.dataset.relatedValues);
    const value = +container.dataset.value;
    const unit = container.dataset.unit;

    const containerBox = container.getBoundingClientRect();
    const popup = document.createElement("div");
    popup.classList.add("relatedValuesPopup");
    popup.style.setProperty("background-color", "white");
    popup.style.setProperty("position", "absolute");
    popup.style.setProperty("top", containerBox.top + 30 + "px");
    popup.style.setProperty("left", containerBox.left + 30 + "px");
    popup.style.setProperty("color", "black");
    popup.style.setProperty("padding", "1rem");
    popup.style.setProperty("border-radius", "0.5rem");
    popup.style.setProperty("z-index", "100");
    popup.style.setProperty("box-shadow", ".5rem .5rem 1rem rgba(51, 51, 51, 0.2)");
    popup.style.setProperty("display", "none");

    let popupText = `
        <p>${value} ${unit} ≈</p>
        <ul>
            ${relatedValues
                .map((rv) => {
                    const relatedValue = parseFloat(rv.value);
                    const relatedFactor = parseFloat(rv.factor); // converts initial to related unit
                    const nr = (value * relatedFactor) / relatedValue;
                    return `<li>${nr} ${rv.text}</li>`;
                })
                .join("")}
        </ul>
    `;
    popup.innerHTML = popupText;

    container.addEventListener("mouseover", () => {
        popup.style.setProperty("display", "block");
    });
    container.addEventListener("mouseleave", () => {
        popup.style.setProperty("display", "none");
    });

    container.appendChild(popup);
});
