const layer2 = document.querySelector('.layer2');
const container = document.querySelector('.container');

container.addEventListener('mousemove', function(event) {
  const x = event.clientX - container.offsetLeft;
  const y = event.clientY - container.offsetTop;

  layer2.style.backgroundImage = `radial-gradient(circle 50px at ${x}px ${y}px, transparent, black)`;
});
