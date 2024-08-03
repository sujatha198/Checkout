document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const pincode = document.getElementById('pincode').value;
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            if (data[0].Status === 'Success') {
                data[0].PostOffice.forEach(postOffice => {
                    const postOfficeDiv = document.createElement('div');
                    postOfficeDiv.innerHTML = `
                        <strong>${postOffice.Name}</strong><br>
                        ${postOffice.Block}, ${postOffice.District}, ${postOffice.State}, ${postOffice.Country}
                    `;
                    resultsDiv.appendChild(postOfficeDiv);
                });
            } else {
                resultsDiv.innerHTML = 'No post office found for this pincode.';
            }
            showModal();
        })
        .catch(error => {
            console.error('Error fetching pincode data:', error);
        });
});

function showModal() {
    const modal = document.getElementById('resultsModal');
    modal.style.display = 'block';
}

document.querySelector('.close').addEventListener('click', function() {
    const modal = document.getElementById('resultsModal');
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('resultsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
