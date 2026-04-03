/**
 * 🇮🇳 Republic Day Parade - Capstone: All DOM Concepts Combined
 *
 * Republic Day parade ka live dashboard bana rahe hain! Multiple DOM
 * concepts ek saath use honge - createElement, appendChild, classList,
 * dataset, event delegation, DOM traversal, insertBefore, sab kuch.
 * Jaise 26 January ko Rajpath pe alag alag contingents march karte hain
 * aur commentary team sab track karti hai, waise hi tum DOM se parade
 * ka poora dashboard manage karoge. Yeh CAPSTONE challenge hai - saare
 * DOM skills combine karo!
 *
 * Functions:
 *
 *   1. createContingent(name, type, state, members)
 *      - Creates a div.contingent with:
 *        - data-name attribute = name
 *        - data-type attribute = type (e.g., "military", "cultural", "school")
 *        - data-state attribute = state (e.g., "Maharashtra", "Punjab")
 *        - h3 with textContent = name
 *        - span.type with textContent = type
 *        - span.state with textContent = state
 *        - ul with each member as an li element
 *      - Returns the div element
 *      - Validation: name (string), type (string), state (string),
 *        members (array of strings). Agar invalid, return null.
 *
 *   2. setupParadeDashboard(container)
 *      - Sets up the parade dashboard on container element
 *      - Returns object with these methods:
 *
 *        addContingent(contingent)
 *          - contingent: { name, type, state, members }
 *          - Creates element using createContingent()
 *          - Appends to container
 *          - Returns the created element, or null if invalid
 *
 *        removeContingent(name)
 *          - Finds .contingent child with data-name matching name
 *          - Removes it from container
 *          - Returns true if found and removed, false if not found
 *
 *        moveContingent(name, direction)
 *          - direction: "up" or "down"
 *          - "up": swaps contingent with its previousElementSibling
 *            (uses insertBefore to place it before its previous sibling)
 *          - "down": swaps with its nextElementSibling
 *            (uses insertBefore to place next sibling before this element)
 *          - Returns true if moved, false if can't move (no sibling in that direction)
 *          - Returns false if contingent not found
 *
 *        getContingentsByType(type)
 *          - Finds all .contingent children with data-type matching type
 *          - Returns array of elements
 *
 *        highlightState(state)
 *          - Adds class "highlight" to all .contingent children with
 *            data-state matching state
 *          - Removes class "highlight" from all other .contingent children
 *          - Returns count of highlighted contingents
 *
 *        getParadeOrder()
 *          - Returns array of contingent names in current DOM order
 *          - Reads data-name from each .contingent child
 *
 *        getTotalMembers()
 *          - Counts ALL li elements across all contingents in container
 *          - Returns the total count
 *
 *      - Agar container null/undefined, return null
 *
 * Hint: Yeh capstone hai - createElement, appendChild, classList, dataset,
 *   querySelectorAll, insertBefore, removeChild sab use hoga. Har method
 *   mein ek alag DOM concept practice hoga.
 *
 * @example
 *   const container = document.createElement("div");
 *   const dashboard = setupParadeDashboard(container);
 *
 *   dashboard.addContingent({
 *     name: "Punjab Regiment",
 *     type: "military",
 *     state: "Punjab",
 *     members: ["Col. Singh", "Maj. Kaur", "Capt. Gill"]
 *   });
 *
 *   dashboard.addContingent({
 *     name: "Bharatanatyam Group",
 *     type: "cultural",
 *     state: "Tamil Nadu",
 *     members: ["Lakshmi", "Priya", "Deepa", "Meena"]
 *   });
 *
 *   dashboard.getParadeOrder();
 *   // => ["Punjab Regiment", "Bharatanatyam Group"]
 *
 *   dashboard.moveContingent("Bharatanatyam Group", "up");
 *   // => true
 *   dashboard.getParadeOrder();
 *   // => ["Bharatanatyam Group", "Punjab Regiment"]
 *
 *   dashboard.getContingentsByType("military");
 *   // => [element for Punjab Regiment]
 *
 *   dashboard.highlightState("Punjab");
 *   // => 1 (Punjab Regiment highlighted)
 *
 *   dashboard.getTotalMembers();
 *   // => 7 (3 + 4)
 *
 *   dashboard.removeContingent("Punjab Regiment");
 *   // => true
 */
export function createContingent(name, type, state, members) {
  // Your code here
  const div = document.createElement("div");
  div.className = "contingent"

  const h3 = document.createElement("h3")

  const spanType = document.createElement("span")
  spanType.className = "type"

  const spanState = document.createElement("span")
  spanState.className = "state"

  const ul = document.createElement("ul")
  try {
    if (typeof name !== "string" || typeof type !== "string" || typeof state !== "string") throw null;

    div.setAttribute("data-name", name)
    div.setAttribute("data-type", type)
    div.setAttribute("data-state", state)

    h3.textContent = name

    spanType.textContent = type;
    spanState.textContent = state;

    members.forEach(member => {
      const li = document.createElement("li");
      li.textContent = member
      ul.appendChild(li)
    });

    div.appendChild(h3)
    div.appendChild(spanType)
    div.appendChild(spanState)
    div.appendChild(ul)

    return div

  } catch (error) {
    return null
  }
}

export function setupParadeDashboard(container) {
  // Your code here
  if (!container) return null

  function addContingent(contingent) {
    try {
      const { name, type, state, members } = contingent;

      const div = createContingent(name, type, state, members);

      container.appendChild(div);
      return div
    } catch (error) {
      return null
    }
  }

  function removeContingent(name) {
    if (!name) return false
    const childs = container.children;



    for (const child of childs) {
      if (child.classList.contains("contingent")) {
        if (child.getAttribute("data-name") === name) {
          container.removeChild(child)
          return true
        }
      }
    }

    return false

  }

  function moveContingent(name, direction) {
    let targetedChild = null;

    const childs = container.children;

    for (const child of childs) {
      if (
        child.classList.contains("contingent") &&
        child.getAttribute("data-name") === name
      ) {
        targetedChild = child;
        break;
      }
    }

    // ❗ not found
    if (!targetedChild) return false;

    if (direction === "up") {
      const prev = targetedChild.previousElementSibling;
      if (!prev) return false;

      container.insertBefore(targetedChild, prev);
      return true;

    } else if (direction === "down") {
      const next = targetedChild.nextElementSibling;
      if (!next) return false;

      container.insertBefore(next, targetedChild);
      return true;

    }

    return false;
  }

  function getContingentsByType(type) {
    const result = []

    try {
      const childs = container.children;

      for (const child of childs) {
        if (child.classList.contains("contingent") && child.getAttribute("data-type") === type) {
          result.push(child)
        }
      }
      return result
    } catch (error) {
      return result
    }

  }

  function highlightState(state) {
    let count = 0;

    const childs = container.children;

    for (const child of childs) {
      if (child.classList.contains("contingent")) {
        if (child.getAttribute("data-state") === state) {

          child.classList.add("highlight")
          count++
        }
        else {
          child.classList.remove("highlight")
        }

      }



    }

    return count
  }

  function getParadeOrder() {

    const childs = container.children;
    const result = []

    for (const c of childs) {
      if (c.classList.contains("contingent")) {
        result.push(c.getAttribute("data-name"))
      }
    }

    return result

  }

  function getTotalMembers() {

    const childs = container.children;
    let count = 0;

    for (const c of childs) {
      const ul = c.querySelector("ul");
      count += ul.children.length

    }

    return count

  }

  return {
    addContingent,
    removeContingent,
    moveContingent,
    getContingentsByType,
    highlightState,
    getParadeOrder,
    getTotalMembers
  }

}
