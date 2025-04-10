import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...rest
}) => {
  const baseStyle =
    "rounded font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50";

  const variantStyle = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500",
    info: "bg-blue-400 hover:bg-blue-500 text-white focus:ring-blue-400",
  };

  const sizeStyle = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-md",
    lg: "py-3 px-6 text-lg",
  };

  const disabledStyle = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} ${disabledStyle} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
