CREATE TABLE `staff` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`treatment_id` varchar(255) NOT NULL,
	CONSTRAINT `staff_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `staff` ADD CONSTRAINT `staff_treatment_id_treatment_id_fk` FOREIGN KEY (`treatment_id`) REFERENCES `treatment`(`id`) ON DELETE cascade ON UPDATE no action;