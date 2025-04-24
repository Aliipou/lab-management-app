import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { labApi } from "../../api/labApi";
import { deviceApi } from "../../api/deviceApi";
import LabDetailComponent from "../../components/labs/LabDetail";

const LabDetail = () => {
  const { labId } = useParams();
  const [lab, setLab] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [safetyGuidance, setSafetyGuidance] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabData = async () => {
      if (!labId) {
        setError("Lab ID is missing");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        console.log("Fetching lab with ID:", labId);
        
        // Fetch lab data
        const labData = await labApi.getLabById(labId);
        console.log("Lab data received:", labData);
        setLab(labData);

        // Fetch lab pictures
        const picturesData = await labApi.getLabPictures(labId);
        console.log("Lab pictures:", picturesData);
        setPictures(picturesData);

        // Fetch safety guidance
        const guidanceData = await labApi.getSafetyGuidance(labId);
        console.log("Safety guidance:", guidanceData);
        setSafetyGuidance(guidanceData);

        // Fetch devices in this lab
        const devicesData = await deviceApi.getDevicesByLabId(labId);
        console.log("Lab devices:", devicesData);
        setDevices(devicesData);

        setError(null);
      } catch (err) {
        console.error("Error fetching lab details:", err);
        setError("Failed to load lab details");
      } finally {
        setLoading(false);
      }
    };

    fetchLabData();
  }, [labId]);

  return (
    <LabDetailComponent
      lab={lab}
      safetyGuidance={safetyGuidance}
      pictures={pictures}
      devices={devices}
      loading={loading}
      error={error}
    />
  );
};

export default LabDetail;
