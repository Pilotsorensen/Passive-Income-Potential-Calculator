// Function to calculate the projected passive income
function calculateIncome() {
    // Get user input values
    const investment = parseFloat(document.getElementById('investment').value);
    const incomeStream = document.getElementById('incomeStream').value;
    const involvement = document.getElementById('involvement').value;

    // Define the ROI based on the income stream
    let roi = 0;
    if (incomeStream === 'rentalProperties') {
        roi = 0.05; // 5% ROI
    } else if (incomeStream === 'stockMarket') {
        roi = 0.07; // 7% ROI
    } else if (incomeStream === 'onlineBusinesses') {
        roi = 0.1; // 10% ROI
    }

    // Define the multiplier based on level of involvement
    let multiplier = 1;
    if (involvement === 'handsOff') {
        multiplier = 0.8; // 80% of ROI for hands-off
    } else if (involvement === 'moderate') {
        multiplier = 1; // 100% of ROI for moderate
    } else if (involvement === 'active') {
        multiplier = 1.2; // 120% of ROI for active
    }

    // Calculate the annual growth rate
    const effectiveRoi = roi * multiplier;

    // Calculate the projected values over the next 20 years
    const years = 20;
    const values = [];
    for (let year = 1; year <= years; year++) {
        const futureValue = investment * Math.pow(1 + effectiveRoi, year);
        values.push(futureValue);
    }

    // Format numbers with spaces (e.g., 1 000 000 instead of 1000000)
    const formattedValue = values[values.length - 1].toLocaleString('en-US');

    // Display the result and update the graph
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Your investment will grow to <strong>$${formattedValue}</strong> in 20 years.`;

    // Update the chart
    updateChart(values);
}

// Function to update the graph
function updateChart(values) {
    const ctx = document.getElementById('incomeChart').getContext('2d');

    // Destroy the previous chart instance (if any) before creating a new one
    if (window.chart) {
        window.chart.destroy();
    }

    // Create a new chart with the updated data
    window.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 20 }, (_, i) => i + 1), // Years 1 to 20
            datasets: [{
                label: 'Investment Growth ($)',
                data: values,
                borderColor: '#4CAF50',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString('en-US'); // Format y-axis with commas
                        }
                    }
                }
            }
        });
}
