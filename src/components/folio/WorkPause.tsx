// The pause between the evidence and the work. Nine drawn screens grow from a
// point to a full-bleed cover while the two words part around them.
const SCREENS = ["a", "b", "c", "d", "e", "f", "a", "e", "c"];

export function WorkPause() {
  return (
    <section
      className="panel pause"
      data-field="paper-3"
      data-more-work-section
      data-header-bg="#2f2b27"
      data-header-text="#f3efe8"
      data-header-border="#5a524d"
      aria-label="The work"
    >
      <div className="pause__inner">
        <div className="collage" data-more-work-rect aria-hidden="true">
          {SCREENS.map((kind, i) => (
            <span className={`screen screen--${kind}`} key={`${kind}-${i}`}>
              <i></i>
              <i></i>
              <b></b>
            </span>
          ))}
        </div>
        <p className="pause__words">
          <span data-more-work-more>The</span>
          <span data-more-work-work>Work</span>
        </p>
      </div>
    </section>
  );
}
