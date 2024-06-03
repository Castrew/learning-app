CREATE TABLE `appointment` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`start` timestamp,
	`end` timestamp,
	`user_id` int NOT NULL,
	`treatment_id` int NOT NULL,
	CONSTRAINT `appointment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `treatment` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`treatment` varchar(255),
	`duration` varchar(255),
	`price` varchar(255),
	CONSTRAINT `treatment_id` PRIMARY KEY(`id`)
);
