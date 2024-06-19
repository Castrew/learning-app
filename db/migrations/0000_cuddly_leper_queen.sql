CREATE TABLE `appointment` (
	`id` varchar(255) NOT NULL,
	`start` timestamp,
	`end` timestamp,
	`user_id` varchar(255) NOT NULL,
	`treatment_id` varchar(255) NOT NULL,
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
CREATE TABLE `treatment` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255),
	`duration` varchar(255),
	`price` varchar(255),
	CONSTRAINT `treatment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`username` varchar(255),
	`hashed_password` varchar(255) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_treatment_id_treatment_id_fk` FOREIGN KEY (`treatment_id`) REFERENCES `treatment`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;