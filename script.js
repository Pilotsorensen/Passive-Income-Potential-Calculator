function calculateIncome() {
    // Get user input values
    const investment = parseFloat(document.getElementById('investment').value);
    const incomeStream = document.getElementById('incomeStream').value;
    const involvement = document.getElementById('involvement').value;
    const timeframe = parseInt(document.getElementById('timeframe').value);

    // Check if the investment value is a valid number
    if (isNaN(investment) || investment <= 0) {
        alert("Please enter a valid investment amount.");
        return;
    }

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

    // Calculate the effective ROI after considering the involvement multiplier
    const effectiveRoi = roi * multiplier;

    // Calculate the projected values over the selected timeframe
    const values = [];
    let labels = [];
    
    if (timeframe > 5) {
        // Generate yearly labels and values if timeframe is above 5 years
        for (let year = 1; year <= timeframe; year++) {
            const futureValue = investment * Math.pow(1 + effectiveRoi, year);
            values.push(futureValue);
            labels.push(year); // Label by year
        }
    } else {
        // Generate monthly labels and values if timeframe is 5 years or below
        for (let month = 1; month <= timeframe * 12; month++) {
            const futureValue = investment * Math.pow(1 + effectiveRoi / 12, month);
            values.push(futureValue);
            labels.push(month); // Label by month
        }
    }

    // Format final projected value
    const formattedValue = values[values.length - 1].toLocaleString('en-US');

    // Display the result
    document.getElementById('result').innerHTML = `Your investment will grow to <strong>$${formattedValue}</strong> in ${timeframe} years.`;

    // Update the chart with calculated values and labels
    updateChart(labels, values);
}

function updateChart(labels, values) {
    const ctx = document.getElementById('incomeChart').getContext('2d');

    // Destroy previous chart instance if it exists
    if (window.chart) {
        window.chart.destroy();
    }

    // Create new chart with the updated data
    window.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
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
                x: {
                    title: {
                        display: true,
                        text: labels.length > 60 ? 'Years' : 'Months'
                    },
                    ticks: {
                        callback: function(value, index) {
                            // Show only select labels for readability
                            return labels.length > 60 ? labels[index] : (index % 12 === 0 ? labels[index] : '');
                        }
                    }
                },
                y: {
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString('en-US');
                        }
                    }
                }
            }
        }
    });
}
