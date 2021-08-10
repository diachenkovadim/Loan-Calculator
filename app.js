const loanForm = document.getElementById('loan-form');
loanForm.addEventListener('submit', function (event) {
    // Show loader
    document.getElementById('loading').style.display = 'block';

    // Hide results
    document.getElementById('results').style.display = 'none';

    setTimeout( calculateResults, 1200);

    event.preventDefault();
})

function calculateResults () {
    // UI vars
    const amount = document.getElementById('amount');
    const interst = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const princapal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interst.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (princapal * x * calculatedInterest) / ( x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments ) - princapal).toFixed(2);
        // Show results
    document.getElementById('results').style.display = 'block';

        // hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }

    
}

// showError
function showError (error) {
    // Show results
    document.getElementById('results').style.display = 'none';

    // hide loader
    document.getElementById('loading').style.display = 'none';
    // create a div
    const errorDiv = document.createElement('div');

    // add class
    errorDiv.className = 'alert alert-danger';

    // get element to append errorDiv
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // create Text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above the heading
    card.insertBefore(errorDiv, heading);

    // clear after in 3 seconds
    setTimeout( function () {
        document.querySelector('.alert').remove();
    }, 3000)
}