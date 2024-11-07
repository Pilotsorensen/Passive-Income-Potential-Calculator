function calculateIncome() {
    // Get the user inputs
    let investment = parseFloat(document.getElementById('investment').value);
    let incomeStream = document.getElementById('incomeStream').value;
    let involvement = document.getElementById('involvement').value;
    let timeframe = parseInt(document.getElementById('timeframe').value);

    // Define ROI based on the income stream selection
    let roi = 0;
    if (incomeStream === 'rentalProperties') {
        roi = 0.05;
    } else if (incomeStream === 'stockMarket') {
        roi = 0.07;
    } else if (incomeStream === 'onlineBusinesses') {
        roi = 0.1;
    }

    // Adjust ROI based on level of involvement
    if (involvement === 'handsOff') {
        roi *= 0.8; // 20% less return for hands-off approach
    } else if (involvement === 'moderate') {
        roi *= 1; // no change for moderate involvement
    } else if (involvement === 'active') {
        roi *= 1.2; // 20% more return for active approach
    }

    // Calculate the projected growth
    let result = [];
    for (let year = 1; year <= timeframe; year++) {
        investment += investment * roi; // Compounding interest formula
        result.push(investment);
    }

    // Format the final amount with spaces for thousands
    let formattedResult = result[result.length - 1].toLocaleString();

    // Update the result on the page
    document.getElementById('result').innerHTML = `
        <p>Your investment will grow to <strong>$${formattedResult}</strong> in ${timeframe} year(s).</p>
    `;

    // Set up the labels for the graph
    let labels = [];
    if (timeframe <= 5) {
        // Show months (12 months per year)
        for (let i = 1; i <= timeframe * 12; i++) {
            labels.push(`${i} month${i > 1 ? 's' : ''}`);
        }
    } else {
        // Show years
        for (let i = 1; i <= timeframe; i++) {
            labels.push(`${i} year${i > 1 ? 's' : ''}`);
        }
    }

    // Clear the previous chart if it exists
    if (window.chartInstance) {
        window.chartInstance.destroy();
    }

    // Create a new chart
    let ctx = document.getElementById('incomeChart').getContext('2d');
    window.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Projected Investment Growth',
                data: result,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                fill: true,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: timeframe <= 5 ? 'Months' : 'Years'
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Investment Value ($)'
                    },
                    ticks: {
                        beginAtZero: false
                    }
                }
            }
        }
    });
}
