-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2018 at 11:25 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 5.6.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rospitals`
--

-- --------------------------------------------------------

--
-- Table structure for table `counties`
--

CREATE TABLE `counties` (
  `name` varchar(128) COLLATE utf8_romanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_romanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `fullname` varchar(256) COLLATE utf8_romanian_ci NOT NULL,
  `title` varchar(45) COLLATE utf8_romanian_ci DEFAULT NULL,
  `specialy_id` int(11) DEFAULT NULL,
  `rating` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_romanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_romanian_ci NOT NULL,
  `address` varchar(512) COLLATE utf8_romanian_ci DEFAULT NULL,
  `city` varchar(45) COLLATE utf8_romanian_ci DEFAULT NULL,
  `county` varchar(45) COLLATE utf8_romanian_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_romanian_ci DEFAULT NULL,
  `fax` varchar(45) COLLATE utf8_romanian_ci DEFAULT NULL,
  `email` varchar(128) COLLATE utf8_romanian_ci DEFAULT NULL,
  `website` varchar(128) COLLATE utf8_romanian_ci DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `long` float DEFAULT NULL,
  `type` varchar(45) COLLATE utf8_romanian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_romanian_ci;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`id`, `name`, `address`, `city`, `county`, `phone`, `fax`, `email`, `website`, `lat`, `long`, `type`) VALUES
(1, 'Spitalul Clinic Judetean de Urgenta Craiova', 'Str. Tabaci nr. 1', 'Craiova', 'Dolj', '0251 502 200, 0251 502 350, 0251 502 103', '0251 534 523', 'scjuc.craiova@gmail.com', 'www.scjuc.ro', 44.3158, 23.7982, 'stat'),
(2, 'Regina Maria Craiova', 'Str. Unirii nr.2', 'Craiova', 'Dolj', '0251 300 301', NULL, 'office.craiova@reginamaria.ro', 'www.reginamaria.ro', 44.317, 23.798, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hospitals_doctors`
--

CREATE TABLE `hospitals_doctors` (
  `hospital_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `schedule` varchar(512) COLLATE utf8_romanian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_romanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hospitals_specialties`
--

CREATE TABLE `hospitals_specialties` (
  `hospital_id` int(11) NOT NULL,
  `specialty_id` varchar(45) COLLATE utf8_romanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_romanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `hospital_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `treatment_quality` float NOT NULL COMMENT 'Quality of treatment received',
  `facilities` float NOT NULL COMMENT 'Hospital, practice and GP surgery facilities',
  `appointment` float NOT NULL COMMENT 'Appointment booking, procedures and waiting times',
  `staff` float NOT NULL COMMENT 'Interactions with staff',
  `safety` float NOT NULL COMMENT 'Health and safety',
  `cleanliness` float NOT NULL COMMENT 'Cleanliness',
  `accessibility` float NOT NULL COMMENT 'Accessibility of facilities'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_romanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `specialties`
--

CREATE TABLE `specialties` (
  `id` int(11) NOT NULL,
  `name` varchar(256) COLLATE utf8_romanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_romanian_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `counties`
--
ALTER TABLE `counties`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hospitals_doctors`
--
ALTER TABLE `hospitals_doctors`
  ADD PRIMARY KEY (`hospital_id`,`doctor_id`);

--
-- Indexes for table `hospitals_specialties`
--
ALTER TABLE `hospitals_specialties`
  ADD PRIMARY KEY (`hospital_id`,`specialty_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`hospital_id`);

--
-- Indexes for table `specialties`
--
ALTER TABLE `specialties`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
