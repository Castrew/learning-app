CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
