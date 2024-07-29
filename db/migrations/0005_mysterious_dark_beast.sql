ALTER TABLE `appointment` MODIFY COLUMN `start` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `appointment` MODIFY COLUMN `end` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `treatment` MODIFY COLUMN `title` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `treatment` MODIFY COLUMN `duration` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `treatment` MODIFY COLUMN `price` varchar(255) NOT NULL;