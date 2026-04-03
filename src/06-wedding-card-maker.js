/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  // Your code here
  if (!containerElement) return null

  function addGuest(name, side) {
    const div = document.createElement("div");
    div.classList.add("guest-item");

    const span = document.createElement("span");
    span.textContent = name

    const button = document.createElement("button");
    button.classList.add("remove-btn")
    button.textContent = "Remove"

    div.setAttribute("data-name", name);
    div.setAttribute("data-side", side);

    div.appendChild(span);
    div.appendChild(button);

    containerElement.appendChild(div)

    return div

  }

  function removeGuest(name) {
    const divNodeList = containerElement.querySelectorAll("div");

    for (const div of divNodeList) {
      if (div.classList.contains("guest-item") && div.getAttribute("data-name") && div.getAttribute("data-name") === name) {
        containerElement.removeChild(div)
        return true
      }
    }

    return false
  }

  function getGuests() {
    const divNodeList = containerElement.querySelectorAll("div");

    return Array.from(divNodeList)
      .filter(div => div.classList.contains("guest-item"))
      .map(div => ({
        name: div.getAttribute("data-name"),
        side: div.getAttribute("data-side")
      }));
  }

  containerElement.addEventListener("click", (e) => {
    const btn = e.target;
    if (btn.classList.contains("remove-btn")) {
      const parent = btn.parentElement
      if (parent.classList.contains("guest-item")) {
        containerElement.removeChild(parent)
        
      }
    }

  })


  return {
    addGuest,
    removeGuest,
    getGuests
  }

}

export function setupThemeSelector(containerElement, previewElement) {
  // Your code here
  if(!containerElement || !previewElement) return null

  const btn1 = document.createElement("button")
  btn1.className = "theme-btn";
  btn1.textContent = "traditional";
  btn1.setAttribute("data-theme", "traditional")
  
  const btn2 = document.createElement("button")
  btn2.className= "theme-btn";
  btn2.textContent = "modern";
  btn2.setAttribute("data-theme", "modern")
  
  const btn3 = document.createElement("button")
  btn3.className = "theme-btn";
  btn3.textContent = "royal";
  btn3.setAttribute("data-theme", "royal")

  containerElement.appendChild(btn1)
  containerElement.appendChild(btn2)
  containerElement.appendChild(btn3)

  containerElement.addEventListener("click", (e)=>{
    const btn = e.target;
    if(btn.className === "theme-btn"){
      previewElement.className = btn.getAttribute("data-theme");
      previewElement.setAttribute("data-theme", btn.getAttribute("data-theme"))
    }
    
  })

  function getTheme(){
    return previewElement.getAttribute("data-theme")
  }

  return {
    getTheme
  }


}

export function setupCardEditor(cardElement) {
  if (!cardElement) return null;

  function clearEditing() {
    const current = cardElement.querySelector(".editing");
    if (current) {
      current.classList.remove("editing");
      current.contentEditable = "false";
    }
  }

  cardElement.addEventListener("click", (e) => {
    const editable = e.target.closest("[data-editable]");

    // Case 1: Click on editable element
    if (editable && cardElement.contains(editable)) {
      clearEditing();

      editable.contentEditable = "true";
      editable.classList.add("editing");
      return;
    }

    // Case 2: Click on card itself (outside editable)
    if (e.target === cardElement) {
      clearEditing();
    }
  });

  function getContent(field) {
    const el = cardElement.querySelector(`[data-editable="${field}"]`);
    return el ? el.textContent : null;
  }

  return {
    getContent
  };
}
