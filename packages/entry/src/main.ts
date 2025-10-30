import './style.css';

// Add interactivity to project cards
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLAnchorElement;
      console.log(`Navigating to: ${target.href}`);
    });
  });

  console.log('Entry page loaded successfully!');
});
