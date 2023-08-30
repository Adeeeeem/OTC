-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2019 at 01:50 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `otc`
--

-- --------------------------------------------------------

--
-- Table structure for table `arrondissement`
--

CREATE TABLE `arrondissement` (
  `arrondissement_id` int(3) NOT NULL,
  `arrondissement_code` int(3) NOT NULL,
  `arrondissement_name` varchar(50) NOT NULL,
  `direction_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `arrondissement`
--

INSERT INTO `arrondissement` (`arrondissement_id`, `arrondissement_code`, `arrondissement_name`, `direction_id`) VALUES
(1, 51, 'ARRONDISSEMENT DE NABEUL', 1),
(2, 52, 'ARRONDISSEMENT DE BIZERTE', 1),
(3, 57, 'ARRONDISSEMENT DE TUNIS', 1),
(4, 58, 'ARRONDISSEMENT DE L\'ARIANA', 1),
(5, 60, 'ARRONDISSEMENT DE B.AROUS', 1),
(6, 61, 'ARRONDISSEMENT DE MANOUBA', 1),
(7, 62, 'ARRONDISSEMENT DE ZAGHOUAN', 1),
(8, 14, 'BRIGADE MOBILE I NORD OUEST', 2),
(9, 21, 'BRIGADE MOBILE II NORD OUEST', 2),
(10, 31, 'B. I. RAPIDE NORD OUEST', 2),
(11, 53, 'ARRONDISSEMENT DE BEJA', 2),
(12, 54, 'ARRONDISSEMENT DE KEF', 2),
(13, 55, 'ARRONDISSEMENT DE KASSERINE', 2),
(14, 56, 'ARRONDISSEMENT DE JANDOUBA', 2),
(15, 59, 'ARRONDISSEMENT DE SELIANA', 2),
(16, 45, 'SERVICE LOTISSEMENT AU SOL', 3),
(17, 46, 'SERVICE T.P. DIVERS', 3),
(18, 47, 'SERVICE COOPROPRIETE', 3),
(19, 48, 'SERVICE GEODESIE', 3),
(20, 49, 'BRIGADE PROJET', 3),
(21, 141, 'CATOGRAPHIE NUMERIQUE', 3),
(22, 156, 'CARTOTHEQUES (SIEGE)', 3),
(23, 157, 'ABONNEMENT GNSS', 3),
(24, 12, 'BRIGADE MOBILE I CENTRE', 4),
(25, 22, 'BRIGADE MOBILE II CENTRE', 4),
(26, 32, 'B.I. RAPIDE CENTRE', 4),
(27, 63, 'ARRONDISSEMENT DE SOUSSE', 4),
(28, 64, 'ARRONDISSEMENT DE MONASTIR', 4),
(29, 65, 'ARRONDISSEMENT DE MAHDIA', 4),
(30, 66, 'ARRONDISSEMENT DE KAIROUAN', 4),
(31, 67, 'ARRONDISSEMENT DE SIDI BOUZID', 4),
(32, 13, 'BRIGADE MOBILE I SUD', 5),
(33, 23, 'BRIGADE MOBILE II SUD', 5),
(34, 33, 'B.I. RAPIDE SUD', 5),
(35, 68, 'ARRONDISSEMENT DE SFAX', 5),
(36, 69, 'ARRONDISSEMENT DE GAFSA', 5),
(37, 71, 'ARRONDISSEMENT DE GABES', 5),
(38, 72, 'ARRONDISSEMENT DE MEDNINE', 5),
(39, 73, 'ARRONDISSEMENT DE JERBA', 5),
(40, 74, 'ARRONDISSEMENT DE KEBILI', 5),
(41, 75, 'ARRONDISSEMENT DE TOZEUR', 5),
(42, 76, 'ARRONDISSEMENT DE TATAOUINE', 5),
(43, 42, 'CONFECTION DU PLAN', 6),
(44, 15, 'BRIGADE MOBILE I NORD EAST', 11);

-- --------------------------------------------------------

--
-- Table structure for table `direction`
--

CREATE TABLE `direction` (
  `direction_id` int(3) NOT NULL,
  `direction_code` int(3) NOT NULL,
  `direction_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `direction`
--

INSERT INTO `direction` (`direction_id`, `direction_code`, `direction_name`) VALUES
(1, 7, 'DIRECTION REGIONALE NORD EST'),
(2, 8, 'DIRECTION REGIONALE NORD OUEST'),
(3, 9, 'DIRECTION TRAV.TOPOG. ET GEODESIE'),
(4, 10, 'DIRECTION REGIONALE CENTRE'),
(5, 11, 'DIRECTION REGIONALE SUD'),
(6, 16, 'DIRECTION CADASTRE'),
(7, 114, 'IMPRIMERIE'),
(8, 115, 'DIRECTION GENERALE'),
(9, 118, 'DIRECTION MARK ET DEV. COMMER.'),
(10, 129, 'DIRECTION FINANC. ET COMPTABLE'),
(11, 132, 'DIRECTION SYSTEME D INFORMATIQUE ET PLANIFiCATION');

-- --------------------------------------------------------

--
-- Table structure for table `folder`
--

CREATE TABLE `folder` (
  `receipt_id` int(100) NOT NULL,
  `receipt_number` int(100) NOT NULL,
  `user_id` int(10) NOT NULL,
  `folder_number` int(10) NOT NULL,
  `folder_cadastre` int(10) NOT NULL,
  `folder_type` enum('CARTON','CALQUE','CODEATRACE','DOSSIER CADASTRE','PLAN MINUTE') NOT NULL,
  `folder_ration` varchar(10) NOT NULL,
  `folder_name` varchar(50) NOT NULL,
  `folder_carton` int(10) NOT NULL,
  `folder_plans` int(10) NOT NULL,
  `folder_date_out` date NOT NULL,
  `folder_date_limit` date NOT NULL,
  `folder_date_in` date DEFAULT NULL,
  `folder_stat` enum('EXISTE','RESERVED','RETARD') NOT NULL DEFAULT 'RESERVED'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `user_id` int(10) NOT NULL,
  `history_date` date NOT NULL,
  `history_time` time NOT NULL,
  `history_command` enum('C','D','WP','AA','EA','DA','AC','EC','DC','AT','ET','DT','AR','FO','FI') NOT NULL,
  `history_related` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(10) NOT NULL,
  `user_matricule` varchar(10) NOT NULL,
  `user_password` varchar(25) NOT NULL,
  `user_fname` varchar(15) NOT NULL,
  `user_lname` varchar(15) NOT NULL,
  `user_type` enum('admin','archivist','technician') NOT NULL,
  `arrondissement_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `arrondissement`
--
ALTER TABLE `arrondissement`
  ADD PRIMARY KEY (`arrondissement_id`),
  ADD UNIQUE KEY `code` (`arrondissement_code`),
  ADD KEY `direction` (`direction_id`);

--
-- Indexes for table `direction`
--
ALTER TABLE `direction`
  ADD PRIMARY KEY (`direction_id`),
  ADD UNIQUE KEY `code` (`direction_code`);

--
-- Indexes for table `folder`
--
ALTER TABLE `folder`
  ADD PRIMARY KEY (`receipt_id`),
  ADD KEY `folder_ibfk_1` (`user_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`user_id`,`history_date`,`history_time`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `matricule` (`user_matricule`),
  ADD KEY `arrondissement` (`arrondissement_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `arrondissement`
--
ALTER TABLE `arrondissement`
  MODIFY `arrondissement_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `direction`
--
ALTER TABLE `direction`
  MODIFY `direction_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `folder`
--
ALTER TABLE `folder`
  MODIFY `receipt_id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `arrondissement`
--
ALTER TABLE `arrondissement`
  ADD CONSTRAINT `arrondissement_ibfk_1` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `folder`
--
ALTER TABLE `folder`
  ADD CONSTRAINT `folder_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`arrondissement_id`) REFERENCES `arrondissement` (`arrondissement_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
