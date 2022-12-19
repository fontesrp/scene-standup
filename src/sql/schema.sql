-- MySQL DB hosted by PlanetScale

-- Users with permission to log in
CREATE TABLE `invited_users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

-- Team member order in a given standup
-- (The host doesn't support foreign keys)
CREATE TABLE `standup_orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `standups_id` bigint NOT NULL,
  `team_members_id` bigint NOT NULL,
  `member_order` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `standups_id` (`standups_id`, `team_members_id`, `member_order`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

-- Standup meetings
CREATE TABLE `standups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

-- Team members who participate on standups
CREATE TABLE `team_members` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;
