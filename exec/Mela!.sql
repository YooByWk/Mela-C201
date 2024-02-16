-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ssafy_web_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ssafy_web_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ssafy_web_db` DEFAULT CHARACTER SET utf8 ;
USE `ssafy_web_db` ;

-- -----------------------------------------------------
-- Table `ssafy_web_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`user` (
  `user_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `birth` DATE NULL DEFAULT NULL,
  `email_domain` VARCHAR(25) NULL DEFAULT NULL,
  `email_id` VARCHAR(25) NULL DEFAULT NULL,
  `gender` VARCHAR(10) NULL DEFAULT NULL,
  `jwt_token` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(25) NULL DEFAULT NULL,
  `nickname` VARCHAR(25) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `search_allow` BIT(1) NULL DEFAULT NULL,
  `user_type` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`user_idx`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`board`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`board` (
  `board_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `nickname` VARCHAR(255) NULL DEFAULT NULL,
  `regist_date` DATETIME(6) NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `update_date` DATETIME(6) NULL DEFAULT NULL,
  `view_num` INT(11) NOT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`board_idx`),
  INDEX `FK99mdf4t9hc7f662omr9279bbk` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FK99mdf4t9hc7f662omr9279bbk`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`board_like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`board_like` (
  `board_like_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `board_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`board_like_idx`),
  INDEX `FK78wxvb8prj3flx8iu5ssj9cow` (`board_idx` ASC) VISIBLE,
  INDEX `FKqsjomwkgbpa60l84m4s4fg93a` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FK78wxvb8prj3flx8iu5ssj9cow`
    FOREIGN KEY (`board_idx`)
    REFERENCES `ssafy_web_db`.`board` (`board_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKqsjomwkgbpa60l84m4s4fg93a`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`genre` (
  `genre_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `genre_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`genre_idx`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`board_recruit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`board_recruit` (
  `board_recruit_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `end_date` DATETIME(6) NULL DEFAULT NULL,
  `position` VARCHAR(255) NULL DEFAULT NULL,
  `board_idx` BIGINT(20) NULL DEFAULT NULL,
  `genre_idx1` BIGINT(20) NULL DEFAULT NULL,
  `genre_idx2` BIGINT(20) NULL DEFAULT NULL,
  `genre_idx3` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`board_recruit_idx`),
  INDEX `FKtr9kfjdfg3e4rlf3ji63mh7p6` (`board_idx` ASC) VISIBLE,
  INDEX `FKcw4t1r47idnhfpti1fx5knpk3` (`genre_idx1` ASC) VISIBLE,
  INDEX `FK37khsjrmnslyf46nxhh8w65b5` (`genre_idx2` ASC) VISIBLE,
  INDEX `FKn3ovwtugsenfda8xcrcordp36` (`genre_idx3` ASC) VISIBLE,
  CONSTRAINT `FK37khsjrmnslyf46nxhh8w65b5`
    FOREIGN KEY (`genre_idx2`)
    REFERENCES `ssafy_web_db`.`genre` (`genre_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKcw4t1r47idnhfpti1fx5knpk3`
    FOREIGN KEY (`genre_idx1`)
    REFERENCES `ssafy_web_db`.`genre` (`genre_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKn3ovwtugsenfda8xcrcordp36`
    FOREIGN KEY (`genre_idx3`)
    REFERENCES `ssafy_web_db`.`genre` (`genre_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKtr9kfjdfg3e4rlf3ji63mh7p6`
    FOREIGN KEY (`board_idx`)
    REFERENCES `ssafy_web_db`.`board` (`board_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`position`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`position` (
  `position_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `position_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`position_idx`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`board_recruit_position`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`board_recruit_position` (
  `board_recruit_position_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `board_recruit_idx` BIGINT(20) NULL DEFAULT NULL,
  `position_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`board_recruit_position_idx`),
  INDEX `FK5p64c63l3ko1ol1naalfx9c23` (`board_recruit_idx` ASC) VISIBLE,
  INDEX `FKt44mgw4o63vp6hcyf6i1bdmim` (`position_idx` ASC) VISIBLE,
  CONSTRAINT `FK5p64c63l3ko1ol1naalfx9c23`
    FOREIGN KEY (`board_recruit_idx`)
    REFERENCES `ssafy_web_db`.`board_recruit` (`board_recruit_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKt44mgw4o63vp6hcyf6i1bdmim`
    FOREIGN KEY (`position_idx`)
    REFERENCES `ssafy_web_db`.`position` (`position_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`file` (
  `file_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `file_description` VARCHAR(100) NULL DEFAULT NULL,
  `original_folder` VARCHAR(50) NULL DEFAULT NULL,
  `save_file` VARCHAR(50) NULL DEFAULT NULL,
  `save_folder` VARCHAR(50) NULL DEFAULT NULL,
  `file_size` BIGINT(20) NULL DEFAULT NULL,
  `original_filename` VARCHAR(200) NULL DEFAULT NULL,
  `save_filename` VARCHAR(200) NULL DEFAULT NULL,
  `save_path` VARCHAR(200) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`file_idx`),
  INDEX `FKt2vjueignge7mqlqugt640ael` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FKt2vjueignge7mqlqugt640ael`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`meeting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`meeting` (
  `session_id` VARCHAR(20) NOT NULL,
  `meeting_register_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `number_of_people` INT(11) NULL DEFAULT '0',
  `email_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  INDEX `FKot7hvc7i1pbs757f7ctl9becv` (`email_id` ASC) VISIBLE,
  CONSTRAINT `FKot7hvc7i1pbs757f7ctl9becv`
    FOREIGN KEY (`email_id`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`teamspace`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`teamspace` (
  `teamspace_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `end_date` DATE NULL DEFAULT NULL,
  `start_date` DATE NULL DEFAULT NULL,
  `team_description` VARCHAR(100) NULL DEFAULT NULL,
  `team_name` VARCHAR(255) NULL DEFAULT NULL,
  `host_user_idx` BIGINT(20) NULL DEFAULT NULL,
  `teamspace_background_picture_file_idx` BIGINT(20) NULL DEFAULT NULL,
  `teamspace_picture_file_idx` BIGINT(20) NULL DEFAULT NULL,
  `chat_room_idx` VARCHAR(255) NULL DEFAULT NULL,
  `session_id` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`teamspace_idx`),
  INDEX `FK6bxew6hguy3fe0gn3nl58a56o` (`teamspace_background_picture_file_idx` ASC) VISIBLE,
  INDEX `FK7p938krsny4ql57ug7n8jjkt9` (`teamspace_picture_file_idx` ASC) VISIBLE,
  INDEX `FKib2b1uk2vn9e9bo732tigv30w` (`host_user_idx` ASC) VISIBLE,
  INDEX `FKrhqty2shcbic2md51cc2qfr1p` (`session_id` ASC) VISIBLE,
  CONSTRAINT `FK6bxew6hguy3fe0gn3nl58a56o`
    FOREIGN KEY (`teamspace_background_picture_file_idx`)
    REFERENCES `ssafy_web_db`.`file` (`file_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FK7p938krsny4ql57ug7n8jjkt9`
    FOREIGN KEY (`teamspace_picture_file_idx`)
    REFERENCES `ssafy_web_db`.`file` (`file_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKib2b1uk2vn9e9bo732tigv30w`
    FOREIGN KEY (`host_user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKrhqty2shcbic2md51cc2qfr1p`
    FOREIGN KEY (`session_id`)
    REFERENCES `ssafy_web_db`.`meeting` (`session_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`chat_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`chat_room` (
  `chat_room_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `create_time` DATETIME(6) NULL DEFAULT NULL,
  `teamspace_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`chat_room_idx`),
  INDEX `FKgw5pbeilmupp58sunvptk6hix` (`teamspace_idx` ASC) VISIBLE,
  CONSTRAINT `FKgw5pbeilmupp58sunvptk6hix`
    FOREIGN KEY (`teamspace_idx`)
    REFERENCES `ssafy_web_db`.`teamspace` (`teamspace_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`join_chat_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`join_chat_room` (
  `join_chat_room_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `chat_room_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`join_chat_room_idx`),
  INDEX `FKgph4sxnwgnmu1ef8kr55mggp` (`chat_room_idx` ASC) VISIBLE,
  INDEX `FKkpic1dl815u7s4dauvm23a6fo` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FKgph4sxnwgnmu1ef8kr55mggp`
    FOREIGN KEY (`chat_room_idx`)
    REFERENCES `ssafy_web_db`.`chat_room` (`chat_room_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKkpic1dl815u7s4dauvm23a6fo`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`chat_message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`chat_message` (
  `chat_message_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(255) NULL DEFAULT NULL,
  `send_time` DATETIME(6) NULL DEFAULT NULL,
  `join_chat_room_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`chat_message_idx`),
  INDEX `FKsjoepqr64xol25e5kbqn8cctd` (`join_chat_room_idx` ASC) VISIBLE,
  CONSTRAINT `FKsjoepqr64xol25e5kbqn8cctd`
    FOREIGN KEY (`join_chat_room_idx`)
    REFERENCES `ssafy_web_db`.`join_chat_room` (`join_chat_room_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`comment` (
  `comment_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `nickname` VARCHAR(255) NULL DEFAULT NULL,
  `regist_date` DATETIME(6) NULL DEFAULT NULL,
  `board_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`comment_idx`),
  INDEX `FKs4ltx3yjfc38pocpcl6tq4n` (`board_idx` ASC) VISIBLE,
  INDEX `FK2w536tvxybupg9ib08x4twpn5` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FK2w536tvxybupg9ib08x4twpn5`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKs4ltx3yjfc38pocpcl6tq4n`
    FOREIGN KEY (`board_idx`)
    REFERENCES `ssafy_web_db`.`board` (`board_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`email_auth`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`email_auth` (
  `email_auth_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(255) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`email_auth_idx`),
  INDEX `FKeh2ms57fxughmmv632j5alvb0` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FKeh2ms57fxughmmv632j5alvb0`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`feed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`feed` (
  `feed_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `feed_content` VARCHAR(255) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`feed_idx`),
  INDEX `FK74rx84ntxs5vm9r2pp70pfwgi` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FK74rx84ntxs5vm9r2pp70pfwgi`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`follow` (
  `follow_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `followee` BIGINT(20) NULL DEFAULT NULL,
  `follower` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`follow_idx`),
  INDEX `FKfqepf1wyh1yweglosi0upmca` (`followee` ASC) VISIBLE,
  INDEX `FKbnr9k6kvlqg63h5snxpbe586q` (`follower` ASC) VISIBLE,
  CONSTRAINT `FKbnr9k6kvlqg63h5snxpbe586q`
    FOREIGN KEY (`follower`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKfqepf1wyh1yweglosi0upmca`
    FOREIGN KEY (`followee`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`notification` (
  `notification_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `alarm_content` VARCHAR(255) NULL DEFAULT NULL,
  `alarm_date` DATETIME(6) NULL DEFAULT NULL,
  `checked` BIT(1) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`notification_idx`),
  INDEX `FKsjar5d7od3kix1510uiw6ve8k` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FKsjar5d7od3kix1510uiw6ve8k`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 30
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`portfolio_abstract`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`portfolio_abstract` (
  `portfolio_abstract_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `instagram` VARCHAR(255) NULL DEFAULT NULL,
  `self_intro` VARCHAR(255) NULL DEFAULT NULL,
  `youtube` VARCHAR(255) NULL DEFAULT NULL,
  `portfolio_picture_file_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`portfolio_abstract_idx`),
  INDEX `FKqu9n33rouu2e1t86sqfa5ybdm` (`portfolio_picture_file_idx` ASC) VISIBLE,
  INDEX `FKkw46w3fso8v3t84jbs6nux2gq` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FKkw46w3fso8v3t84jbs6nux2gq`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKqu9n33rouu2e1t86sqfa5ybdm`
    FOREIGN KEY (`portfolio_picture_file_idx`)
    REFERENCES `ssafy_web_db`.`file` (`file_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`portfolio_music`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`portfolio_music` (
  `portfolio_music_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `pin_fixed` BIT(1) NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `album_art_file_idx` BIGINT(20) NULL DEFAULT NULL,
  `lylic_file_idx` BIGINT(20) NULL DEFAULT NULL,
  `music_file_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  `lyric_file_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`portfolio_music_idx`),
  INDEX `FKmnpj5wi4uji0ptg3seuhehow0` (`album_art_file_idx` ASC) VISIBLE,
  INDEX `FK2ikn491xa7j3hpp5w9gktht3v` (`lylic_file_idx` ASC) VISIBLE,
  INDEX `FKtcbn0ngjvk8vs8j95fgk3g0u8` (`music_file_idx` ASC) VISIBLE,
  INDEX `FKiwh3b5hn5tqectvxebu4ymdpm` (`user_idx` ASC) VISIBLE,
  INDEX `FK11tmgvwfmnsrf81jtxyc66qca` (`lyric_file_idx` ASC) VISIBLE,
  CONSTRAINT `FK11tmgvwfmnsrf81jtxyc66qca`
    FOREIGN KEY (`lyric_file_idx`)
    REFERENCES `ssafy_web_db`.`file` (`file_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FK2ikn491xa7j3hpp5w9gktht3v`
    FOREIGN KEY (`lylic_file_idx`)
    REFERENCES `ssafy_web_db`.`file` (`file_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKiwh3b5hn5tqectvxebu4ymdpm`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKmnpj5wi4uji0ptg3seuhehow0`
    FOREIGN KEY (`album_art_file_idx`)
    REFERENCES `ssafy_web_db`.`file` (`file_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKtcbn0ngjvk8vs8j95fgk3g0u8`
    FOREIGN KEY (`music_file_idx`)
    REFERENCES `ssafy_web_db`.`file` (`file_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`schedule` (
  `schedule_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `end_time` DATETIME(6) NULL DEFAULT NULL,
  `place` VARCHAR(255) NULL DEFAULT NULL,
  `start_time` DATETIME(6) NULL DEFAULT NULL,
  `teamspace_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`schedule_idx`),
  INDEX `FK57rthw4gyfbld8ak7xi0mwjis` (`teamspace_idx` ASC) VISIBLE,
  CONSTRAINT `FK57rthw4gyfbld8ak7xi0mwjis`
    FOREIGN KEY (`teamspace_idx`)
    REFERENCES `ssafy_web_db`.`teamspace` (`teamspace_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`shorts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`shorts` (
  `shorts_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `shorts_path_file_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`shorts_idx`),
  INDEX `FK748xwgad9o6aa939ffp95xoyb` (`shorts_path_file_idx` ASC) VISIBLE,
  INDEX `FKk9u72duk13gt1cr2b01xwc0xa` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FK748xwgad9o6aa939ffp95xoyb`
    FOREIGN KEY (`shorts_path_file_idx`)
    REFERENCES `ssafy_web_db`.`file` (`file_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKk9u72duk13gt1cr2b01xwc0xa`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`shorts_dislike`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`shorts_dislike` (
  `shorts_dislike_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `shorts_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`shorts_dislike_idx`),
  INDEX `FKnofbrdsmbmxh3rw59r834t4m6` (`shorts_idx` ASC) VISIBLE,
  INDEX `FK3lqei2hte2sr2ns59nh5e5mq5` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FK3lqei2hte2sr2ns59nh5e5mq5`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKnofbrdsmbmxh3rw59r834t4m6`
    FOREIGN KEY (`shorts_idx`)
    REFERENCES `ssafy_web_db`.`shorts` (`shorts_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`shorts_like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`shorts_like` (
  `shorts_like_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `shorts_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  `uploader_user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`shorts_like_idx`),
  INDEX `FKt11skmgw4h7wv3ihmlx4pbuko` (`shorts_idx` ASC) VISIBLE,
  INDEX `FK2in9jm1nsc06mx8qu7id4snfe` (`user_idx` ASC) VISIBLE,
  INDEX `FKf9l2sdp9f0hrsgd2lyteqbh93` (`uploader_user_idx` ASC) VISIBLE,
  CONSTRAINT `FK2in9jm1nsc06mx8qu7id4snfe`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKf9l2sdp9f0hrsgd2lyteqbh93`
    FOREIGN KEY (`uploader_user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKt11skmgw4h7wv3ihmlx4pbuko`
    FOREIGN KEY (`shorts_idx`)
    REFERENCES `ssafy_web_db`.`shorts` (`shorts_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`teamspace_file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`teamspace_file` (
  `teamspace_file_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `file_idx` BIGINT(20) NULL DEFAULT NULL,
  `teamspace_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`teamspace_file_idx`),
  INDEX `FKegn2xmw1pnr1mbc3bk54cprnd` (`file_idx` ASC) VISIBLE,
  INDEX `FK7jr8g1iuuefqtwgnjd9k7yexr` (`teamspace_idx` ASC) VISIBLE,
  CONSTRAINT `FK7jr8g1iuuefqtwgnjd9k7yexr`
    FOREIGN KEY (`teamspace_idx`)
    REFERENCES `ssafy_web_db`.`teamspace` (`teamspace_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKegn2xmw1pnr1mbc3bk54cprnd`
    FOREIGN KEY (`file_idx`)
    REFERENCES `ssafy_web_db`.`file` (`file_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`teamspace_member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`teamspace_member` (
  `teamspace_member_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `teamspace_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`teamspace_member_idx`),
  INDEX `FK5xhojayky9ewhfaa467x43ddc` (`teamspace_idx` ASC) VISIBLE,
  INDEX `FK43odfe7fbvke3jes1t78tax7g` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FK43odfe7fbvke3jes1t78tax7g`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FK5xhojayky9ewhfaa467x43ddc`
    FOREIGN KEY (`teamspace_idx`)
    REFERENCES `ssafy_web_db`.`teamspace` (`teamspace_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`user_blacklist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`user_blacklist` (
  `user_blacklist_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `blocked_user_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`user_blacklist_idx`),
  INDEX `FK44y4rkcmne0cw7umkijf6ndkn` (`blocked_user_idx` ASC) VISIBLE,
  INDEX `FKjey4ha6fa8tn0ulhqxjysukn3` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FK44y4rkcmne0cw7umkijf6ndkn`
    FOREIGN KEY (`blocked_user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKjey4ha6fa8tn0ulhqxjysukn3`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`user_genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`user_genre` (
  `user_genre_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `genre_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`user_genre_idx`),
  INDEX `FKynebeoo4mrlgufpx13wg88wb` (`genre_idx` ASC) VISIBLE,
  INDEX `FKr5bkn8ri0libt2ty80920w1pr` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FKr5bkn8ri0libt2ty80920w1pr`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKynebeoo4mrlgufpx13wg88wb`
    FOREIGN KEY (`genre_idx`)
    REFERENCES `ssafy_web_db`.`genre` (`genre_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`user_position`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`user_position` (
  `user_position_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `position_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`user_position_idx`),
  INDEX `FKm2xhbeasc7ryf7xoe0qtdsjej` (`position_idx` ASC) VISIBLE,
  INDEX `FKl84kwmop0qf5bw2m97s7puqf5` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FKl84kwmop0qf5bw2m97s7puqf5`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKm2xhbeasc7ryf7xoe0qtdsjej`
    FOREIGN KEY (`position_idx`)
    REFERENCES `ssafy_web_db`.`position` (`position_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ssafy_web_db`.`user_shorts_queue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafy_web_db`.`user_shorts_queue` (
  `user_shorts_queue_idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `shorts_idx` BIGINT(20) NULL DEFAULT NULL,
  `user_idx` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`user_shorts_queue_idx`),
  INDEX `FKim7ax8hybbsbkxnrhc963r28v` (`shorts_idx` ASC) VISIBLE,
  INDEX `FKd7uo1bi95dukea6xw06oqbpx0` (`user_idx` ASC) VISIBLE,
  CONSTRAINT `FKd7uo1bi95dukea6xw06oqbpx0`
    FOREIGN KEY (`user_idx`)
    REFERENCES `ssafy_web_db`.`user` (`user_idx`)
    ON DELETE CASCADE,
  CONSTRAINT `FKim7ax8hybbsbkxnrhc963r28v`
    FOREIGN KEY (`shorts_idx`)
    REFERENCES `ssafy_web_db`.`shorts` (`shorts_idx`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 27
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
