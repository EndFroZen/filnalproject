-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for finalweb01
CREATE DATABASE IF NOT EXISTS `finalweb01` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `finalweb01`;

-- Dumping structure for table finalweb01.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `user_order` varchar(5000) NOT NULL,
  `kiloneed` decimal(20,2) NOT NULL DEFAULT 0.00,
  `productID` int(11) NOT NULL,
  PRIMARY KEY (`orderID`),
  KEY `productID` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table finalweb01.orders: ~0 rows (approximately)

-- Dumping structure for table finalweb01.products
CREATE TABLE IF NOT EXISTS `products` (
  `productID` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(5000) NOT NULL DEFAULT '',
  `storeID` int(11) NOT NULL,
  `imagePath` varchar(5000) NOT NULL DEFAULT '',
  `kilogram` decimal(20,2) NOT NULL DEFAULT 0.00,
  `price` decimal(20,2) NOT NULL DEFAULT 0.00,
  `typeID` int(11) NOT NULL,
  `dateTime` varchar(5000) NOT NULL DEFAULT '',
  PRIMARY KEY (`productID`),
  KEY `storeID` (`storeID`),
  KEY `typeID` (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table finalweb01.products: ~0 rows (approximately)

-- Dumping structure for table finalweb01.stores
CREATE TABLE IF NOT EXISTS `stores` (
  `storeID` int(11) NOT NULL AUTO_INCREMENT,
  `storeName` varchar(5000) NOT NULL DEFAULT '',
  PRIMARY KEY (`storeID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table finalweb01.stores: ~4 rows (approximately)
INSERT INTO `stores` (`storeID`, `storeName`) VALUES
	(1, 'ทอฟันหมูสด'),
	(2, 'tescolotus'),
	(3, 'ร้านที่3'),
	(4, 'ร้านที่4');

-- Dumping structure for table finalweb01.types
CREATE TABLE IF NOT EXISTS `types` (
  `typeID` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(5000) NOT NULL DEFAULT '',
  PRIMARY KEY (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table finalweb01.types: ~5 rows (approximately)
INSERT INTO `types` (`typeID`, `typeName`) VALUES
	(1, 'หมู'),
	(2, 'เนื้อ'),
	(3, 'ไก่'),
	(4, 'ผัก'),
	(5, 'อาหารทะเล');

-- Dumping structure for table finalweb01.users
CREATE TABLE IF NOT EXISTS `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(5000) NOT NULL,
  `email` varchar(5000) NOT NULL,
  `password` varchar(5000) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table finalweb01.users: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
