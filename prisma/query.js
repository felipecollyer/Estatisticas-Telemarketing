/*
Todos os formularios procurando pelo dia/mes/ano e pelo usuario especifico

SELECT *
 FROM formularios
 WHERE EXTRACT(DAY FROM created_at) = 18 AND EXTRACT(MONTH FROM created_at) = 3  AND EXTRACT(YEAR FROM created_at) = 2024 AND usuario_id = 14;
*/

/*
Todos os formularios procurando pelo mes/ano e pelo usuario especifico

 SELECT *
 FROM formularios
 WHERE EXTRACT(MONTH FROM created_at) = 2 AND EXTRACT(YEAR FROM created_at) = 2024 AND usuario_id = 14;

*/
