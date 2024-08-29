ALTER TABLE `appointment` RENAME COLUMN `treatment_ids` TO `treatment_id`;--> statement-breakpoint
ALTER TABLE `appointment` DROP FOREIGN KEY `appointment_treatment_ids_treatment_id_fk`;
--> statement-breakpoint
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_treatment_id_treatment_id_fk` FOREIGN KEY (`treatment_id`) REFERENCES `treatment`(`id`) ON DELETE cascade ON UPDATE no action;