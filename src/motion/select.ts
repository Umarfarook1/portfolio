/**
 * The pen-drawn dropdown.
 *
 * A real listbox: the toggle owns aria-expanded, the list owns role="listbox"
 * and its options own aria-selected, a hidden input carries the value the
 * mailto reads, and the keyboard does what a native select does (arrows, Home,
 * End, type to jump, Enter or Space to pick, Escape to close, focus back on
 * the toggle). The list wipes open with a clip, 0.28s power3.out, and is drawn
 * by the pen at boil 0.2 like the inputs. Under reduced motion it appears.
 */
import { gsap, list, reduced, type Cleanup } from "./env";
import { mountPenCard } from "./pens";

const OPEN_DUR = 0.28;
/* four components with units at both ends: the browser normalises
   inset(0 0 100% 0) down to three, and a tween between a three part start and
   a four part end has nothing to interpolate and simply never moves */
const SHUT = "inset(0% 0% 100% 0%)";
const OPEN = "inset(0% 0% 0% 0%)";

function bindOne(root: HTMLElement): Cleanup {
  const toggle = root.querySelector<HTMLButtonElement>("[data-select-toggle]");
  const listEl = root.querySelector<HTMLElement>("[data-select-list]");
  const label = root.querySelector<HTMLElement>("[data-select-label]");
  const valueInput = root.querySelector<HTMLInputElement>("[data-select-value]");
  if (!toggle || !listEl) return () => {};
  const options = list<HTMLLIElement>('[role="option"]', listEl);
  if (!options.length) return () => {};

  let open = false;
  let active = Math.max(0, options.findIndex((o) => o.getAttribute("aria-selected") === "true"));
  let typed = "";
  let typedAt = 0;
  let tween: gsap.core.Tween | null = null;
  const offs: Cleanup[] = [];

  /* the list gets its own drawn card, so the markup stays exactly as spelled */
  mountPenCard(listEl);

  function markActive(i: number) {
    active = Math.min(options.length - 1, Math.max(0, i));
    options.forEach((o, k) => {
      if (k === active) {
        o.setAttribute("data-active", "true");
        o.id = o.id || root.id + "-option-" + k;
        listEl!.setAttribute("aria-activedescendant", o.id);
        if (open) o.scrollIntoView({ block: "nearest" });
      } else {
        o.removeAttribute("data-active");
      }
    });
  }

  function select(i: number) {
    const o = options[i];
    if (!o) return;
    options.forEach((other, k) => other.setAttribute("aria-selected", String(k === i)));
    if (label) label.textContent = o.textContent || "";
    if (valueInput) {
      valueInput.value = o.getAttribute("data-value") || o.textContent || "";
      valueInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
    markActive(i);
  }

  function openList() {
    if (open) return;
    open = true;
    listEl!.hidden = false;
    toggle!.setAttribute("aria-expanded", "true");
    if (tween) tween.kill();
    if (reduced()) {
      gsap.set(listEl!, { clipPath: OPEN });
    } else {
      tween = gsap.fromTo(
        listEl!,
        { clipPath: SHUT, willChange: "clip-path" },
        {
          clipPath: OPEN,
          duration: OPEN_DUR,
          ease: "power3.out",
          overwrite: "auto",
          onComplete: () => {
            gsap.set(listEl!, { clearProps: "clipPath,willChange" });
            tween = null;
          },
        }
      );
    }
    markActive(active);
    document.addEventListener("pointerdown", onOutside, true);
  }

  function closeList(focusToggle: boolean) {
    if (!open) return;
    open = false;
    toggle!.setAttribute("aria-expanded", "false");
    document.removeEventListener("pointerdown", onOutside, true);
    if (tween) tween.kill();
    const finish = () => {
      listEl!.hidden = true;
      gsap.set(listEl!, { clearProps: "clipPath,willChange" });
      tween = null;
    };
    if (reduced()) {
      finish();
    } else {
      /* it leaves the way it came, from the live clip */
      tween = gsap.fromTo(
        listEl!,
        { clipPath: OPEN, willChange: "clip-path" },
        { clipPath: SHUT, duration: OPEN_DUR, ease: "power3.in", overwrite: "auto", onComplete: finish }
      );
    }
    if (focusToggle) toggle!.focus();
  }

  function onOutside(ev: PointerEvent) {
    const t = ev.target;
    if (t instanceof Node && root.contains(t)) return;
    closeList(false);
  }

  function onToggleClick() {
    if (open) closeList(true);
    else openList();
  }

  function onToggleKey(ev: KeyboardEvent) {
    if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
      ev.preventDefault();
      openList();
      listEl!.focus();
      return;
    }
    if (ev.key === "Enter" || ev.key === " " || ev.key === "Spacebar") {
      ev.preventDefault();
      openList();
      listEl!.focus();
    }
  }

  function jumpToLetter(key: string) {
    const now = Date.now();
    typed = now - typedAt > 700 ? key : typed + key;
    typedAt = now;
    const from = typed.length === 1 ? active + 1 : active;
    for (let n = 0; n < options.length; n++) {
      const i = (from + n) % options.length;
      const text = (options[i].textContent || "").trim().toLowerCase();
      if (text.indexOf(typed.toLowerCase()) === 0) {
        markActive(i);
        return;
      }
    }
  }

  function onListKey(ev: KeyboardEvent) {
    switch (ev.key) {
      case "ArrowDown":
        ev.preventDefault();
        markActive(active + 1);
        return;
      case "ArrowUp":
        ev.preventDefault();
        markActive(active - 1);
        return;
      case "Home":
        ev.preventDefault();
        markActive(0);
        return;
      case "End":
        ev.preventDefault();
        markActive(options.length - 1);
        return;
      case "Enter":
      case " ":
      case "Spacebar":
        ev.preventDefault();
        select(active);
        closeList(true);
        return;
      case "Escape":
        ev.preventDefault();
        closeList(true);
        return;
      case "Tab":
        closeList(false);
        return;
      default:
        if (ev.key.length === 1 && !ev.metaKey && !ev.ctrlKey && !ev.altKey) {
          ev.preventDefault();
          jumpToLetter(ev.key);
        }
    }
  }

  toggle.addEventListener("click", onToggleClick);
  toggle.addEventListener("keydown", onToggleKey);
  listEl.addEventListener("keydown", onListKey);
  offs.push(() => {
    toggle.removeEventListener("click", onToggleClick);
    toggle.removeEventListener("keydown", onToggleKey);
    listEl.removeEventListener("keydown", onListKey);
  });

  options.forEach((o, i) => {
    const onEnter = () => markActive(i);
    const onClick = () => {
      select(i);
      closeList(true);
    };
    o.addEventListener("pointerenter", onEnter);
    o.addEventListener("click", onClick);
    offs.push(() => {
      o.removeEventListener("pointerenter", onEnter);
      o.removeEventListener("click", onClick);
    });
  });

  const onFocusOut = (ev: FocusEvent) => {
    const to = ev.relatedTarget;
    if (to instanceof Node && root.contains(to)) return;
    closeList(false);
  };
  root.addEventListener("focusout", onFocusOut);
  offs.push(() => root.removeEventListener("focusout", onFocusOut));

  /* the label and the hidden value start from whatever the markup marked */
  select(active);

  return () => {
    document.removeEventListener("pointerdown", onOutside, true);
    if (tween) tween.kill();
    offs.forEach((f) => f());
    listEl.hidden = true;
    gsap.set(listEl, { clearProps: "clipPath,willChange" });
  };
}

export function initSelects(scope: ParentNode): Cleanup {
  const offs = list("[data-select]", scope).map(bindOne);
  return () => offs.forEach((f) => f());
}
