$.ajax({
  url: "/manage/statistic/chart",
  method: "GET",
  success: function (data) {
    var revenueByMonthOfEachBranch = data.revenueByMonthOfEachBranch;
    // add branch name to xValues
    var xValues = [];
    for (var i = 0; i < revenueByMonthOfEachBranch.length; i++) {
      xValues.push(revenueByMonthOfEachBranch[i].branch_name);
    }

    // add revenue to yValues
    var yValues = [];
    for (var i = 0; i < revenueByMonthOfEachBranch.length; i++) {
      yValues.push(revenueByMonthOfEachBranch[i].revenue);
    }

    // set color for each bar
    var barColors = [];
    for (var i = 0; i <= revenueByMonthOfEachBranch.length; i++) {
        barColors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
    }
    // Configuration options for the chart
    const options = {
      responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
            }],
        }

    };

    new Chart("myChart", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [
          {
            backgroundColor: barColors,
            data: yValues,
          },
        ],
      },
      options: options
    });
    // TOTAL REVENUE
    var totalRevenue = 0;
    for (var i = 0; i < revenueByMonthOfEachBranch.length; i++) {
      totalRevenue += revenueByMonthOfEachBranch[i].revenue;
    }
    // REVENUE
    var revenueByMonth = document.getElementById("revenue");
    revenueByMonth.innerHTML = `<p>REVENUE BY ${revenueByMonthOfEachBranch[0].month.toUpperCase()} : $${totalRevenue.toFixed(2)}</p>`;
  },
  error: function (error) {
    console.log(error);
  },
});
