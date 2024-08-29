CREATE TABLE `appointment` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`treatment_ids` varchar(255) NOT NULL,
	`staff_id` varchar(255) NOT NULL,
	`date` varchar(255) NOT NULL,
	`start` varchar(255) NOT NULL,
	`duration` varchar(255) NOT NULL,
	CONSTRAINT `appointment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staff` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `staff_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `treatment_staff` (
	`treatment_id` varchar(255) NOT NULL,
	`staff_id` varchar(255) NOT NULL,
	CONSTRAINT `treatment_staff_treatment_id_staff_id_pk` PRIMARY KEY(`treatment_id`,`staff_id`)
);
--> statement-breakpoint
CREATE TABLE `treatment` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`duration` varchar(255) NOT NULL,
	`price` varchar(255) NOT NULL,
	CONSTRAINT `treatment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`hashed_password` varchar(255) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_treatment_ids_treatment_id_fk` FOREIGN KEY (`treatment_ids`) REFERENCES `treatment`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_staff_id_staff_id_fk` FOREIGN KEY (`staff_id`) REFERENCES `staff`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `treatment_staff` ADD CONSTRAINT `treatment_staff_treatment_id_treatment_id_fk` FOREIGN KEY (`treatment_id`) REFERENCES `treatment`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `treatment_staff` ADD CONSTRAINT `treatment_staff_staff_id_staff_id_fk` FOREIGN KEY (`staff_id`) REFERENCES `staff`(`id`) ON DELETE cascade ON UPDATE no action;