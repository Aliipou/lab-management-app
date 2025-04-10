export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + "...";
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return "";

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatStatus = (status) => {
  if (!status) return "";

  switch (status.toLowerCase()) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    case "pending":
      return "Pending";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return capitalizeFirstLetter(status);
  }
};
