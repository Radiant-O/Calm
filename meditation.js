document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('meditationModal');
    const startButtons = document.querySelectorAll('.start-session');
   
    // Modal trigger
    startButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
           
        });
    });
});





