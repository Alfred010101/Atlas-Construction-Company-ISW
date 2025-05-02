SELECT * FROM construction_company.users;

SELECT * FROM construction_company.customers;

SELECT * FROM construction_company.projects;

 SELECT first_name, last_name, email, phone, role
        FROM construction_company.users;
        
SELECT 
	p.id,
	p.name AS project_name,
	p.address,
	p.start_date,
	p.end_date,
	c.id AS customer_id,
	CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
	e.id AS supervisor_id,
	CONCAT(e.first_name, ' ', e.last_name) AS supervisor_name
FROM 
	construction_company.projects p
INNER JOIN 
	construction_company.customers c ON p.fk_customer = c.id
INNER JOIN 
	construction_company.users e ON p.fk_supervisor = e.id;