query: START TRANSACTION
query: SELECT 
    `courseSection`.`id` AS `courseSection_id`, 
    `courseSection`.`code` AS `courseSection_code`, 
    `courseSection`.`capacity` AS `courseSection_capacity`, 
    `courseSection`.`enrolled_count` AS `courseSection_enrolled_count` 
FROM `course_sections` `courseSection` 
WHERE `courseSection`.`id` = ? 
FOR UPDATE -- PARAMETERS: [1]

query: SELECT 
    `Enrollment`.`id` AS `Enrollment_id`, 
    `Enrollment`.`course_section_id` AS `Enrollment_course_section_id`, 
    `Enrollment`.`student_id` AS `Enrollment_student_id`, 
    `Enrollment`.`created_at` AS `Enrollment_created_at` 
FROM `enrollments` `Enrollment` 
WHERE ((`Enrollment`.`course_section_id` = ?) 
AND (`Enrollment`.`student_id` = ?)) 
LIMIT 1 -- PARAMETERS: [1,101]

query: START TRANSACTION
query: SELECT 
    `courseSection`.`id` AS `courseSection_id`, 
    `courseSection`.`code` AS `courseSection_code`, 
    `courseSection`.`capacity` AS `courseSection_capacity`, 
    `courseSection`.`enrolled_count` AS `courseSection_enrolled_count` 
FROM `course_sections` `courseSection` 
WHERE `courseSection`.`id` = ? 
FOR UPDATE -- PARAMETERS: [1]

query: INSERT INTO 
    `enrollments`(`id`, `course_section_id`, `student_id`, `created_at`) 
VALUES (DEFAULT, ?, ?, DEFAULT) -- PARAMETERS: [1,101]

query: SELECT 
    `Enrollment`.`id` AS `Enrollment_id`, 
    `Enrollment`.`created_at` AS `Enrollment_created_at` 
FROM `enrollments` `Enrollment` 
WHERE `Enrollment`.`id` = ? -- PARAMETERS: [1]
    
query: SELECT 
    `CourseSection`.`id` AS `CourseSection_id`, 
    `CourseSection`.`code` AS `CourseSection_code`, 
    `CourseSection`.`capacity` AS `CourseSection_capacity`, 
    `CourseSection`.`enrolled_count` AS `CourseSection_enrolled_count` 
FROM `course_sections` `CourseSection` 
WHERE `CourseSection`.`id` = ? -- PARAMETERS: [1]

query: UPDATE 
`course_sections` 
SET `enrolled_count` = ? 
WHERE `id` = ? -- PARAMETERS: [10,1]

query: COMMIT

query: SELECT 
    `Enrollment`.`id` AS `Enrollment_id`, 
    `Enrollment`.`course_section_id` AS `Enrollment_course_section_id`, 
    `Enrollment`.`student_id` AS `Enrollment_student_id`, 
    `Enrollment`.`created_at` AS `Enrollment_created_at` 
FROM `enrollments` `Enrollment` 
WHERE ((`Enrollment`.`course_section_id` = ?) 
AND (`Enrollment`.`student_id` = ?)) 
LIMIT 1 -- PARAMETERS: [1,102]

query: ROLLBACK