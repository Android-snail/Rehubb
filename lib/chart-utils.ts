import type { ChartData, ChartOptions } from "chart.js"

// Helper function to get primary color from CSS variables
export const getPrimaryColor = (opacity = 1): string => {
  // Default fallback colors if CSS variables aren't available (during SSR)
  const defaultPrimary = `rgba(253, 200, 48, ${opacity})`

  if (typeof window === "undefined") return defaultPrimary

  try {
    // Get the primary color from CSS variables
    const primaryHue = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim()

    if (!primaryHue) return defaultPrimary

    // Parse the HSL values
    const [h, s, l] = primaryHue.split(" ").map((val) => Number.parseFloat(val))
    return `hsla(${h}, ${s}%, ${l}%, ${opacity})`
  } catch (e) {
    return defaultPrimary
  }
}

// User activity data (mock data)
export const getUserActivityData = (): ChartData<"line"> => {
  return {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Active Users",
        data: [65, 72, 86, 81, 96, 110, 125, 130, 115, 102, 108, 120],
        borderColor: getPrimaryColor(0.8),
        backgroundColor: getPrimaryColor(0.1),
        tension: 0.4,
        fill: true,
      },
      {
        label: "New Registrations",
        data: [25, 32, 46, 41, 56, 70, 85, 90, 75, 62, 68, 80],
        borderColor: getPrimaryColor(0.5),
        backgroundColor: getPrimaryColor(0.05),
        tension: 0.4,
        fill: true,
        borderDash: [5, 5],
      },
    ],
  }
}

// Proposal submissions data (mock data)
export const getProposalSubmissionsData = (): ChartData<"bar"> => {
  return {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Submitted",
        data: [18, 25, 30, 22, 17, 29],
        backgroundColor: getPrimaryColor(0.8),
      },
      {
        label: "Approved",
        data: [12, 19, 22, 15, 12, 20],
        backgroundColor: getPrimaryColor(0.5),
      },
      {
        label: "Rejected",
        data: [6, 6, 8, 7, 5, 9],
        backgroundColor: "rgba(239, 68, 68, 0.7)",
      },
    ],
  }
}

// User distribution data (mock data)
export const getUserDistributionData = (): ChartData<"doughnut"> => {
  return {
    labels: ["Researchers", "Administrators", "Reviewers", "Students"],
    datasets: [
      {
        data: [65, 15, 10, 10],
        backgroundColor: [getPrimaryColor(0.8), getPrimaryColor(0.6), getPrimaryColor(0.4), getPrimaryColor(0.2)],
        borderColor: "hsl(var(--background))",
        borderWidth: 2,
      },
    ],
  }
}

// User engagement data (mock data)
export const getUserEngagementData = (): ChartData<"radar"> => {
  return {
    labels: ["Proposals", "Comments", "Reviews", "Downloads", "Uploads", "Logins"],
    datasets: [
      {
        label: "Current Month",
        data: [85, 70, 60, 90, 75, 95],
        backgroundColor: getPrimaryColor(0.2),
        borderColor: getPrimaryColor(0.8),
        pointBackgroundColor: getPrimaryColor(1),
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: getPrimaryColor(1),
      },
      {
        label: "Previous Month",
        data: [65, 60, 50, 80, 65, 85],
        backgroundColor: "rgba(156, 163, 175, 0.2)",
        borderColor: "rgba(156, 163, 175, 0.8)",
        pointBackgroundColor: "rgba(156, 163, 175, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(156, 163, 175, 1)",
      },
    ],
  }
}

// Chart options
export const lineChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      mode: "index",
      intersect: false,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: getPrimaryColor(0.5),
      borderWidth: 1,
      padding: 10,
      displayColors: true,
      usePointStyle: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(156, 163, 175, 0.1)",
      },
      ticks: {
        color: "rgba(156, 163, 175, 0.8)",
      },
    },
    x: {
      grid: {
        color: "rgba(156, 163, 175, 0.1)",
      },
      ticks: {
        color: "rgba(156, 163, 175, 0.8)",
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 3,
      hoverRadius: 5,
    },
  },
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
}

export const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      mode: "index",
      intersect: false,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: getPrimaryColor(0.5),
      borderWidth: 1,
      padding: 10,
      displayColors: true,
      usePointStyle: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(156, 163, 175, 0.1)",
      },
      ticks: {
        color: "rgba(156, 163, 175, 0.8)",
      },
    },
    x: {
      grid: {
        color: "rgba(156, 163, 175, 0.1)",
      },
      ticks: {
        color: "rgba(156, 163, 175, 0.8)",
      },
    },
  },
}

export const doughnutChartOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: getPrimaryColor(0.5),
      borderWidth: 1,
      padding: 10,
      displayColors: true,
      usePointStyle: true,
    },
  },
  cutout: "70%",
}

export const radarChartOptions: ChartOptions<"radar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: getPrimaryColor(0.5),
      borderWidth: 1,
      padding: 10,
      displayColors: true,
      usePointStyle: true,
    },
  },
  scales: {
    r: {
      angleLines: {
        color: "rgba(156, 163, 175, 0.2)",
      },
      grid: {
        color: "rgba(156, 163, 175, 0.2)",
      },
      pointLabels: {
        color: "rgba(156, 163, 175, 0.8)",
      },
      ticks: {
        backdropColor: "transparent",
        color: "rgba(156, 163, 175, 0.8)",
      },
    },
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 3,
      hoverRadius: 5,
    },
  },
}

