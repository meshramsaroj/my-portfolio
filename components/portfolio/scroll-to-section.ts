let activeAnimation = 0;

export function scrollToSection(
  event: { preventDefault: () => void },
  href: string,
) {
  const destination = new URL(href, window.location.href);
  const sectionId = destination.hash.slice(1);

  if (
    !sectionId ||
    destination.origin !== window.location.origin ||
    destination.pathname !== window.location.pathname
  ) {
    return;
  }

  const section = document.getElementById(sectionId);
  if (!section) return;

  event.preventDefault();
  window.history.pushState(null, "", `${destination.pathname}${destination.hash}`);
  window.cancelAnimationFrame(activeAnimation);

  const targetY = Math.max(
    0,
    section.getBoundingClientRect().top + window.scrollY - 88,
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 1300;
  let startTime: number | undefined;

  const animateScroll = (time: number) => {
    startTime ??= time;
    const progress = Math.min((time - startTime) / duration, 1);
    const easedProgress =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      activeAnimation = window.requestAnimationFrame(animateScroll);
    }
  };

  activeAnimation = window.requestAnimationFrame(animateScroll);
}
