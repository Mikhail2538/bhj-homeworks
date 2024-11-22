document.addEventListener("DOMContentLoaded", () => {
    const tooltips = document.querySelectorAll('.has-tooltip');
    let activeTooltip = null;
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('click', event => {
            event.preventDefault();
            const tooltipText = tooltip.getAttribute('title');
            if (activeTooltip) {
                if (activeTooltip.relatedElement === tooltip) {
                    activeTooltip.element.classList.toggle('tooltip_active');
                    if (!activeTooltip.element.classList.contains('tooltip_active')) {
                        activeTooltip = null;
                    }
                    return;
                }
                activeTooltip.element.remove();
                activeTooltip = null;
            }
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip tooltip_active';
            tooltipElement.textContent = tooltipText;
            document.body.appendChild(tooltipElement);
            const rect = tooltip.getBoundingClientRect();
            tooltipElement.style.left = `${rect.left}px`;
            tooltipElement.style.top = `${rect.bottom}px`;
            activeTooltip = {
                element: tooltipElement,
                relatedElement: tooltip,
            };
        });
    });
    document.addEventListener('click', event => {
        if (activeTooltip && !activeTooltip.relatedElement.contains(event.target) &&
            !activeTooltip.element.contains(event.target)) {
            activeTooltip.element.remove();
            activeTooltip = null;
        }
    });
});
