document.addEventListener('DOMContentLoaded', function() {
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the element is in the viewport, add a class to it
                entry.target.classList.add('visible');
                // Optionally, stop observing this element after it becomes visible
                observer.unobserve(entry.target);
            }
        });
    };

    const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // Add margin around the root if needed
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver(observerCallback, options);

    // Select all elements on the page (or adjust this to target specific elements)
    const elements = document.querySelectorAll("div"); // Selects every element

    // Observe each element
    elements.forEach(element => {
        observer.observe(element);
    });
});