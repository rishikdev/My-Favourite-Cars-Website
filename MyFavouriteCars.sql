-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 14, 2022 at 08:35 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `MyFavouriteCars`
--

-- --------------------------------------------------------

--
-- Table structure for table `CarDetails`
--

CREATE TABLE `CarDetails` (
  `CompanyName` varchar(100) NOT NULL,
  `CarName` varchar(100) NOT NULL,
  `EngineDisplacementCC` int(11) NOT NULL,
  `EngineTorqueNM` int(11) NOT NULL,
  `EngineHP` int(11) NOT NULL,
  `EngineCylinder` int(11) NOT NULL,
  `EngineRPM` int(11) NOT NULL,
  `CarMileageKMPL` int(11) NOT NULL,
  `CarDescription` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `CarDetails`
--

INSERT INTO `CarDetails` (`CompanyName`, `CarName`, `EngineDisplacementCC`, `EngineTorqueNM`, `EngineHP`, `EngineCylinder`, `EngineRPM`, `CarMileageKMPL`, `CarDescription`) VALUES
('Porsche', '356 C', 1582, 117, 74, 4, 5000, 9, 'Before there was 911, the 356 series was Porsche\'s flagship series. The 356 C was the last version of the 356 series and was discontinued in 1965.'),
('Mercedes-Benz', '300 SL', 2996, 274, 215, 6, 5800, 6, 'The 300 SL, also known as \"Gullwing\", first saw the light of the day as a sports car in 1954. It offered a mind bending top speed of 250 km/h. Yes 250 km/h in 1954!  \r\n\r\nIn December 1999 it was voted Sports Car of the Century by a jury of trade journalists. Even today the 300 SL is considered the ultimate dream car.'),
('Porsche', '911 Turbo (930)', 3300, 390, 282, 6, 7200, 7, 'The 930, aka 911 Turbo, was this rear-engine sports car’s most powerful and thrilling variant. Until the advent of the twin-turbocharged 959 supercar of the mid-1980s, the 911 Turbo was the über-Porsche, and it remains highly respected and sought today. “930” was the internal chassis code for the model initially dubbed the Turbo Carrera; the prototype 911 Turbo made its public debut at the 1974 Paris Motor Show, with production beginning in 1975.'),
('Porsche', '718 Cayman S', 2497, 419, 350, 4, 4500, 8, 'If you want a Porsche but cannot afford the 911 series, look no further. Not only is the new 718 series good-looking, but it is also \"affordable\" and powerful. While the base model 718 Cayman might not be as powerful, and the GTS and GT4 versions might not be as luxurious, the Cayman S model is the perfect middle option.');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
