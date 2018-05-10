-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2018 at 10:18 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.4

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
  `specialty_id` int(11) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `rank` varchar(50) COLLATE utf8_romanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_romanian_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `fullname`, `title`, `specialty_id`, `rating`, `rank`) VALUES
(1, 'Dan Popescu', 'medic primar', 3, 0, 'medic primar'),
(2, 'Sorin Florescu', 'medic specialist', 11, 0, 'medic specialist'),
(3, 'Marius Enache', 'medic primar', 4, 0, 'medic primar'),
(4, 'Mihai Stan', 'medic primar', 6, 0, 'medic primar'),
(5, 'Vasile Ciurea', 'medic primar', 17, 0, 'medic primar'),
(6, 'Sorin Vasilache', 'medic primar', 21, 0, 'medic primar'),
(7, 'Andrei Cezar', 'medic specialist', 22, 0, 'medic specialist'),
(8, 'Lorena Marcu', 'medic specialist', 20, 0, 'medic specialist'),
(9, 'Cosmina Deac', 'medic specialist', 24, 0, 'medic specialist'),
(10, 'Luana Vasile', 'medic primar', 23, 0, 'medic primar'),
(11, 'Izabela Lucescu', 'medic specialist', 2, 0, 'medic specialist'),
(12, 'Andreea Ghinda', 'medic specialist', 1, 0, 'medic specialist'),
(13, 'Adrian Popescu', 'medic specialist', 7, 0, 'medic specialist'),
(14, 'Luiza Stanescu', 'medic specialist', 5, 0, 'medic specialist'),
(15, 'Valentin Butoi', 'medic specialist', 8, 0, 'medic specialist'),
(16, 'Carla Dobre', 'medic specialist', 10, 0, 'medic specialist'),
(17, 'Constantin Ion', 'medic primar', 13, 0, 'medic primar'),
(18, 'Adina Suciu', 'medic specialist', 9, 0, 'medic specialist'),
(19, 'Cerasela Paun', 'medic specialist', 12, 0, 'medic specialist'),
(20, 'Dorin Paunescu', 'medic primar', 14, 0, 'medic primar'),
(21, 'Florina Petrescu', 'medic primar', 15, 0, 'medic primar'),
(22, 'Cosmin Vasile', 'medic specialist', 25, 0, 'medic specialist'),
(23, 'Paul Ionescu', 'medic primar', 16, 0, 'medic primar'),
(24, 'Madalina Ivascu', 'medic primar', 18, 0, 'medic primar'),
(25, 'Florin Mihaescu', 'medic primar', 19, 0, 'medic primar');

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
  `lat` double DEFAULT NULL,
  `long` double DEFAULT NULL,
  `type` varchar(45) COLLATE utf8_romanian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_romanian_ci;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`id`, `name`, `address`, `city`, `county`, `phone`, `fax`, `email`, `website`, `lat`, `long`, `type`) VALUES
(1, 'Spitalul Clinic Judetean de Urgenta Craiova', 'Str. Tabaci nr. 1', 'Craiova', 'Dolj', '0251 502 200, 0251 502 350, 0251 502 103', '0251 534 523', 'scjuc.craiova@gmail.com', 'www.scjuc.ro', 44.30559, 23.7926279, 'stat'),
(2, 'Regina Maria Craiova', 'Str. Unirii nr.2', 'Craiova', 'Dolj', '0251 300 301', NULL, 'office.craiova@reginamaria.ro', 'www.reginamaria.ro', 44.3230757, 23.7960669, 'privat'),
(3, 'Spitalul Clinic de Boli Infectioase si Pneumoftiziologie Craiova', 'Str. Calea Bucuresti nr. 126', 'Craiova', 'Dolj', '0372 273 665', '0251 542 157', 'vbabes@rdscv.ro', 'www.vbabes-cv.ro', 44.3148639, 23.8250946, 'stat'),
(4, 'Spitalul Clinic de Neuropsihiatrie Craiova', 'Str. Calea Bucuresti nr. 99', 'Craiova', 'Dolj', '0251 597 791', '', 'contact@scnpc.ro ', 'www.scnpc.ro', 44.3176797, 23.8162409, 'stat'),
(5, 'Spitalul Orasenesc Filiasi', 'Bdul Racoteanu nr. 216', 'Filiasi', 'Dolj', '0251 441 537', '', 'spitalul_filiasi@yahoo.com', 'www.spitalulfiliasi.ro', 44.558227, 23.5025713, 'stat'),
(6, 'Spitalul Municipal Prof. Dr. Irinel Popescu Bailesti', 'Str. Victoriei nr. 24', 'Bailesti', 'Dolj', '0251 311 207', '0251 311 627', 'spital_bailesti@yahoo.com', 'www.spitalbailesti.ro', 44.029522, 23.349387, 'stat'),
(7, 'Spitalul Orasenesc Segarcea', 'Str. Unirii nr. 50', 'Segarcea', 'Dolj', '0251 210 423', '0251 210 900', 'sosegarcea@gmail.com', 'www.spitalsegarcea.ro', 44.0995902, 23.7433322, 'stat'),
(8, 'Spitalul Municipal Calafat', 'Str.Traian nr. 5', 'Calafat', 'Dolj', '0251 230 606', '0251 230 746', '', 'www.spitalcalafat.ro', 43.9941581, 22.9438492, 'stat'),
(9, 'Spitalul Clinic Cai Ferate Craiova', 'Str. Stirbei-Voda nr. 6', 'Craiova', 'Dolj', '0251 532 436', '0251 533 534', 'spitalulccfcraiova@yahoo.com', 'spitalcf.oltenia.ro', 44.3139134, 23.7938561, 'stat'),
(10, 'Spitalul Clinic Municipal Filantropia Craiova', 'Str. Mihai Viteazu nr. 20', 'Craiova', 'Dolj', '0251 307 500', '', 'spitalulfilantropiacraiova@gmail.com', 'www.filantropia.ro', 44.3223263, 23.7913939, 'stat');

-- --------------------------------------------------------

--
-- Table structure for table `hospitals_doctors`
--

CREATE TABLE `hospitals_doctors` (
  `hospital_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `schedule` varchar(512) COLLATE utf8_romanian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_romanian_ci;

--
-- Dumping data for table `hospitals_doctors`
--

INSERT INTO `hospitals_doctors` (`hospital_id`, `doctor_id`, `schedule`) VALUES
(1, 1, 'L-V: 8 - 16'),
(1, 2, 'L-V: 8 - 17'),
(1, 3, 'L-V: 9 - 17'),
(1, 4, 'L-V: 9 - 13'),
(1, 5, 'L-V: 9 - 17'),
(1, 6, 'L-V: 9 - 17'),
(1, 7, 'L-V: 9 - 13'),
(1, 8, 'L-V: 8 - 16'),
(1, 9, 'L-V: 8 - 16'),
(1, 10, 'L-V: 8 - 16'),
(1, 11, 'L-V: 8 - 16'),
(1, 15, 'L-V: 8 - 16'),
(1, 16, 'L-V: 8 - 16'),
(1, 18, 'L-V: 8 - 16'),
(1, 24, 'L-V: 8 - 16'),
(1, 25, 'L-V: 8 - 16'),
(2, 8, 'L-V: 9 - 16'),
(2, 19, 'L-V: 8 - 16'),
(2, 22, 'L-V: 9 - 16'),
(2, 25, 'L-V: 9 - 16'),
(3, 6, 'L-V: 8 - 16'),
(3, 9, 'L-V: 8 - 16'),
(3, 12, 'L-V: 8 - 16'),
(3, 13, 'L-V: 8 - 16'),
(4, 2, 'L-V: 8 - 16'),
(4, 17, 'L-V: 8 - 16'),
(4, 19, 'L-V: 8 - 16'),
(5, 7, 'L-V: 9 - 16'),
(5, 15, 'L-V: 8 - 16'),
(5, 20, 'L-V: 8 - 16'),
(5, 21, 'L-V: 9 - 17'),
(6, 1, 'L-V: 9 - 16'),
(6, 6, 'L-V: 9 - 15'),
(6, 10, 'L-V: 9 - 16'),
(6, 11, 'L-V: 8 - 16'),
(6, 21, 'L-V: 8 - 16'),
(7, 5, 'L-V: 8 - 16'),
(7, 13, 'L-V: 9 - 15'),
(7, 14, 'L-V: 8 - 16'),
(7, 18, 'L-V: 9 - 15'),
(8, 7, 'L-V: 8 - 16'),
(8, 17, 'L-V: 8 - 16'),
(8, 21, 'L-V: 8 - 16'),
(8, 22, 'L-V: 8 - 16'),
(8, 25, 'L-V: 8 - 16'),
(9, 3, 'L-V: 14-20'),
(9, 10, 'L-V: 12-18'),
(9, 14, 'L-V: 9 - 16'),
(9, 15, 'L-V: 9 - 16'),
(9, 16, 'L-V: 9 - 16'),
(10, 2, 'L-V: 9 - 16'),
(10, 3, 'L-V: 8 - 16'),
(10, 4, 'L-V: 8 - 16'),
(10, 5, 'L-V: 9 - 16'),
(10, 7, 'L-V: 9 - 16'),
(10, 15, 'L-V: 9 - 16'),
(10, 23, 'L-V: 8 - 16');

-- --------------------------------------------------------

--
-- Table structure for table `hospitals_specialties`
--

CREATE TABLE `hospitals_specialties` (
  `hospital_id` int(11) NOT NULL,
  `specialty_id` varchar(45) COLLATE utf8_romanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_romanian_ci;

--
-- Dumping data for table `hospitals_specialties`
--

INSERT INTO `hospitals_specialties` (`hospital_id`, `specialty_id`) VALUES
(1, '1'),
(1, '10'),
(1, '11'),
(1, '12'),
(1, '13'),
(1, '14'),
(1, '15'),
(1, '16'),
(1, '17'),
(1, '18'),
(1, '19'),
(1, '2'),
(1, '20'),
(1, '21'),
(1, '22'),
(1, '23'),
(1, '24'),
(1, '25'),
(1, '26'),
(1, '27'),
(1, '3'),
(1, '4'),
(1, '5'),
(1, '6'),
(1, '7'),
(1, '8'),
(1, '9'),
(2, '13'),
(2, '2'),
(2, '22'),
(2, '4'),
(2, '5'),
(3, '1'),
(3, '11'),
(3, '12'),
(3, '15'),
(3, '2'),
(3, '21'),
(3, '3'),
(4, '13'),
(4, '17'),
(4, '19'),
(4, '2'),
(4, '20'),
(4, '24'),
(4, '25'),
(4, '27'),
(4, '6'),
(5, '14'),
(5, '16'),
(5, '3'),
(5, '7'),
(5, '8'),
(5, '9'),
(6, '1'),
(6, '13'),
(6, '18'),
(6, '2'),
(6, '21'),
(6, '23'),
(6, '3'),
(6, '4'),
(6, '8'),
(7, '11'),
(7, '22'),
(7, '25'),
(7, '3'),
(7, '7'),
(7, '8'),
(8, '1'),
(8, '11'),
(8, '12'),
(8, '16'),
(8, '25'),
(8, '26'),
(8, '27'),
(8, '4'),
(9, '1'),
(9, '10'),
(9, '12'),
(9, '13'),
(9, '16'),
(9, '17'),
(9, '2'),
(9, '23'),
(9, '25'),
(9, '27'),
(9, '3'),
(9, '4'),
(9, '5'),
(10, '13'),
(10, '17'),
(10, '18'),
(10, '19'),
(10, '2'),
(10, '21'),
(10, '23'),
(10, '24'),
(10, '25'),
(10, '3'),
(10, '8');

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
-- Dumping data for table `specialties`
--

INSERT INTO `specialties` (`id`, `name`) VALUES
(1, 'Alergologie si imunologie'),
(2, 'Anestezie si terapie intensiva'),
(3, 'Cardiologie'),
(4, 'Chirurgie generala'),
(5, 'Chirurgie pediatrica'),
(6, 'Chirurgie toracica'),
(7, 'Dermato-venerice'),
(8, 'Diabet zaharat, nutritie si boli metabolice'),
(9, 'Endocrinologie'),
(10, 'Epidemiologie'),
(11, 'Gastroenterologie'),
(12, 'Hematologie'),
(13, 'Interne'),
(14, 'Medicina de familie'),
(15, 'Medicina de laborator'),
(16, 'Medicina muncii'),
(17, 'Nefrologie'),
(18, 'Neonatologie'),
(19, 'Neurochirurgie'),
(20, 'Neurologie'),
(21, 'Oftalmologie'),
(22, 'ORL'),
(23, 'Ortopedie'),
(24, 'Psihiatrie'),
(25, 'Radiologie'),
(26, 'Reumatologie'),
(27, 'Urologie');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `specialties`
--
ALTER TABLE `specialties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
