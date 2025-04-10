import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../utils/dateUtils";

const ScheduleCalendar = ({ schedules, onDelete }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get the first day of the month
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  // Get the number of days in the month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Previous and next month navigation
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Get schedules for a specific day
  const getSchedulesForDay = (day) => {
    const dateToCheck = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    return schedules.filter((schedule) => {
      const startDate = new Date(schedule.startTime);
      return (
        startDate.getDate() === day &&
        startDate.getMonth() === dateToCheck.getMonth() &&
        startDate.getFullYear() === dateToCheck.getFullYear()
      );
    });
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="border bg-gray-50 h-24 md:h-32"
        ></div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const daySchedules = getSchedulesForDay(day);
      const isToday =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={day}
          className={`border h-24 md:h-32 p-1 overflow-hidden ${
            isToday ? "bg-blue-50" : ""
          }`}
        >
          <div className="flex justify-between">
            <span
              className={`text-sm font-bold ${isToday ? "text-blue-600" : ""}`}
            >
              {day}
            </span>
          </div>
          <div className="mt-1 overflow-y-auto h-16 md:h-24 text-xs space-y-1">
            {daySchedules.map((schedule) => (
              <Link
                key={schedule.scheduleId}
                to={`/schedules/edit/${schedule.scheduleId}`}
                className="block p-1 rounded bg-blue-100 text-blue-800 truncate hover:bg-blue-200"
              >
                {formatTime(schedule.startTime)} -{" "}
                {formatTime(schedule.endTime)}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded text-sm"
          >
            &lt;
          </button>
          <h2 className="text-xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={goToNextMonth}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded text-sm"
          >
            &gt;
          </button>
        </div>
        <Link
          to="/schedules/new"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
        >
          New Schedule
        </Link>
      </div>

      <div className="grid grid-cols-7 gap-px">
        {/* Calendar header */}
        {dayNames.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-gray-600 bg-gray-100"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default ScheduleCalendar;
