export default function outsideEvent(element, events, callback) {
  const html = document.documentElement;
  const outside = 'data-outside';

  if (!element.hasAttribute(outside)) {
    events.forEach(userEvent => {
      setTimeout(() => {
        html.addEventListener(userEvent, handleOutsideEvent);
      });
    });
    element.setAttribute(outside, '');
  }
  function handleOutsideEvent(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);

      events.forEach(userEvent => {
        html.removeEventListener(userEvent, handleOutsideEvent);
      });
      callback();
    }
  }
}
