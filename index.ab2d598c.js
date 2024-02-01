// Function to start counting animation when element is in view
const startCountingOnScroll = (delay)=>{
    const elements = document.querySelectorAll(".counting-container");
    const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach((entry)=>{
            if (entry.isIntersecting) {
                const targetNumber = parseInt(entry.target.querySelector("div").getAttribute("data-target"));
                const units = entry.target.querySelector("div").getAttribute("units");
                const where = entry.target.querySelector("div").getAttribute("where");
                const startingPoint = entry.target.querySelector("div").getAttribute("start");
                setTimeout(()=>{
                    countUp(entry.target, targetNumber, units, where, startingPoint);
                }, delay);
                observer.unobserve(entry.target); //<------ add this if you want counting up to only happen once
            }
        });
    });
    elements.forEach((element)=>{
        observer.observe(element);
    });
};
// Function to animate the counting
const countUp = (element, targetNumber, units, where, startingPoint)=>{
    const duration = 3000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuad = (t)=>t * (2 - t);
    let frame = 0;
    const step = (timestamp)=>{
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(easeOutQuad(progress) * targetNumber);
        if (where == "left") element.querySelector("div").textContent = startingPoint - currentCount;
        else element.querySelector("div").textContent = startingPoint - currentCount + units;
        if (frame < totalFrames) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
};
document.addEventListener("DOMContentLoaded", ()=>{
    startCountingOnScroll(800);
});

//# sourceMappingURL=index.ab2d598c.js.map
