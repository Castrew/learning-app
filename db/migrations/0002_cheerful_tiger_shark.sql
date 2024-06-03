ALTER TABLE `appointment` MODIFY COLUMN `user_id` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `appointment` MODIFY COLUMN `treatment_id` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_treatment_id_treatment_id_fk` FOREIGN KEY (`treatment_id`) REFERENCES `treatment`(`id`) ON DELETE no action ON UPDATE no action;