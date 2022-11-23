-- MariaDB dump 10.19  Distrib 10.7.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: sql_exam
-- ------------------------------------------------------
-- Server version	10.7.3-MariaDB-1:10.7.3+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `examination_sheet_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sql_text` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `result_table` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '(DC2Type:array)',
  `result_error` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `check_right` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_DADD4A251E27F6BF` (`question_id`),
  KEY `IDX_DADD4A25C93C7CDC` (`examination_sheet_id`),
  CONSTRAINT `FK_DADD4A251E27F6BF` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`),
  CONSTRAINT `FK_DADD4A25C93C7CDC` FOREIGN KEY (`examination_sheet_id`) REFERENCES `examination_sheet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES
('3444c782-733a-44be-8279-6d020738964b','4770872d-4033-4a02-9996-b3fc7feaec3d','3a2b3624-9e7b-42f4-8d59-cbdc39379b23','','N;',NULL,'2022-10-06 13:43:17','2022-10-06 13:43:17',NULL),
('868e1d13-763f-45a3-a586-a8de4c73a24a','4770872d-4033-4a02-9996-b3fc7feaec3d','f4e9785e-c426-4f79-80d9-973c4e553c9f','asdfasdf','N;','SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near \'asdfasdf\' at line 1','2022-05-07 16:45:12','2022-05-07 16:45:19',NULL),
('af19806c-4341-4b3f-8efb-b51decff45f6','f424beda-d831-49d2-8696-400eb15736c0','f4e9785e-c426-4f79-80d9-973c4e553c9f','asdfasdfsdaf','N;','SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near \'asdfasdfsdaf\' at line 1','2022-05-07 16:45:21','2022-05-07 16:45:23',NULL);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answer_variant`
--

DROP TABLE IF EXISTS `answer_variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer_variant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `contnent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_right` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_B90370DC1E27F6BF` (`question_id`),
  CONSTRAINT `FK_B90370DC1E27F6BF` FOREIGN KEY (`question_id`) REFERENCES `test_question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer_variant`
--

LOCK TABLES `answer_variant` WRITE;
/*!40000 ALTER TABLE `answer_variant` DISABLE KEYS */;
/*!40000 ALTER TABLE `answer_variant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_limit` int(11) NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_169E6FB961220EA6` (`creator_id`),
  CONSTRAINT `FK_169E6FB961220EA6` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES
(1,1,'Тестовый курс','Тестовое описание',79,'enable'),
(2,1,'Mysql','asf',107,'enable'),
(6,1,'Postgre','PostgreSql',110,'enable');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_answer`
--

DROP TABLE IF EXISTS `course_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cource_sheet_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_right` tinyint(1) DEFAULT NULL,
  `result` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '(DC2Type:json)',
  `created_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_74E58B688C50AF38` (`cource_sheet_id`),
  KEY `IDX_74E58B681E27F6BF` (`question_id`),
  CONSTRAINT `FK_74E58B681E27F6BF` FOREIGN KEY (`question_id`) REFERENCES `course_element` (`id`),
  CONSTRAINT `FK_74E58B688C50AF38` FOREIGN KEY (`cource_sheet_id`) REFERENCES `course_sheet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_answer`
--

LOCK TABLES `course_answer` WRITE;
/*!40000 ALTER TABLE `course_answer` DISABLE KEYS */;
INSERT INTO `course_answer` VALUES
(1,1,1,'SHOW TABLES;',NULL,'[]',NULL,NULL),
(2,1,1,'SHOW TABLES;',NULL,'[]',NULL,NULL),
(3,1,1,'SHOW TABLES;',NULL,'[]',NULL,NULL),
(4,1,1,'SHOW TABLES;',NULL,'[]',NULL,NULL),
(5,1,3,'',NULL,'[]',NULL,NULL),
(6,1,3,'asdfasdfsa',NULL,'[]',NULL,NULL),
(7,1,1,'',NULL,'[]',NULL,NULL),
(8,1,3,'',NULL,'[]',NULL,NULL),
(9,1,1,'',NULL,'[]',NULL,NULL),
(10,1,3,'',NULL,'[]',NULL,NULL),
(11,1,1,'',NULL,'[]',NULL,NULL),
(12,1,1,'',NULL,'[]',NULL,NULL),
(13,1,3,'',NULL,'[]',NULL,NULL),
(14,1,3,'',NULL,'[]',NULL,NULL),
(15,1,1,'SHOW TABLES',NULL,'[]',NULL,NULL),
(16,1,1,'SHOW TABLES',NULL,'[]',NULL,NULL),
(17,3,9,'SHOW TABLES',NULL,'{\"error\":\"\",\"result\":[[\"contract\"],[\"payment\"],[\"person\"],[\"product\"]],\"header\":[{\"native_type\":\"VAR_STRING\",\"pdo_type\":2,\"flags\":[\"not_null\"],\"table\":\"TABLE_NAMES\",\"name\":\"Tables_in_ubrr_analit_demo\",\"len\":292,\"precision\":0}]}',NULL,NULL),
(18,2,11,'SHOW TABLES',NULL,'{\"error\":\"SQLSTATE[42704]: Undefined object: 7 ERROR:  unrecognized configuration parameter \\\"tables\\\"\",\"result\":[],\"header\":[]}',NULL,NULL),
(19,2,11,'SHOW TABLES',0,'{\"error\":\"SQLSTATE[42704]: Undefined object: 7 ERROR:  unrecognized configuration parameter \\\"tables\\\"\",\"result\":[],\"header\":[],\"trace\":[{\"file\":\"\\/symfony\\/src\\/Connectors\\/PdoConnection.php\",\"line\":53,\"function\":\"execute\",\"class\":\"PDOStatement\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/PdoConnection.php\",\"line\":17,\"function\":\"exec\",\"class\":\"App\\\\Connectors\\\\PdoConnection\",\"type\":\"->\",\"args\":[\"SHOW TABLES\"]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/AnswerHandler\\/Sql.php\",\"line\":22,\"function\":\"fetchAll\",\"class\":\"App\\\\Connectors\\\\PdoConnection\",\"type\":\"->\",\"args\":[\"SHOW TABLES\"]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/CourseAnswerListener.php\",\"line\":18,\"function\":\"handle\",\"class\":\"App\\\\Connectors\\\\AnswerHandler\\\\Sql\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/Event\\/ListenersInvoker.php\",\"line\":93,\"function\":\"prePersist\",\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"type\":\"->\",\"args\":[{},{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":986,\"function\":\"invoke\",\"class\":\"Doctrine\\\\ORM\\\\Event\\\\ListenersInvoker\",\"type\":\"->\",\"args\":[{\"name\":\"App\\\\Entity\\\\CourseAnswer\",\"namespace\":\"App\\\\Entity\",\"rootEntityName\":\"App\\\\Entity\\\\CourseAnswer\",\"customGeneratorDefinition\":null,\"customRepositoryClassName\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"isMappedSuperclass\":false,\"isEmbeddedClass\":false,\"parentClasses\":[],\"subClasses\":[],\"embeddedClasses\":[],\"namedQueries\":[],\"namedNativeQueries\":[],\"sqlResultSetMappings\":[],\"identifier\":[\"id\"],\"inheritanceType\":1,\"generatorType\":4,\"fieldMappings\":{\"id\":{\"fieldName\":\"id\",\"type\":\"integer\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"id\":true,\"columnName\":\"id\"},\"answer\":{\"fieldName\":\"answer\",\"type\":\"text\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"columnName\":\"answer\"},\"isRight\":{\"fieldName\":\"isRight\",\"type\":\"boolean\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"is_right\"},\"result\":{\"fieldName\":\"result\",\"type\":\"json\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"result\"}},\"fieldNames\":{\"id\":\"id\",\"answer\":\"answer\",\"is_right\":\"isRight\",\"result\":\"result\"},\"columnNames\":{\"id\":\"id\",\"answer\":\"answer\",\"isRight\":\"is_right\",\"result\":\"result\"},\"discriminatorValue\":null,\"discriminatorMap\":[],\"discriminatorColumn\":null,\"table\":{\"name\":\"course_answer\"},\"lifecycleCallbacks\":[],\"entityListeners\":{\"prePersist\":[{\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"method\":\"prePersist\"}]},\"associationMappings\":{\"courceSheet\":{\"fieldName\":\"courceSheet\",\"joinColumns\":[{\"name\":\"cource_sheet_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[\"persist\"],\"inversedBy\":\"courseAnswers\",\"targetEntity\":\"App\\\\Entity\\\\CourseSheet\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":true,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"cource_sheet_id\":\"id\"},\"joinColumnFieldNames\":{\"cource_sheet_id\":\"cource_sheet_id\"},\"targetToSourceKeyColumns\":{\"id\":\"cource_sheet_id\"},\"orphanRemoval\":false},\"question\":{\"fieldName\":\"question\",\"joinColumns\":[{\"name\":\"question_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[],\"inversedBy\":null,\"targetEntity\":\"App\\\\Entity\\\\CourseElement\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":false,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"question_id\":\"id\"},\"joinColumnFieldNames\":{\"question_id\":\"question_id\"},\"targetToSourceKeyColumns\":{\"id\":\"question_id\"},\"orphanRemoval\":false}},\"isIdentifierComposite\":false,\"containsForeignIdentifier\":false,\"containsEnumIdentifier\":false,\"idGenerator\":{},\"sequenceGeneratorDefinition\":null,\"tableGeneratorDefinition\":null,\"changeTrackingPolicy\":1,\"requiresFetchAfterChange\":false,\"isVersioned\":false,\"versionField\":null,\"cache\":null,\"reflClass\":{\"name\":\"App\\\\Entity\\\\CourseAnswer\"},\"isReadOnly\":false,\"reflFields\":{\"id\":{\"name\":\"id\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"answer\":{\"name\":\"answer\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"isRight\":{\"name\":\"isRight\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"result\":{\"name\":\"result\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"courceSheet\":{\"name\":\"courceSheet\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"question\":{\"name\":\"question\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"}}},\"prePersist\",{},{},1]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":1818,\"function\":\"persistNew\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{\"name\":\"App\\\\Entity\\\\CourseAnswer\",\"namespace\":\"App\\\\Entity\",\"rootEntityName\":\"App\\\\Entity\\\\CourseAnswer\",\"customGeneratorDefinition\":null,\"customRepositoryClassName\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"isMappedSuperclass\":false,\"isEmbeddedClass\":false,\"parentClasses\":[],\"subClasses\":[],\"embeddedClasses\":[],\"namedQueries\":[],\"namedNativeQueries\":[],\"sqlResultSetMappings\":[],\"identifier\":[\"id\"],\"inheritanceType\":1,\"generatorType\":4,\"fieldMappings\":{\"id\":{\"fieldName\":\"id\",\"type\":\"integer\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"id\":true,\"columnName\":\"id\"},\"answer\":{\"fieldName\":\"answer\",\"type\":\"text\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"columnName\":\"answer\"},\"isRight\":{\"fieldName\":\"isRight\",\"type\":\"boolean\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"is_right\"},\"result\":{\"fieldName\":\"result\",\"type\":\"json\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"result\"}},\"fieldNames\":{\"id\":\"id\",\"answer\":\"answer\",\"is_right\":\"isRight\",\"result\":\"result\"},\"columnNames\":{\"id\":\"id\",\"answer\":\"answer\",\"isRight\":\"is_right\",\"result\":\"result\"},\"discriminatorValue\":null,\"discriminatorMap\":[],\"discriminatorColumn\":null,\"table\":{\"name\":\"course_answer\"},\"lifecycleCallbacks\":[],\"entityListeners\":{\"prePersist\":[{\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"method\":\"prePersist\"}]},\"associationMappings\":{\"courceSheet\":{\"fieldName\":\"courceSheet\",\"joinColumns\":[{\"name\":\"cource_sheet_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[\"persist\"],\"inversedBy\":\"courseAnswers\",\"targetEntity\":\"App\\\\Entity\\\\CourseSheet\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":true,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"cource_sheet_id\":\"id\"},\"joinColumnFieldNames\":{\"cource_sheet_id\":\"cource_sheet_id\"},\"targetToSourceKeyColumns\":{\"id\":\"cource_sheet_id\"},\"orphanRemoval\":false},\"question\":{\"fieldName\":\"question\",\"joinColumns\":[{\"name\":\"question_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[],\"inversedBy\":null,\"targetEntity\":\"App\\\\Entity\\\\CourseElement\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":false,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"question_id\":\"id\"},\"joinColumnFieldNames\":{\"question_id\":\"question_id\"},\"targetToSourceKeyColumns\":{\"id\":\"question_id\"},\"orphanRemoval\":false}},\"isIdentifierComposite\":false,\"containsForeignIdentifier\":false,\"containsEnumIdentifier\":false,\"idGenerator\":{},\"sequenceGeneratorDefinition\":null,\"tableGeneratorDefinition\":null,\"changeTrackingPolicy\":1,\"requiresFetchAfterChange\":false,\"isVersioned\":false,\"versionField\":null,\"cache\":null,\"reflClass\":{\"name\":\"App\\\\Entity\\\\CourseAnswer\"},\"isReadOnly\":false,\"reflFields\":{\"id\":{\"name\":\"id\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"answer\":{\"name\":\"answer\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"isRight\":{\"name\":\"isRight\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"result\":{\"name\":\"result\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"courceSheet\":{\"name\":\"courceSheet\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"question\":{\"name\":\"question\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"}}},{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":1775,\"function\":\"doPersist\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{},{\"7650\":{}}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/EntityManager.php\",\"line\":665,\"function\":\"persist\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/var\\/cache\\/dev\\/ContainerOkaJxiS\\/EntityManager_9a5be93.php\",\"line\":178,\"function\":\"persist\",\"class\":\"Doctrine\\\\ORM\\\\EntityManager\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Repository\\/CourseAnswerRepository.php\",\"line\":44,\"function\":\"persist\",\"class\":\"ContainerOkaJxiS\\\\EntityManager_9a5be93\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Persistence\\/ProcessSaver.php\",\"line\":35,\"function\":\"add\",\"class\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Domain\\/Process.php\",\"line\":119,\"function\":\"addNewAnswer\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Persistence\\\\ProcessSaver\",\"type\":\"->\",\"args\":[{},{\"__initializer__\":null,\"__cloner__\":null,\"__isInitialized__\":true},\"SHOW TABLES\",{\"date\":\"2022-11-17 13:29:29.614866\",\"timezone_type\":3,\"timezone\":\"UTC\"}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Action\\/FinishAction.php\",\"line\":26,\"function\":\"finish\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Domain\\\\Process\",\"type\":\"->\",\"args\":[{},{},\"SHOW TABLES\",{\"date\":\"2022-11-17 13:29:29.614866\",\"timezone_type\":3,\"timezone\":\"UTC\"}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Action\\/Action.php\",\"line\":13,\"function\":\"do\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Action\\\\FinishAction\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/src\\/Controller\\/ProcessController.php\",\"line\":118,\"function\":\"run\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Action\\\\Action\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/HttpKernel.php\",\"line\":153,\"function\":\"finish\",\"class\":\"App\\\\Controller\\\\ProcessController\",\"type\":\"->\",\"args\":[{},{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},{},{}]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/HttpKernel.php\",\"line\":75,\"function\":\"handleRaw\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\HttpKernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},1]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/Kernel.php\",\"line\":202,\"function\":\"handle\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\HttpKernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},1,true]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/runtime\\/Runner\\/Symfony\\/HttpKernelRunner.php\",\"line\":35,\"function\":\"handle\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\Kernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}}]},{\"file\":\"\\/symfony\\/vendor\\/autoload_runtime.php\",\"line\":29,\"function\":\"run\",\"class\":\"Symfony\\\\Component\\\\Runtime\\\\Runner\\\\Symfony\\\\HttpKernelRunner\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/public\\/index.php\",\"line\":5,\"args\":[\"\\/symfony\\/vendor\\/autoload_runtime.php\"],\"function\":\"require_once\"}]}',NULL,NULL),
(20,2,11,'SHOW TABLES',0,'{\"error\":\"SQLSTATE[42704]: Undefined object: 7 ERROR:  unrecognized configuration parameter \\\"tables\\\"\",\"result\":[],\"header\":[],\"trace\":[{\"file\":\"\\/symfony\\/src\\/Connectors\\/PdoConnection.php\",\"line\":53,\"function\":\"execute\",\"class\":\"PDOStatement\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/PdoConnection.php\",\"line\":17,\"function\":\"exec\",\"class\":\"App\\\\Connectors\\\\PdoConnection\",\"type\":\"->\",\"args\":[\"SHOW TABLES\"]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/AnswerHandler\\/Sql.php\",\"line\":22,\"function\":\"fetchAll\",\"class\":\"App\\\\Connectors\\\\PdoConnection\",\"type\":\"->\",\"args\":[\"SHOW TABLES\"]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/CourseAnswerListener.php\",\"line\":18,\"function\":\"handle\",\"class\":\"App\\\\Connectors\\\\AnswerHandler\\\\Sql\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/Event\\/ListenersInvoker.php\",\"line\":93,\"function\":\"prePersist\",\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"type\":\"->\",\"args\":[{},{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":986,\"function\":\"invoke\",\"class\":\"Doctrine\\\\ORM\\\\Event\\\\ListenersInvoker\",\"type\":\"->\",\"args\":[{\"name\":\"App\\\\Entity\\\\CourseAnswer\",\"namespace\":\"App\\\\Entity\",\"rootEntityName\":\"App\\\\Entity\\\\CourseAnswer\",\"customGeneratorDefinition\":null,\"customRepositoryClassName\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"isMappedSuperclass\":false,\"isEmbeddedClass\":false,\"parentClasses\":[],\"subClasses\":[],\"embeddedClasses\":[],\"namedQueries\":[],\"namedNativeQueries\":[],\"sqlResultSetMappings\":[],\"identifier\":[\"id\"],\"inheritanceType\":1,\"generatorType\":4,\"fieldMappings\":{\"id\":{\"fieldName\":\"id\",\"type\":\"integer\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"id\":true,\"columnName\":\"id\"},\"answer\":{\"fieldName\":\"answer\",\"type\":\"text\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"columnName\":\"answer\"},\"isRight\":{\"fieldName\":\"isRight\",\"type\":\"boolean\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"is_right\"},\"result\":{\"fieldName\":\"result\",\"type\":\"json\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"result\"}},\"fieldNames\":{\"id\":\"id\",\"answer\":\"answer\",\"is_right\":\"isRight\",\"result\":\"result\"},\"columnNames\":{\"id\":\"id\",\"answer\":\"answer\",\"isRight\":\"is_right\",\"result\":\"result\"},\"discriminatorValue\":null,\"discriminatorMap\":[],\"discriminatorColumn\":null,\"table\":{\"name\":\"course_answer\"},\"lifecycleCallbacks\":[],\"entityListeners\":{\"prePersist\":[{\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"method\":\"prePersist\"}]},\"associationMappings\":{\"courceSheet\":{\"fieldName\":\"courceSheet\",\"joinColumns\":[{\"name\":\"cource_sheet_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[\"persist\"],\"inversedBy\":\"courseAnswers\",\"targetEntity\":\"App\\\\Entity\\\\CourseSheet\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":true,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"cource_sheet_id\":\"id\"},\"joinColumnFieldNames\":{\"cource_sheet_id\":\"cource_sheet_id\"},\"targetToSourceKeyColumns\":{\"id\":\"cource_sheet_id\"},\"orphanRemoval\":false},\"question\":{\"fieldName\":\"question\",\"joinColumns\":[{\"name\":\"question_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[],\"inversedBy\":null,\"targetEntity\":\"App\\\\Entity\\\\CourseElement\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":false,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"question_id\":\"id\"},\"joinColumnFieldNames\":{\"question_id\":\"question_id\"},\"targetToSourceKeyColumns\":{\"id\":\"question_id\"},\"orphanRemoval\":false}},\"isIdentifierComposite\":false,\"containsForeignIdentifier\":false,\"containsEnumIdentifier\":false,\"idGenerator\":{},\"sequenceGeneratorDefinition\":null,\"tableGeneratorDefinition\":null,\"changeTrackingPolicy\":1,\"requiresFetchAfterChange\":false,\"isVersioned\":false,\"versionField\":null,\"cache\":null,\"reflClass\":{\"name\":\"App\\\\Entity\\\\CourseAnswer\"},\"isReadOnly\":false,\"reflFields\":{\"id\":{\"name\":\"id\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"answer\":{\"name\":\"answer\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"isRight\":{\"name\":\"isRight\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"result\":{\"name\":\"result\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"courceSheet\":{\"name\":\"courceSheet\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"question\":{\"name\":\"question\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"}}},\"prePersist\",{},{},1]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":1818,\"function\":\"persistNew\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{\"name\":\"App\\\\Entity\\\\CourseAnswer\",\"namespace\":\"App\\\\Entity\",\"rootEntityName\":\"App\\\\Entity\\\\CourseAnswer\",\"customGeneratorDefinition\":null,\"customRepositoryClassName\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"isMappedSuperclass\":false,\"isEmbeddedClass\":false,\"parentClasses\":[],\"subClasses\":[],\"embeddedClasses\":[],\"namedQueries\":[],\"namedNativeQueries\":[],\"sqlResultSetMappings\":[],\"identifier\":[\"id\"],\"inheritanceType\":1,\"generatorType\":4,\"fieldMappings\":{\"id\":{\"fieldName\":\"id\",\"type\":\"integer\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"id\":true,\"columnName\":\"id\"},\"answer\":{\"fieldName\":\"answer\",\"type\":\"text\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"columnName\":\"answer\"},\"isRight\":{\"fieldName\":\"isRight\",\"type\":\"boolean\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"is_right\"},\"result\":{\"fieldName\":\"result\",\"type\":\"json\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"result\"}},\"fieldNames\":{\"id\":\"id\",\"answer\":\"answer\",\"is_right\":\"isRight\",\"result\":\"result\"},\"columnNames\":{\"id\":\"id\",\"answer\":\"answer\",\"isRight\":\"is_right\",\"result\":\"result\"},\"discriminatorValue\":null,\"discriminatorMap\":[],\"discriminatorColumn\":null,\"table\":{\"name\":\"course_answer\"},\"lifecycleCallbacks\":[],\"entityListeners\":{\"prePersist\":[{\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"method\":\"prePersist\"}]},\"associationMappings\":{\"courceSheet\":{\"fieldName\":\"courceSheet\",\"joinColumns\":[{\"name\":\"cource_sheet_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[\"persist\"],\"inversedBy\":\"courseAnswers\",\"targetEntity\":\"App\\\\Entity\\\\CourseSheet\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":true,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"cource_sheet_id\":\"id\"},\"joinColumnFieldNames\":{\"cource_sheet_id\":\"cource_sheet_id\"},\"targetToSourceKeyColumns\":{\"id\":\"cource_sheet_id\"},\"orphanRemoval\":false},\"question\":{\"fieldName\":\"question\",\"joinColumns\":[{\"name\":\"question_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[],\"inversedBy\":null,\"targetEntity\":\"App\\\\Entity\\\\CourseElement\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":false,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"question_id\":\"id\"},\"joinColumnFieldNames\":{\"question_id\":\"question_id\"},\"targetToSourceKeyColumns\":{\"id\":\"question_id\"},\"orphanRemoval\":false}},\"isIdentifierComposite\":false,\"containsForeignIdentifier\":false,\"containsEnumIdentifier\":false,\"idGenerator\":{},\"sequenceGeneratorDefinition\":null,\"tableGeneratorDefinition\":null,\"changeTrackingPolicy\":1,\"requiresFetchAfterChange\":false,\"isVersioned\":false,\"versionField\":null,\"cache\":null,\"reflClass\":{\"name\":\"App\\\\Entity\\\\CourseAnswer\"},\"isReadOnly\":false,\"reflFields\":{\"id\":{\"name\":\"id\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"answer\":{\"name\":\"answer\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"isRight\":{\"name\":\"isRight\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"result\":{\"name\":\"result\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"courceSheet\":{\"name\":\"courceSheet\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"question\":{\"name\":\"question\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"}}},{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":1775,\"function\":\"doPersist\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{},{\"987\":{}}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/EntityManager.php\",\"line\":665,\"function\":\"persist\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/var\\/cache\\/dev\\/ContainerOkaJxiS\\/EntityManager_9a5be93.php\",\"line\":178,\"function\":\"persist\",\"class\":\"Doctrine\\\\ORM\\\\EntityManager\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Repository\\/CourseAnswerRepository.php\",\"line\":44,\"function\":\"persist\",\"class\":\"ContainerOkaJxiS\\\\EntityManager_9a5be93\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Persistence\\/ProcessSaver.php\",\"line\":35,\"function\":\"add\",\"class\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Domain\\/Process.php\",\"line\":119,\"function\":\"addNewAnswer\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Persistence\\\\ProcessSaver\",\"type\":\"->\",\"args\":[{},{\"__initializer__\":null,\"__cloner__\":null,\"__isInitialized__\":true},\"SHOW TABLES\",{\"date\":\"2022-11-17 13:38:18.582779\",\"timezone_type\":3,\"timezone\":\"UTC\"}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Action\\/FinishAction.php\",\"line\":26,\"function\":\"finish\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Domain\\\\Process\",\"type\":\"->\",\"args\":[{},{},\"SHOW TABLES\",{\"date\":\"2022-11-17 13:38:18.582779\",\"timezone_type\":3,\"timezone\":\"UTC\"}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Action\\/Action.php\",\"line\":13,\"function\":\"do\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Action\\\\FinishAction\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/src\\/Controller\\/ProcessController.php\",\"line\":118,\"function\":\"run\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Action\\\\Action\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/HttpKernel.php\",\"line\":153,\"function\":\"finish\",\"class\":\"App\\\\Controller\\\\ProcessController\",\"type\":\"->\",\"args\":[{},{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},{},{}]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/HttpKernel.php\",\"line\":75,\"function\":\"handleRaw\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\HttpKernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},1]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/Kernel.php\",\"line\":202,\"function\":\"handle\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\HttpKernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},1,true]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/runtime\\/Runner\\/Symfony\\/HttpKernelRunner.php\",\"line\":35,\"function\":\"handle\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\Kernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}}]},{\"file\":\"\\/symfony\\/vendor\\/autoload_runtime.php\",\"line\":29,\"function\":\"run\",\"class\":\"Symfony\\\\Component\\\\Runtime\\\\Runner\\\\Symfony\\\\HttpKernelRunner\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/public\\/index.php\",\"line\":5,\"args\":[\"\\/symfony\\/vendor\\/autoload_runtime.php\"],\"function\":\"require_once\"}]}',NULL,NULL),
(21,2,11,'SHOW TABLES',0,'{\"error\":\"SQLSTATE[42704]: Undefined object: 7 ERROR:  unrecognized configuration parameter \\\"tables\\\"\",\"result\":[],\"header\":[],\"trace\":[{\"file\":\"\\/symfony\\/src\\/Connectors\\/PdoConnection.php\",\"line\":53,\"function\":\"execute\",\"class\":\"PDOStatement\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/PdoConnection.php\",\"line\":17,\"function\":\"exec\",\"class\":\"App\\\\Connectors\\\\PdoConnection\",\"type\":\"->\",\"args\":[\"SHOW TABLES\"]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/AnswerHandler\\/Sql.php\",\"line\":22,\"function\":\"fetchAll\",\"class\":\"App\\\\Connectors\\\\PdoConnection\",\"type\":\"->\",\"args\":[\"SHOW TABLES\"]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/CourseAnswerListener.php\",\"line\":18,\"function\":\"handle\",\"class\":\"App\\\\Connectors\\\\AnswerHandler\\\\Sql\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/Event\\/ListenersInvoker.php\",\"line\":93,\"function\":\"prePersist\",\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"type\":\"->\",\"args\":[{},{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":986,\"function\":\"invoke\",\"class\":\"Doctrine\\\\ORM\\\\Event\\\\ListenersInvoker\",\"type\":\"->\",\"args\":[{\"name\":\"App\\\\Entity\\\\CourseAnswer\",\"namespace\":\"App\\\\Entity\",\"rootEntityName\":\"App\\\\Entity\\\\CourseAnswer\",\"customGeneratorDefinition\":null,\"customRepositoryClassName\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"isMappedSuperclass\":false,\"isEmbeddedClass\":false,\"parentClasses\":[],\"subClasses\":[],\"embeddedClasses\":[],\"namedQueries\":[],\"namedNativeQueries\":[],\"sqlResultSetMappings\":[],\"identifier\":[\"id\"],\"inheritanceType\":1,\"generatorType\":4,\"fieldMappings\":{\"id\":{\"fieldName\":\"id\",\"type\":\"integer\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"id\":true,\"columnName\":\"id\"},\"answer\":{\"fieldName\":\"answer\",\"type\":\"text\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"columnName\":\"answer\"},\"isRight\":{\"fieldName\":\"isRight\",\"type\":\"boolean\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"is_right\"},\"result\":{\"fieldName\":\"result\",\"type\":\"json\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"result\"}},\"fieldNames\":{\"id\":\"id\",\"answer\":\"answer\",\"is_right\":\"isRight\",\"result\":\"result\"},\"columnNames\":{\"id\":\"id\",\"answer\":\"answer\",\"isRight\":\"is_right\",\"result\":\"result\"},\"discriminatorValue\":null,\"discriminatorMap\":[],\"discriminatorColumn\":null,\"table\":{\"name\":\"course_answer\"},\"lifecycleCallbacks\":[],\"entityListeners\":{\"prePersist\":[{\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"method\":\"prePersist\"}]},\"associationMappings\":{\"courceSheet\":{\"fieldName\":\"courceSheet\",\"joinColumns\":[{\"name\":\"cource_sheet_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[\"persist\"],\"inversedBy\":\"courseAnswers\",\"targetEntity\":\"App\\\\Entity\\\\CourseSheet\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":true,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"cource_sheet_id\":\"id\"},\"joinColumnFieldNames\":{\"cource_sheet_id\":\"cource_sheet_id\"},\"targetToSourceKeyColumns\":{\"id\":\"cource_sheet_id\"},\"orphanRemoval\":false},\"question\":{\"fieldName\":\"question\",\"joinColumns\":[{\"name\":\"question_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[],\"inversedBy\":null,\"targetEntity\":\"App\\\\Entity\\\\CourseElement\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":false,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"question_id\":\"id\"},\"joinColumnFieldNames\":{\"question_id\":\"question_id\"},\"targetToSourceKeyColumns\":{\"id\":\"question_id\"},\"orphanRemoval\":false}},\"isIdentifierComposite\":false,\"containsForeignIdentifier\":false,\"containsEnumIdentifier\":false,\"idGenerator\":{},\"sequenceGeneratorDefinition\":null,\"tableGeneratorDefinition\":null,\"changeTrackingPolicy\":1,\"requiresFetchAfterChange\":false,\"isVersioned\":false,\"versionField\":null,\"cache\":null,\"reflClass\":{\"name\":\"App\\\\Entity\\\\CourseAnswer\"},\"isReadOnly\":false,\"reflFields\":{\"id\":{\"name\":\"id\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"answer\":{\"name\":\"answer\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"isRight\":{\"name\":\"isRight\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"result\":{\"name\":\"result\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"courceSheet\":{\"name\":\"courceSheet\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"question\":{\"name\":\"question\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"}}},\"prePersist\",{},{},1]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":1818,\"function\":\"persistNew\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{\"name\":\"App\\\\Entity\\\\CourseAnswer\",\"namespace\":\"App\\\\Entity\",\"rootEntityName\":\"App\\\\Entity\\\\CourseAnswer\",\"customGeneratorDefinition\":null,\"customRepositoryClassName\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"isMappedSuperclass\":false,\"isEmbeddedClass\":false,\"parentClasses\":[],\"subClasses\":[],\"embeddedClasses\":[],\"namedQueries\":[],\"namedNativeQueries\":[],\"sqlResultSetMappings\":[],\"identifier\":[\"id\"],\"inheritanceType\":1,\"generatorType\":4,\"fieldMappings\":{\"id\":{\"fieldName\":\"id\",\"type\":\"integer\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"id\":true,\"columnName\":\"id\"},\"answer\":{\"fieldName\":\"answer\",\"type\":\"text\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"columnName\":\"answer\"},\"isRight\":{\"fieldName\":\"isRight\",\"type\":\"boolean\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"is_right\"},\"result\":{\"fieldName\":\"result\",\"type\":\"json\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"result\"}},\"fieldNames\":{\"id\":\"id\",\"answer\":\"answer\",\"is_right\":\"isRight\",\"result\":\"result\"},\"columnNames\":{\"id\":\"id\",\"answer\":\"answer\",\"isRight\":\"is_right\",\"result\":\"result\"},\"discriminatorValue\":null,\"discriminatorMap\":[],\"discriminatorColumn\":null,\"table\":{\"name\":\"course_answer\"},\"lifecycleCallbacks\":[],\"entityListeners\":{\"prePersist\":[{\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"method\":\"prePersist\"}]},\"associationMappings\":{\"courceSheet\":{\"fieldName\":\"courceSheet\",\"joinColumns\":[{\"name\":\"cource_sheet_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[\"persist\"],\"inversedBy\":\"courseAnswers\",\"targetEntity\":\"App\\\\Entity\\\\CourseSheet\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":true,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"cource_sheet_id\":\"id\"},\"joinColumnFieldNames\":{\"cource_sheet_id\":\"cource_sheet_id\"},\"targetToSourceKeyColumns\":{\"id\":\"cource_sheet_id\"},\"orphanRemoval\":false},\"question\":{\"fieldName\":\"question\",\"joinColumns\":[{\"name\":\"question_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[],\"inversedBy\":null,\"targetEntity\":\"App\\\\Entity\\\\CourseElement\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":false,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"question_id\":\"id\"},\"joinColumnFieldNames\":{\"question_id\":\"question_id\"},\"targetToSourceKeyColumns\":{\"id\":\"question_id\"},\"orphanRemoval\":false}},\"isIdentifierComposite\":false,\"containsForeignIdentifier\":false,\"containsEnumIdentifier\":false,\"idGenerator\":{},\"sequenceGeneratorDefinition\":null,\"tableGeneratorDefinition\":null,\"changeTrackingPolicy\":1,\"requiresFetchAfterChange\":false,\"isVersioned\":false,\"versionField\":null,\"cache\":null,\"reflClass\":{\"name\":\"App\\\\Entity\\\\CourseAnswer\"},\"isReadOnly\":false,\"reflFields\":{\"id\":{\"name\":\"id\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"answer\":{\"name\":\"answer\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"isRight\":{\"name\":\"isRight\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"result\":{\"name\":\"result\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"courceSheet\":{\"name\":\"courceSheet\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"question\":{\"name\":\"question\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"}}},{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":1775,\"function\":\"doPersist\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{},{\"7650\":{}}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/EntityManager.php\",\"line\":665,\"function\":\"persist\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/var\\/cache\\/dev\\/ContainerOkaJxiS\\/EntityManager_9a5be93.php\",\"line\":178,\"function\":\"persist\",\"class\":\"Doctrine\\\\ORM\\\\EntityManager\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Repository\\/CourseAnswerRepository.php\",\"line\":44,\"function\":\"persist\",\"class\":\"ContainerOkaJxiS\\\\EntityManager_9a5be93\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Persistence\\/ProcessSaver.php\",\"line\":35,\"function\":\"add\",\"class\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Domain\\/Process.php\",\"line\":119,\"function\":\"addNewAnswer\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Persistence\\\\ProcessSaver\",\"type\":\"->\",\"args\":[{},{\"__initializer__\":null,\"__cloner__\":null,\"__isInitialized__\":true},\"SHOW TABLES\",{\"date\":\"2022-11-17 13:39:27.112199\",\"timezone_type\":3,\"timezone\":\"UTC\"}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Action\\/FinishAction.php\",\"line\":26,\"function\":\"finish\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Domain\\\\Process\",\"type\":\"->\",\"args\":[{},{},\"SHOW TABLES\",{\"date\":\"2022-11-17 13:39:27.112199\",\"timezone_type\":3,\"timezone\":\"UTC\"}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Action\\/Action.php\",\"line\":13,\"function\":\"do\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Action\\\\FinishAction\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/src\\/Controller\\/ProcessController.php\",\"line\":118,\"function\":\"run\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Action\\\\Action\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/HttpKernel.php\",\"line\":153,\"function\":\"finish\",\"class\":\"App\\\\Controller\\\\ProcessController\",\"type\":\"->\",\"args\":[{},{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},{},{}]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/HttpKernel.php\",\"line\":75,\"function\":\"handleRaw\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\HttpKernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},1]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/Kernel.php\",\"line\":202,\"function\":\"handle\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\HttpKernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},1,true]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/runtime\\/Runner\\/Symfony\\/HttpKernelRunner.php\",\"line\":35,\"function\":\"handle\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\Kernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}}]},{\"file\":\"\\/symfony\\/vendor\\/autoload_runtime.php\",\"line\":29,\"function\":\"run\",\"class\":\"Symfony\\\\Component\\\\Runtime\\\\Runner\\\\Symfony\\\\HttpKernelRunner\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/public\\/index.php\",\"line\":5,\"args\":[\"\\/symfony\\/vendor\\/autoload_runtime.php\"],\"function\":\"require_once\"}]}',NULL,NULL),
(22,2,11,'SHOW TABLES',0,'{\"error\":\"SQLSTATE[42704]: Undefined object: 7 ERROR:  unrecognized configuration parameter \\\"tables\\\"\",\"result\":[],\"header\":[],\"trace\":[{\"file\":\"\\/symfony\\/src\\/Connectors\\/PdoConnection.php\",\"line\":53,\"function\":\"execute\",\"class\":\"PDOStatement\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/PdoConnection.php\",\"line\":17,\"function\":\"exec\",\"class\":\"App\\\\Connectors\\\\PdoConnection\",\"type\":\"->\",\"args\":[\"SHOW TABLES\"]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/AnswerHandler\\/Sql.php\",\"line\":22,\"function\":\"fetchAll\",\"class\":\"App\\\\Connectors\\\\PdoConnection\",\"type\":\"->\",\"args\":[\"SHOW TABLES\"]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/CourseAnswerListener.php\",\"line\":18,\"function\":\"handle\",\"class\":\"App\\\\Connectors\\\\AnswerHandler\\\\Sql\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/Event\\/ListenersInvoker.php\",\"line\":93,\"function\":\"prePersist\",\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"type\":\"->\",\"args\":[{},{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":986,\"function\":\"invoke\",\"class\":\"Doctrine\\\\ORM\\\\Event\\\\ListenersInvoker\",\"type\":\"->\",\"args\":[{\"name\":\"App\\\\Entity\\\\CourseAnswer\",\"namespace\":\"App\\\\Entity\",\"rootEntityName\":\"App\\\\Entity\\\\CourseAnswer\",\"customGeneratorDefinition\":null,\"customRepositoryClassName\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"isMappedSuperclass\":false,\"isEmbeddedClass\":false,\"parentClasses\":[],\"subClasses\":[],\"embeddedClasses\":[],\"namedQueries\":[],\"namedNativeQueries\":[],\"sqlResultSetMappings\":[],\"identifier\":[\"id\"],\"inheritanceType\":1,\"generatorType\":4,\"fieldMappings\":{\"id\":{\"fieldName\":\"id\",\"type\":\"integer\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"id\":true,\"columnName\":\"id\"},\"answer\":{\"fieldName\":\"answer\",\"type\":\"text\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"columnName\":\"answer\"},\"isRight\":{\"fieldName\":\"isRight\",\"type\":\"boolean\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"is_right\"},\"result\":{\"fieldName\":\"result\",\"type\":\"json\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"result\"}},\"fieldNames\":{\"id\":\"id\",\"answer\":\"answer\",\"is_right\":\"isRight\",\"result\":\"result\"},\"columnNames\":{\"id\":\"id\",\"answer\":\"answer\",\"isRight\":\"is_right\",\"result\":\"result\"},\"discriminatorValue\":null,\"discriminatorMap\":[],\"discriminatorColumn\":null,\"table\":{\"name\":\"course_answer\"},\"lifecycleCallbacks\":[],\"entityListeners\":{\"prePersist\":[{\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"method\":\"prePersist\"}]},\"associationMappings\":{\"courceSheet\":{\"fieldName\":\"courceSheet\",\"joinColumns\":[{\"name\":\"cource_sheet_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[\"persist\"],\"inversedBy\":\"courseAnswers\",\"targetEntity\":\"App\\\\Entity\\\\CourseSheet\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":true,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"cource_sheet_id\":\"id\"},\"joinColumnFieldNames\":{\"cource_sheet_id\":\"cource_sheet_id\"},\"targetToSourceKeyColumns\":{\"id\":\"cource_sheet_id\"},\"orphanRemoval\":false},\"question\":{\"fieldName\":\"question\",\"joinColumns\":[{\"name\":\"question_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[],\"inversedBy\":null,\"targetEntity\":\"App\\\\Entity\\\\CourseElement\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":false,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"question_id\":\"id\"},\"joinColumnFieldNames\":{\"question_id\":\"question_id\"},\"targetToSourceKeyColumns\":{\"id\":\"question_id\"},\"orphanRemoval\":false}},\"isIdentifierComposite\":false,\"containsForeignIdentifier\":false,\"containsEnumIdentifier\":false,\"idGenerator\":{},\"sequenceGeneratorDefinition\":null,\"tableGeneratorDefinition\":null,\"changeTrackingPolicy\":1,\"requiresFetchAfterChange\":false,\"isVersioned\":false,\"versionField\":null,\"cache\":null,\"reflClass\":{\"name\":\"App\\\\Entity\\\\CourseAnswer\"},\"isReadOnly\":false,\"reflFields\":{\"id\":{\"name\":\"id\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"answer\":{\"name\":\"answer\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"isRight\":{\"name\":\"isRight\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"result\":{\"name\":\"result\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"courceSheet\":{\"name\":\"courceSheet\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"question\":{\"name\":\"question\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"}}},\"prePersist\",{},{},1]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":1818,\"function\":\"persistNew\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{\"name\":\"App\\\\Entity\\\\CourseAnswer\",\"namespace\":\"App\\\\Entity\",\"rootEntityName\":\"App\\\\Entity\\\\CourseAnswer\",\"customGeneratorDefinition\":null,\"customRepositoryClassName\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"isMappedSuperclass\":false,\"isEmbeddedClass\":false,\"parentClasses\":[],\"subClasses\":[],\"embeddedClasses\":[],\"namedQueries\":[],\"namedNativeQueries\":[],\"sqlResultSetMappings\":[],\"identifier\":[\"id\"],\"inheritanceType\":1,\"generatorType\":4,\"fieldMappings\":{\"id\":{\"fieldName\":\"id\",\"type\":\"integer\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"id\":true,\"columnName\":\"id\"},\"answer\":{\"fieldName\":\"answer\",\"type\":\"text\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"columnName\":\"answer\"},\"isRight\":{\"fieldName\":\"isRight\",\"type\":\"boolean\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"is_right\"},\"result\":{\"fieldName\":\"result\",\"type\":\"json\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"result\"}},\"fieldNames\":{\"id\":\"id\",\"answer\":\"answer\",\"is_right\":\"isRight\",\"result\":\"result\"},\"columnNames\":{\"id\":\"id\",\"answer\":\"answer\",\"isRight\":\"is_right\",\"result\":\"result\"},\"discriminatorValue\":null,\"discriminatorMap\":[],\"discriminatorColumn\":null,\"table\":{\"name\":\"course_answer\"},\"lifecycleCallbacks\":[],\"entityListeners\":{\"prePersist\":[{\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"method\":\"prePersist\"}]},\"associationMappings\":{\"courceSheet\":{\"fieldName\":\"courceSheet\",\"joinColumns\":[{\"name\":\"cource_sheet_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[\"persist\"],\"inversedBy\":\"courseAnswers\",\"targetEntity\":\"App\\\\Entity\\\\CourseSheet\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":true,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"cource_sheet_id\":\"id\"},\"joinColumnFieldNames\":{\"cource_sheet_id\":\"cource_sheet_id\"},\"targetToSourceKeyColumns\":{\"id\":\"cource_sheet_id\"},\"orphanRemoval\":false},\"question\":{\"fieldName\":\"question\",\"joinColumns\":[{\"name\":\"question_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[],\"inversedBy\":null,\"targetEntity\":\"App\\\\Entity\\\\CourseElement\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":false,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"question_id\":\"id\"},\"joinColumnFieldNames\":{\"question_id\":\"question_id\"},\"targetToSourceKeyColumns\":{\"id\":\"question_id\"},\"orphanRemoval\":false}},\"isIdentifierComposite\":false,\"containsForeignIdentifier\":false,\"containsEnumIdentifier\":false,\"idGenerator\":{},\"sequenceGeneratorDefinition\":null,\"tableGeneratorDefinition\":null,\"changeTrackingPolicy\":1,\"requiresFetchAfterChange\":false,\"isVersioned\":false,\"versionField\":null,\"cache\":null,\"reflClass\":{\"name\":\"App\\\\Entity\\\\CourseAnswer\"},\"isReadOnly\":false,\"reflFields\":{\"id\":{\"name\":\"id\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"answer\":{\"name\":\"answer\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"isRight\":{\"name\":\"isRight\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"result\":{\"name\":\"result\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"courceSheet\":{\"name\":\"courceSheet\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"question\":{\"name\":\"question\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"}}},{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":1775,\"function\":\"doPersist\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{},{\"987\":{}}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/EntityManager.php\",\"line\":665,\"function\":\"persist\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/var\\/cache\\/dev\\/ContainerOkaJxiS\\/EntityManager_9a5be93.php\",\"line\":178,\"function\":\"persist\",\"class\":\"Doctrine\\\\ORM\\\\EntityManager\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Repository\\/CourseAnswerRepository.php\",\"line\":44,\"function\":\"persist\",\"class\":\"ContainerOkaJxiS\\\\EntityManager_9a5be93\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Persistence\\/ProcessSaver.php\",\"line\":35,\"function\":\"add\",\"class\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Domain\\/Process.php\",\"line\":119,\"function\":\"addNewAnswer\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Persistence\\\\ProcessSaver\",\"type\":\"->\",\"args\":[{},{\"__initializer__\":null,\"__cloner__\":null,\"__isInitialized__\":true},\"SHOW TABLES\",{\"date\":\"2022-11-17 13:39:56.406332\",\"timezone_type\":3,\"timezone\":\"UTC\"}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Action\\/FinishAction.php\",\"line\":26,\"function\":\"finish\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Domain\\\\Process\",\"type\":\"->\",\"args\":[{},{},\"SHOW TABLES\",{\"date\":\"2022-11-17 13:39:56.406332\",\"timezone_type\":3,\"timezone\":\"UTC\"}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Action\\/Action.php\",\"line\":13,\"function\":\"do\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Action\\\\FinishAction\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/src\\/Controller\\/ProcessController.php\",\"line\":118,\"function\":\"run\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Action\\\\Action\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/HttpKernel.php\",\"line\":153,\"function\":\"finish\",\"class\":\"App\\\\Controller\\\\ProcessController\",\"type\":\"->\",\"args\":[{},{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},{},{}]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/HttpKernel.php\",\"line\":75,\"function\":\"handleRaw\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\HttpKernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},1]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/Kernel.php\",\"line\":202,\"function\":\"handle\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\HttpKernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},1,true]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/runtime\\/Runner\\/Symfony\\/HttpKernelRunner.php\",\"line\":35,\"function\":\"handle\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\Kernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}}]},{\"file\":\"\\/symfony\\/vendor\\/autoload_runtime.php\",\"line\":29,\"function\":\"run\",\"class\":\"Symfony\\\\Component\\\\Runtime\\\\Runner\\\\Symfony\\\\HttpKernelRunner\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/public\\/index.php\",\"line\":5,\"args\":[\"\\/symfony\\/vendor\\/autoload_runtime.php\"],\"function\":\"require_once\"}]}',NULL,NULL),
(23,2,11,'SHOW TABLES',0,'{\"error\":\"SQLSTATE[42704]: Undefined object: 7 ERROR:  unrecognized configuration parameter \\\"tables\\\"\",\"result\":[],\"header\":[],\"trace\":[{\"file\":\"\\/symfony\\/src\\/Connectors\\/PdoConnection.php\",\"line\":53,\"function\":\"execute\",\"class\":\"PDOStatement\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/PdoConnection.php\",\"line\":17,\"function\":\"exec\",\"class\":\"App\\\\Connectors\\\\PdoConnection\",\"type\":\"->\",\"args\":[\"SHOW TABLES\"]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/AnswerHandler\\/Sql.php\",\"line\":22,\"function\":\"fetchAll\",\"class\":\"App\\\\Connectors\\\\PdoConnection\",\"type\":\"->\",\"args\":[\"SHOW TABLES\"]},{\"file\":\"\\/symfony\\/src\\/Connectors\\/CourseAnswerListener.php\",\"line\":18,\"function\":\"handle\",\"class\":\"App\\\\Connectors\\\\AnswerHandler\\\\Sql\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/Event\\/ListenersInvoker.php\",\"line\":93,\"function\":\"prePersist\",\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"type\":\"->\",\"args\":[{},{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":986,\"function\":\"invoke\",\"class\":\"Doctrine\\\\ORM\\\\Event\\\\ListenersInvoker\",\"type\":\"->\",\"args\":[{\"name\":\"App\\\\Entity\\\\CourseAnswer\",\"namespace\":\"App\\\\Entity\",\"rootEntityName\":\"App\\\\Entity\\\\CourseAnswer\",\"customGeneratorDefinition\":null,\"customRepositoryClassName\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"isMappedSuperclass\":false,\"isEmbeddedClass\":false,\"parentClasses\":[],\"subClasses\":[],\"embeddedClasses\":[],\"namedQueries\":[],\"namedNativeQueries\":[],\"sqlResultSetMappings\":[],\"identifier\":[\"id\"],\"inheritanceType\":1,\"generatorType\":4,\"fieldMappings\":{\"id\":{\"fieldName\":\"id\",\"type\":\"integer\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"id\":true,\"columnName\":\"id\"},\"answer\":{\"fieldName\":\"answer\",\"type\":\"text\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"columnName\":\"answer\"},\"isRight\":{\"fieldName\":\"isRight\",\"type\":\"boolean\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"is_right\"},\"result\":{\"fieldName\":\"result\",\"type\":\"json\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"result\"}},\"fieldNames\":{\"id\":\"id\",\"answer\":\"answer\",\"is_right\":\"isRight\",\"result\":\"result\"},\"columnNames\":{\"id\":\"id\",\"answer\":\"answer\",\"isRight\":\"is_right\",\"result\":\"result\"},\"discriminatorValue\":null,\"discriminatorMap\":[],\"discriminatorColumn\":null,\"table\":{\"name\":\"course_answer\"},\"lifecycleCallbacks\":[],\"entityListeners\":{\"prePersist\":[{\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"method\":\"prePersist\"}]},\"associationMappings\":{\"courceSheet\":{\"fieldName\":\"courceSheet\",\"joinColumns\":[{\"name\":\"cource_sheet_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[\"persist\"],\"inversedBy\":\"courseAnswers\",\"targetEntity\":\"App\\\\Entity\\\\CourseSheet\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":true,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"cource_sheet_id\":\"id\"},\"joinColumnFieldNames\":{\"cource_sheet_id\":\"cource_sheet_id\"},\"targetToSourceKeyColumns\":{\"id\":\"cource_sheet_id\"},\"orphanRemoval\":false},\"question\":{\"fieldName\":\"question\",\"joinColumns\":[{\"name\":\"question_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[],\"inversedBy\":null,\"targetEntity\":\"App\\\\Entity\\\\CourseElement\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":false,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"question_id\":\"id\"},\"joinColumnFieldNames\":{\"question_id\":\"question_id\"},\"targetToSourceKeyColumns\":{\"id\":\"question_id\"},\"orphanRemoval\":false}},\"isIdentifierComposite\":false,\"containsForeignIdentifier\":false,\"containsEnumIdentifier\":false,\"idGenerator\":{},\"sequenceGeneratorDefinition\":null,\"tableGeneratorDefinition\":null,\"changeTrackingPolicy\":1,\"requiresFetchAfterChange\":false,\"isVersioned\":false,\"versionField\":null,\"cache\":null,\"reflClass\":{\"name\":\"App\\\\Entity\\\\CourseAnswer\"},\"isReadOnly\":false,\"reflFields\":{\"id\":{\"name\":\"id\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"answer\":{\"name\":\"answer\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"isRight\":{\"name\":\"isRight\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"result\":{\"name\":\"result\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"courceSheet\":{\"name\":\"courceSheet\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"question\":{\"name\":\"question\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"}}},\"prePersist\",{},{},1]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":1818,\"function\":\"persistNew\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{\"name\":\"App\\\\Entity\\\\CourseAnswer\",\"namespace\":\"App\\\\Entity\",\"rootEntityName\":\"App\\\\Entity\\\\CourseAnswer\",\"customGeneratorDefinition\":null,\"customRepositoryClassName\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"isMappedSuperclass\":false,\"isEmbeddedClass\":false,\"parentClasses\":[],\"subClasses\":[],\"embeddedClasses\":[],\"namedQueries\":[],\"namedNativeQueries\":[],\"sqlResultSetMappings\":[],\"identifier\":[\"id\"],\"inheritanceType\":1,\"generatorType\":4,\"fieldMappings\":{\"id\":{\"fieldName\":\"id\",\"type\":\"integer\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"id\":true,\"columnName\":\"id\"},\"answer\":{\"fieldName\":\"answer\",\"type\":\"text\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":false,\"precision\":null,\"columnName\":\"answer\"},\"isRight\":{\"fieldName\":\"isRight\",\"type\":\"boolean\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"is_right\"},\"result\":{\"fieldName\":\"result\",\"type\":\"json\",\"scale\":null,\"length\":null,\"unique\":false,\"nullable\":true,\"precision\":null,\"columnName\":\"result\"}},\"fieldNames\":{\"id\":\"id\",\"answer\":\"answer\",\"is_right\":\"isRight\",\"result\":\"result\"},\"columnNames\":{\"id\":\"id\",\"answer\":\"answer\",\"isRight\":\"is_right\",\"result\":\"result\"},\"discriminatorValue\":null,\"discriminatorMap\":[],\"discriminatorColumn\":null,\"table\":{\"name\":\"course_answer\"},\"lifecycleCallbacks\":[],\"entityListeners\":{\"prePersist\":[{\"class\":\"App\\\\Connectors\\\\CourseAnswerListener\",\"method\":\"prePersist\"}]},\"associationMappings\":{\"courceSheet\":{\"fieldName\":\"courceSheet\",\"joinColumns\":[{\"name\":\"cource_sheet_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[\"persist\"],\"inversedBy\":\"courseAnswers\",\"targetEntity\":\"App\\\\Entity\\\\CourseSheet\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":true,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"cource_sheet_id\":\"id\"},\"joinColumnFieldNames\":{\"cource_sheet_id\":\"cource_sheet_id\"},\"targetToSourceKeyColumns\":{\"id\":\"cource_sheet_id\"},\"orphanRemoval\":false},\"question\":{\"fieldName\":\"question\",\"joinColumns\":[{\"name\":\"question_id\",\"unique\":false,\"nullable\":false,\"onDelete\":null,\"columnDefinition\":null,\"referencedColumnName\":\"id\"}],\"cascade\":[],\"inversedBy\":null,\"targetEntity\":\"App\\\\Entity\\\\CourseElement\",\"fetch\":2,\"type\":2,\"mappedBy\":null,\"isOwningSide\":true,\"sourceEntity\":\"App\\\\Entity\\\\CourseAnswer\",\"isCascadeRemove\":false,\"isCascadePersist\":false,\"isCascadeRefresh\":false,\"isCascadeMerge\":false,\"isCascadeDetach\":false,\"sourceToTargetKeyColumns\":{\"question_id\":\"id\"},\"joinColumnFieldNames\":{\"question_id\":\"question_id\"},\"targetToSourceKeyColumns\":{\"id\":\"question_id\"},\"orphanRemoval\":false}},\"isIdentifierComposite\":false,\"containsForeignIdentifier\":false,\"containsEnumIdentifier\":false,\"idGenerator\":{},\"sequenceGeneratorDefinition\":null,\"tableGeneratorDefinition\":null,\"changeTrackingPolicy\":1,\"requiresFetchAfterChange\":false,\"isVersioned\":false,\"versionField\":null,\"cache\":null,\"reflClass\":{\"name\":\"App\\\\Entity\\\\CourseAnswer\"},\"isReadOnly\":false,\"reflFields\":{\"id\":{\"name\":\"id\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"answer\":{\"name\":\"answer\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"isRight\":{\"name\":\"isRight\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"result\":{\"name\":\"result\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"courceSheet\":{\"name\":\"courceSheet\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"},\"question\":{\"name\":\"question\",\"class\":\"App\\\\Entity\\\\CourseAnswer\"}}},{}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/UnitOfWork.php\",\"line\":1775,\"function\":\"doPersist\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{},{\"987\":{}}]},{\"file\":\"\\/symfony\\/vendor\\/doctrine\\/orm\\/lib\\/Doctrine\\/ORM\\/EntityManager.php\",\"line\":665,\"function\":\"persist\",\"class\":\"Doctrine\\\\ORM\\\\UnitOfWork\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/var\\/cache\\/dev\\/ContainerOkaJxiS\\/EntityManager_9a5be93.php\",\"line\":178,\"function\":\"persist\",\"class\":\"Doctrine\\\\ORM\\\\EntityManager\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Repository\\/CourseAnswerRepository.php\",\"line\":44,\"function\":\"persist\",\"class\":\"ContainerOkaJxiS\\\\EntityManager_9a5be93\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Persistence\\/ProcessSaver.php\",\"line\":35,\"function\":\"add\",\"class\":\"App\\\\Repository\\\\CourseAnswerRepository\",\"type\":\"->\",\"args\":[{}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Domain\\/Process.php\",\"line\":119,\"function\":\"addNewAnswer\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Persistence\\\\ProcessSaver\",\"type\":\"->\",\"args\":[{},{\"__initializer__\":null,\"__cloner__\":null,\"__isInitialized__\":true},\"SHOW TABLES\",{\"date\":\"2022-11-17 13:42:43.801948\",\"timezone_type\":3,\"timezone\":\"UTC\"}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Action\\/FinishAction.php\",\"line\":26,\"function\":\"finish\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Domain\\\\Process\",\"type\":\"->\",\"args\":[{},{},\"SHOW TABLES\",{\"date\":\"2022-11-17 13:42:43.801948\",\"timezone_type\":3,\"timezone\":\"UTC\"}]},{\"file\":\"\\/symfony\\/src\\/Service\\/ExaminationProcess\\/Layer\\/Action\\/Action.php\",\"line\":13,\"function\":\"do\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Action\\\\FinishAction\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/src\\/Controller\\/ProcessController.php\",\"line\":118,\"function\":\"run\",\"class\":\"App\\\\Service\\\\ExaminationProcess\\\\Layer\\\\Action\\\\Action\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/HttpKernel.php\",\"line\":153,\"function\":\"finish\",\"class\":\"App\\\\Controller\\\\ProcessController\",\"type\":\"->\",\"args\":[{},{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},{},{}]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/HttpKernel.php\",\"line\":75,\"function\":\"handleRaw\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\HttpKernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},1]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/http-kernel\\/Kernel.php\",\"line\":202,\"function\":\"handle\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\HttpKernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}},1,true]},{\"file\":\"\\/symfony\\/vendor\\/symfony\\/runtime\\/Runner\\/Symfony\\/HttpKernelRunner.php\",\"line\":35,\"function\":\"handle\",\"class\":\"Symfony\\\\Component\\\\HttpKernel\\\\Kernel\",\"type\":\"->\",\"args\":[{\"attributes\":{},\"request\":{},\"query\":{},\"server\":{},\"files\":{},\"cookies\":{},\"headers\":{}}]},{\"file\":\"\\/symfony\\/vendor\\/autoload_runtime.php\",\"line\":29,\"function\":\"run\",\"class\":\"Symfony\\\\Component\\\\Runtime\\\\Runner\\\\Symfony\\\\HttpKernelRunner\",\"type\":\"->\",\"args\":[]},{\"file\":\"\\/symfony\\/public\\/index.php\",\"line\":5,\"args\":[\"\\/symfony\\/vendor\\/autoload_runtime.php\"],\"function\":\"require_once\"}]}',NULL,NULL);
/*!40000 ALTER TABLE `course_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_element`
--

DROP TABLE IF EXISTS `course_element`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_element` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `answer` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ord` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_49835BD5591CC992` (`course_id`),
  CONSTRAINT `FK_49835BD5591CC992` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_element`
--

LOCK TABLES `course_element` WRITE;
/*!40000 ALTER TABLE `course_element` DISABLE KEYS */;
INSERT INTO `course_element` VALUES
(1,1,'2 test','2',NULL,2,'article'),
(2,1,'1 test','1',NULL,2,'article'),
(3,1,'Заголовок','',NULL,3,'article'),
(4,1,'Введите заголовок ​','',NULL,2,'article'),
(5,1,'Вот новый заголок','Вот новый текст',NULL,2,'article'),
(6,1,'Вот новый заголок','Вот новый текст',NULL,2,'article'),
(7,1,'Вот новый заголок','Вот новый текст',NULL,2,'article'),
(8,1,'2 test','2','SELECT * FROM clients;',2,'mysql'),
(9,2,'Вопрос','Вопрос','SHOW TABLES;',2,'mysql'),
(11,6,'Nrtdgdf','sgfg sddfafs g','show tables',2,'postgres');
/*!40000 ALTER TABLE `course_element` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_sheet`
--

DROP TABLE IF EXISTS `course_sheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_sheet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `actual_element_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `started_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `finished_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_6E97960A591CC992` (`course_id`),
  KEY `IDX_6E97960ACB944F1A` (`student_id`),
  KEY `IDX_6E97960A26277F80` (`actual_element_id`),
  CONSTRAINT `FK_6E97960A26277F80` FOREIGN KEY (`actual_element_id`) REFERENCES `course_element` (`id`),
  CONSTRAINT `FK_6E97960A591CC992` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `FK_6E97960ACB944F1A` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_sheet`
--

LOCK TABLES `course_sheet` WRITE;
/*!40000 ALTER TABLE `course_sheet` DISABLE KEYS */;
INSERT INTO `course_sheet` VALUES
(1,1,1,1,'2022-11-04 16:37:30','2022-11-04 16:37:30','new',NULL,NULL),
(2,6,1,11,'2022-11-08 12:45:18','2022-11-17 13:42:43','completed',NULL,NULL),
(3,2,1,9,'2022-11-08 13:37:14','2022-11-08 13:41:17','new',NULL,NULL);
/*!40000 ALTER TABLE `course_sheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES
('DoctrineMigrations\\Version20220404031435','2022-04-08 00:59:14',21),
('DoctrineMigrations\\Version20220408005940','2022-04-08 01:00:04',79),
('DoctrineMigrations\\Version20220408022706','2022-04-08 02:27:55',113),
('DoctrineMigrations\\Version20220414181805','2022-04-14 18:23:45',68),
('DoctrineMigrations\\Version20220415013417','2022-04-15 01:34:29',13),
('DoctrineMigrations\\Version20220415144910','2022-04-15 14:49:36',35),
('DoctrineMigrations\\Version20220428054235','2022-05-07 11:30:01',46),
('DoctrineMigrations\\Version20220503205436','2022-05-07 11:30:01',26),
('DoctrineMigrations\\Version20220504070344','2022-05-07 11:30:01',9),
('DoctrineMigrations\\Version20220831020428','2022-08-31 02:04:44',147),
('DoctrineMigrations\\Version20220908171911','2022-09-08 17:19:30',125),
('DoctrineMigrations\\Version20221013140208','2022-10-13 14:02:22',169),
('DoctrineMigrations\\Version20221024111244','2022-10-24 11:27:28',29),
('DoctrineMigrations\\Version20221114104441','2022-11-14 10:46:33',48),
('DoctrineMigrations\\Version20221122134314','2022-11-22 13:43:31',34),
('DoctrineMigrations\\Version20221122135906','2022-11-22 13:59:15',20);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exam` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creator_id` int(11) NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_limit` int(11) DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_38BBA6C661220EA6` (`creator_id`),
  CONSTRAINT `FK_38BBA6C661220EA6` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
INSERT INTO `exam` VALUES
('1a9bcf60-5e79-41b5-b583-64bcaf3449f1',1,'asfdgasdg',NULL,'enable'),
('26ec8c9a-11ed-4364-a1c4-0828795cd3a5',1,'Опросник, который я не начинал',NULL,'enable'),
('43906100-ae65-41a8-ad9f-ef96531d76f9',1,'Опросник, который я начал сдавать но не закончил',NULL,'enable'),
('49baaed4-d5f0-3dae-85a1-0b747b0471fa',1,'sdfgsfdgsfdg',NULL,'enable'),
('7308f3e1-b0b1-4337-9415-9e5dad73a210',1,'Тест с id',3600,'enable'),
('89cce380-e2bb-4bb9-95d7-5d6874272fae',1,'Тест с id',3600,'enable'),
('b5f2357c-1f7f-4299-91e2-4b98820ba78c',1,'Опросник который я начал сдавать, но не закончил. Но не начатых и не оконченных вопросов нет.',NULL,'enable'),
('be549deb-5a2e-41bd-9c91-e03a05e1bc9e',1,'asdaasdfasd',NULL,'enable'),
('c0b9edc1-bedd-48b0-9a99-64d8bf3f591f',1,'Опросник с лимитом времени',3670,'enable');
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examination_sheet`
--

DROP TABLE IF EXISTS `examination_sheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `examination_sheet` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `exam_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_9A8A6A27CB944F1A` (`student_id`),
  KEY `IDX_9A8A6A27578D5E91` (`exam_id`),
  CONSTRAINT `FK_9A8A6A27578D5E91` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`),
  CONSTRAINT `FK_9A8A6A27CB944F1A` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examination_sheet`
--

LOCK TABLES `examination_sheet` WRITE;
/*!40000 ALTER TABLE `examination_sheet` DISABLE KEYS */;
INSERT INTO `examination_sheet` VALUES
('247b6034-fe1c-492b-baf2-b19a33198e42',1,'c0b9edc1-bedd-48b0-9a99-64d8bf3f591f'),
('3a2b3624-9e7b-42f4-8d59-cbdc39379b23',1,'c0b9edc1-bedd-48b0-9a99-64d8bf3f591f'),
('5710f758-5a40-4640-9823-78e3ad6d8724',1,'c0b9edc1-bedd-48b0-9a99-64d8bf3f591f'),
('68626749-6f5e-44df-bf87-e82923af3a7e',1,'c0b9edc1-bedd-48b0-9a99-64d8bf3f591f'),
('b5cd9115-1c98-4c58-aa26-b15b0a2cfc60',1,'c0b9edc1-bedd-48b0-9a99-64d8bf3f591f'),
('f4e9785e-c426-4f79-80d9-973c4e553c9f',1,'c0b9edc1-bedd-48b0-9a99-64d8bf3f591f');
/*!40000 ALTER TABLE `examination_sheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examination_sheet_question`
--

DROP TABLE IF EXISTS `examination_sheet_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `examination_sheet_question` (
  `examination_sheet_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`examination_sheet_id`,`question_id`),
  KEY `IDX_AF17DFAEC93C7CDC` (`examination_sheet_id`),
  KEY `IDX_AF17DFAE1E27F6BF` (`question_id`),
  CONSTRAINT `FK_AF17DFAE1E27F6BF` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AF17DFAEC93C7CDC` FOREIGN KEY (`examination_sheet_id`) REFERENCES `examination_sheet` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examination_sheet_question`
--

LOCK TABLES `examination_sheet_question` WRITE;
/*!40000 ALTER TABLE `examination_sheet_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `examination_sheet_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exam_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_limit` smallint(6) NOT NULL,
  `ord` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_B6F7494E578D5E91` (`exam_id`),
  CONSTRAINT `FK_B6F7494E578D5E91` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES
('05bec483-b031-4aac-b920-1a5384ff222e','b5f2357c-1f7f-4299-91e2-4b98820ba78c','Вопрос 1',0,1),
('1bf7ee9f-fa6d-4cd6-bbc0-c7f75eb4ac8a','43906100-ae65-41a8-ad9f-ef96531d76f9','Вопрос 1',0,1),
('31198832-5685-400d-bc3e-c92d3d602a8a','b5f2357c-1f7f-4299-91e2-4b98820ba78c','Вопрос 3',0,3),
('4770872d-4033-4a02-9996-b3fc7feaec3d','c0b9edc1-bedd-48b0-9a99-64d8bf3f591f','Вопрос без лимита времени',0,1),
('4a95a0c8-526f-4b4e-8abe-99aeab0c2c4e','be549deb-5a2e-41bd-9c91-e03a05e1bc9e','Зачем и почему?',120,70),
('4b167220-a6d3-4943-9410-b173e0135217','49baaed4-d5f0-3dae-85a1-0b747b0471fa','afadsfasdf',111,11),
('6a469ae8-322f-46fb-9d9c-332fbe14151c','b5f2357c-1f7f-4299-91e2-4b98820ba78c','Вопрос 2',0,2),
('9f4e743f-a678-4258-9d39-85a272bae58d','be549deb-5a2e-41bd-9c91-e03a05e1bc9e','Что да почему!',38,130),
('ca44c8ad-2e45-4108-9454-19dcbf724522','43906100-ae65-41a8-ad9f-ef96531d76f9','Вопрос 2',0,2),
('f424beda-d831-49d2-8696-400eb15736c0','c0b9edc1-bedd-48b0-9a99-64d8bf3f591f','Вопрос с лимитом 10 секунд',10,2);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `right_answer`
--

DROP TABLE IF EXISTS `right_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `right_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `driver` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sql_text` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `result` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '(DC2Type:array)',
  PRIMARY KEY (`id`),
  KEY `IDX_DA25A0BE1E27F6BF` (`question_id`),
  CONSTRAINT `FK_DA25A0BE1E27F6BF` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `right_answer`
--

LOCK TABLES `right_answer` WRITE;
/*!40000 ALTER TABLE `right_answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `right_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_D87F7E0CF675F31B` (`author_id`),
  CONSTRAINT `FK_D87F7E0CF675F31B` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_answer`
--

DROP TABLE IF EXISTS `test_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `test_sheet_id` int(11) NOT NULL,
  `variants` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_4D044D0B1E27F6BF` (`question_id`),
  KEY `IDX_4D044D0B1E710DF3` (`test_sheet_id`),
  CONSTRAINT `FK_4D044D0B1E27F6BF` FOREIGN KEY (`question_id`) REFERENCES `test_question` (`id`),
  CONSTRAINT `FK_4D044D0B1E710DF3` FOREIGN KEY (`test_sheet_id`) REFERENCES `test_sheet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_answer`
--

LOCK TABLES `test_answer` WRITE;
/*!40000 ALTER TABLE `test_answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_question`
--

DROP TABLE IF EXISTS `test_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_id` int(11) NOT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `right_variant_qty` int(11) NOT NULL,
  `question_order` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_239442181E5D0459` (`test_id`),
  CONSTRAINT `FK_239442181E5D0459` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_question`
--

LOCK TABLES `test_question` WRITE;
/*!40000 ALTER TABLE `test_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_sheet`
--

DROP TABLE IF EXISTS `test_sheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_sheet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_8CE237E9CB944F1A` (`student_id`),
  KEY `IDX_8CE237E91E5D0459` (`test_id`),
  CONSTRAINT `FK_8CE237E91E5D0459` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`),
  CONSTRAINT `FK_8CE237E9CB944F1A` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_sheet`
--

LOCK TABLES `test_sheet` WRITE;
/*!40000 ALTER TABLE `test_sheet` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_sheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:json)',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fio` varchar(180) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(1,'aikus@yandex.ru','[\"ROLE_USER\", \"ROLE_TEACHER\"]','$2y$13$zg87cur5xJj.IOyJcsaaBuyvY56OxAS4tvdBKJ5x1TNxIhOSDxCMu',NULL),
(2,'test@gamil.com','[]','$2y$13$w54rq7N0zXJOs9.BJMMYw.RF1ao4AKGz0zl.EpSMRhxH6/wviySeK','Тест Тестов Тестович'),
(3,'test@mail.ru','[]','$2y$13$dsD3CSON8r9dUQEdoTMBSeQMKO.LSSxm1VLIega06pnn54t.YApOe','123 123 123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-23 11:46:52
