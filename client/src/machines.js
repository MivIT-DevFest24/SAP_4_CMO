import welding_robot_006 from "@/assets/images/welding_robot_006.jpg";
import stamping_press_001 from "@/assets/images/stamping_press_001.jpg";
import painting_robot_002 from "@/assets/images/painting_robot_002.jpg";
import agv_003 from "@/assets/images/agv_003.jpg";
import cnc_milling_004 from "@/assets/images/cnc_milling_004.jpg";
import leak_test_005 from "@/assets/images/leak_test_005.jpg";

export default {
  stamping_press_001: {
    id: "stamping_press_001",
    name: "Stamping Press 001",
    status: "inactive",
    type: "stamping",
    sector: "welding frames",
    location: "workshop",
    last_maintenance: "2021-07-28",
    next_maintenance: "2021-08-28",
    sensor_data: {
      temperature: 45,
      humidity: 70,
      pressure: 1000,
    },
    image: stamping_press_001,
  },
  painting_robot_002: {
    id: "painting_robot_002",
    name: "Painting Robot 002",
    status: "active",
    type: "painting",
    sector: "painting bodies",
    location: "workshop",
    last_maintenance: "2021-07-28",
    next_maintenance: "2021-08-28",
    sensor_data: {
      temperature: 45,
      humidity: 70,
      pressure: 1000,
    },
    image: painting_robot_002,
  },
  agv_003: {
    id: "agv_003",
    name: "AGV 003",
    status: "active",
    type: "transport",
    sector: "welding frames",
    location: "warehouse",
    last_maintenance: "2021-07-28",
    next_maintenance: "2021-08-28",
    sensor_data: {
      temperature: 45,
      humidity: 70,
      pressure: 1000,
    },
    image: agv_003,
  },
  cnc_milling_004: {
    id: "cnc_milling_004",
    name: "CNC Milling 004",
    status: "active",
    type: "milling",
    sector: "painting bodies",
    location: "workshop",
    last_maintenance: "2021-07-28",
    next_maintenance: "2021-08-28",
    sensor_data: {
      temperature: 45,
      humidity: 70,
      pressure: 1000,
    },
    image: cnc_milling_004,
  },
  leak_test_005: {
    id: "leak_test_005",
    name: "Leak Test 005",
    status: "active",
    type: "testing",
    sector: "assembling engines",
    location: "workshop",
    last_maintenance: "2021-07-28",
    next_maintenance: "2021-08-28",
    sensor_data: {
      temperature: 45,
      humidity: 70,
      pressure: 1000,
    },
    image: leak_test_005,
  },
  welding_robot_006: {
    id: "welding_robot_006",
    name: "Welding Robot 006",
    status: "active",
    type: "welding",
    sector: "assembling engines",
    location: "workshop",
    last_maintenance: "2021-07-28",
    next_maintenance: "2021-08-28",
    sensor_data: {
      temperature: 45,
      humidity: 70,
      pressure: 1000,
    },
    image: welding_robot_006,
  },
};
