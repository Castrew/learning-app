ALTER TABLE `appointment` DROP FOREIGN KEY `appointment_user_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `user` ADD `description` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;