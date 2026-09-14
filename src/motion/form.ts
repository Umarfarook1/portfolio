/**
 * Chapter VII: the commission form.
 *
 * Four kinds of feedback, in G's state machine: inline validation while the
 * field is being filled (never only on submit, and it never clears what was
 * typed), status while it works, completion when it is done, error with a
 * message and a colour, not a colour alone.
 *
 * Send is honest: it composes a mailto link from the fields and opens it. The
 * page stores nothing and posts nothing.
 */
import { list, type Cleanup } from "./env";
import type { PenButtonElement, PenHandle } from "./pens";

const RESET_MS = 2400;

function validEmail(value: string): boolean {
  const v = value.trim();
  return Boolean(v) && v.indexOf("@") >= 1 && v.lastIndexOf(".") > v.indexOf("@");
}

function fieldValue(form: HTMLFormElement, name: string): string {
  const el = form.elements.namedItem(name);
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
    return el.value;
  }
  if (el instanceof RadioNodeList) return el.value;
  return "";
}

function checked(form: HTMLFormElement, name: string): boolean {
  const el = form.elements.namedItem(name);
  return el instanceof HTMLInputElement ? el.checked : false;
}

export function initForm(scope: ParentNode): Cleanup {
  const form = scope.querySelector<HTMLFormElement>("#commission-form");
  if (!form) return () => {};
  const send = scope.querySelector<PenButtonElement>("#send-btn, [data-send-button]");
  const book = scope.querySelector<HTMLElement>("#book-btn, [data-book-button]");
  const status = scope.querySelector<HTMLElement>("#form-status");
  const email = scope.querySelector<HTMLInputElement>("#f-email");
  const to = form.getAttribute("data-mailto") || "";
  let busy = false;
  let resetTimer = 0;
  const offs: Cleanup[] = [];

  function say(msg: string) {
    if (status) status.textContent = msg;
  }
  function pen(): PenHandle | undefined {
    return send ? send.__pen : undefined;
  }
  function markInvalid(on: boolean) {
    if (!email) return;
    if (on) {
      email.setAttribute("aria-invalid", "true");
      if (email.parentElement) email.parentElement.style.setProperty("--drawably-stroke", "var(--err)");
    } else {
      email.removeAttribute("aria-invalid");
      if (email.parentElement) email.parentElement.style.removeProperty("--drawably-stroke");
    }
  }

  /* inline validation: the field says what is wrong while it is being filled,
     and the text the visitor typed is never touched */
  if (email) {
    const onBlur = () => {
      if (!email.value.trim()) return;
      if (validEmail(email.value)) {
        markInvalid(false);
        if (status && status.textContent) say("");
        return;
      }
      markInvalid(true);
      say("That address is missing an at sign or a dot. The rest of your text is kept.");
    };
    const onInput = () => {
      if (email.getAttribute("aria-invalid") !== "true") return;
      if (!validEmail(email.value)) return;
      markInvalid(false);
      say("");
    };
    email.addEventListener("blur", onBlur);
    email.addEventListener("input", onInput);
    offs.push(() => {
      email.removeEventListener("blur", onBlur);
      email.removeEventListener("input", onInput);
    });
  }

  function compose(): string {
    const name = fieldValue(form!, "name").trim();
    const need = fieldValue(form!, "need").trim();
    const brief = fieldValue(form!, "brief").trim();
    const hours = fieldValue(form!, "hours").trim();
    const harness = checked(form!, "harness");
    const subject = need ? need + " enquiry" + (name ? " from " + name : "") : "Enquiry" + (name ? " from " + name : "");
    const body = [
      name ? "Name: " + name : "",
      email && email.value.trim() ? "Email: " + email.value.trim() : "",
      need ? "What I need: " + need : "",
      hours ? "Hours: " + hours : "",
      harness ? "Send me the harness: yes" : "",
      "",
      brief,
    ]
      .filter((l) => l !== null && l !== undefined)
      .join("\n");
    return (
      "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body)
    );
  }

  const onSubmit = (ev: SubmitEvent) => {
    ev.preventDefault();
    if (busy || !send) return;
    const p = pen();
    if (!email || !validEmail(email.value)) {
      markInvalid(true);
      if (email) email.focus();
      if (p) {
        p.setState?.("error");
        window.setTimeout(() => p.setState?.("idle"), 1600);
      }
      say("Add a real email address, the rest of your text is kept.");
      return;
    }
    markInvalid(false);
    busy = true;
    if (p) p.setState?.("loading");
    say("Opening your email app.");
    const href = compose();
    /* opening the mail client is the work: it happens on this frame, not
       behind a timer, so the button state and the window agree */
    window.location.href = href;
    if (p) p.setState?.("success");
    say("Send opens your email app with this filled in. Nothing is stored.");
    resetTimer = window.setTimeout(() => {
      if (p) p.setState?.("idle");
      busy = false;
      say("");
    }, RESET_MS);
  };
  form.addEventListener("submit", onSubmit);
  offs.push(() => form.removeEventListener("submit", onSubmit));

  if (book) {
    const onBook = () => say("Fifteen minutes, camera optional.");
    book.addEventListener("click", onBook);
    offs.push(() => book.removeEventListener("click", onBook));
  }

  /* Enter submits from any single-line control, so the keyboard path and the
     button path are the same path. */
  list<HTMLInputElement>("input", form).forEach((input) => {
    if (input.type === "checkbox" || input.type === "radio") return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key !== "Enter") return;
      ev.preventDefault();
      form.requestSubmit();
    };
    input.addEventListener("keydown", onKey);
    offs.push(() => input.removeEventListener("keydown", onKey));
  });

  return () => {
    if (resetTimer) window.clearTimeout(resetTimer);
    offs.forEach((f) => f());
  };
}
