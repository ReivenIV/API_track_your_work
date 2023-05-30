/* query Example 
INSERT INTO `api_db_track`.`track_time` (`id`, `user_id`, `time_start`, `time_end`, `time_spend`, `created_at`, `updated_at`, `timezone`, `notes`, `tag`) 
VALUES ('1', '10', '2023-05-30 10:00:00', '2023-05-30 11:30:00', TIMEDIFF('2023-05-30 11:30:00', '2023-05-30 10:00:00'), '2023-05-30 10:00:00', NULL, 'europe/paris', NULL, NULL);
*/