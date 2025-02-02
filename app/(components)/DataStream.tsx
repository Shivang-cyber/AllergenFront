import React, { use, useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import axios from "axios";
const WS_URL = "ws://localhost:3000";
interface Recipe {
  recipe_name: string;
  allergens: string[];
  flagged_ingredients: { [key: string]: string[] };
  unrecognized_ingredients: string[];
  message: string;
}
const DataStream = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Recipe[]>([]);
  const [clientId, setClientId] = useState("");

  const { lastMessage, readyState } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    onOpen: () => console.log("Connected to WebSocket"),
    onClose: () => console.log("WebSocket Disconnected"),
    onError: (event) => console.error("WebSocket Error:", event),
    onMessage: (event) => {
      let data = JSON.parse(event.data);
      if (data.type === "connected") {
        setClientId(data.clientId);
        alert("Connected to WebSocket");
        console.log("Connected to WebSocket");
      } else {
        setLoading(false);
        setMessages((prev) => [...prev, data]);
      }
    },
  });

  const handleUpload = async (event: any) => {
    event.preventDefault();
    if (!file ) {
      setError("Please select a valid .xlsx file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("clientId", clientId);

    try {
      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setFile(null);
        setLoading(true);
        alert("File uploaded successfully");
      } else {
        alert("File upload failed");
      }
    } catch (error) {
      alert("Error uploading file");
      console.error(error);
    }
  };

  return {
    loading,
    file,
    setFile,
    handleUpload,
    messages,
    wsStatus: readyState === 1 ? "Connected" : "Disconnected",
  };
};

export default DataStream;
