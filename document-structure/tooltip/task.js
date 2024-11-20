document.addEventListener("DOMContentLoaded", () => {
  const tooltips = document.querySelectorAll('.has-tooltip');

  tooltips.forEach(tooltip => {
      tooltip.addEventListener('click', event => {
          event.preventDefault();
          const activeTooltip = document.querySelector('.tooltip_active');
          if (activeTooltip) {
              activeTooltip.remove();
          }
          if (tooltip.nextElementSibling && tooltip.nextElementSibling.classList.contains('tooltip_active')) {
              return;
          }
          const tooltipText = tooltip.getAttribute('title');
          const tooltipElement = document.createElement('div');
          tooltipElement.className = 'tooltip tooltip_active';
          tooltipElement.textContent = tooltipText;
          document.body.appendChild(tooltipElement);
          const rect = tooltip.getBoundingClientRect();
          tooltipElement.style.left = `${rect.left}px`;
          tooltipElement.style.top = `${rect.bottom}px`;
          document.addEventListener('click', (e) => {
              if (!tooltip.contains(e.target) && !tooltipElement.contains(e.target)) {
                  tooltipElement.remove();
              }
          }, { once: true });
      });
  });
});
