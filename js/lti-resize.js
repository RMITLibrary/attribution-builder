(function () {
  'use strict';

  // Function to send the iframe height to the parent window
  const sendResizeMessage = () => {
    const height = document.documentElement.scrollHeight;
    const resizeSubjects = ['lti.frameResize', 'rmit.iframeResize'];

    resizeSubjects.forEach((subject) => {
      window.parent.postMessage(
        {
          subject: subject,
          height: height,
        },
        '*'
      );
    });
  };

  // Send the initial height on page load
  window.addEventListener('load', sendResizeMessage);

  // Send the height whenever the window is resized
  window.addEventListener('resize', sendResizeMessage);

  // Optional: Observe DOM changes to dynamically adjust height
  const observer = new MutationObserver(sendResizeMessage);
  observer.observe(document.body, { childList: true, subtree: true });
})();
